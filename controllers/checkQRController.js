const tools = require('./functions/tools');
const util = require('../utility/logger');
const emvqr = require('./functions/emvqr');
const { Merchant } = require('steplix-emv-qrcps');

exports.checkText = async (req, res) => {
    try {
        const active = req.path.split('/')[1]

        res.render('pages/checkqr/check_text', {
            message: null,
            crc_result: null,
            crc_value: null,
            playload: null,
            bank: null,
            emvdata: null,
            active: active,
            qr_type: null,
            qr_group: null
        });
    } catch (error) {
        return error.message
    }
}
exports.checkImage = async (req, res) => {
    try {
        const active = req.path.split('/')[1]

        res.render('pages/checkqr/check_image', {
            message: null,
            crc_result: null,
            crc_value: null,
            playload: null,
            bank: null,
            emvdata: null,
            active: active,
            qr_type: null,
            qr_group: null
        });
    } catch (error) {
        return error.message
    }
}
exports.uploadCheckText = async (req, res) => {
    try {
        const { data_emv } = req.body
        const active = req.path.split('/')[1]
        const qr_type = parseInt(req.body.qr_type)
        const qr_group = req.body.qr_group


        if (!data_emv) {
            util.logging(req, 'No Message received');
            return res.redirect('/');

        } else {
            util.logging(req, 'QR PLayload')
            let qrCodeData = data_emv.trim();
            const crcValid = emvqr.crcValidate(qrCodeData)
            util.logging(req, qrCodeData)
            let val = data_emv.trim().substring(0, 2);
            val === '00' ? qrCodeData = qrCodeData : qrCodeData = ''

            if (qrCodeData) {
                const emvdata = await emvqr.decode(qrCodeData)

                let bankCode = await tools.iinCode(emvdata['38']?.data['01']?.data)
                let thailand = emvdata['30']?.data['00'].data;
                thailand === 'A000000677010112' ? bankCode = 'THAILAND' : bankCode = bankCode
                let message
                crcValid?.result === true ? message = 'Success' : message = 'QR CHECKSUM INVALID'
                util.logging(req, message)
                res.render('pages/checkqr/check_text', {
                    message: message,
                    crc_result: crcValid?.result,
                    crc_value: crcValid?.hash,
                    playload: qrCodeData,
                    bank: bankCode,
                    emvdata: emvdata,
                    active: active,
                    qr_type: qr_type,
                    qr_group: qr_group
                })

            } else {
                console.log(qrCodeData)
                const message = 'undefined';
                util.logging(req, message)
                res.render('pages/checkqr/check_text', {
                    message: message,
                    crc_result: null,
                    crc_value: null,
                    playload: data_emv.trim(),
                    bank: null,
                    emvdata: null,
                    active: active,
                    qr_type: qr_type,
                    qr_group: qr_group
                })
            }

        }
    } catch (error) {
        return error.message
    }
}
exports.uploadCheckImage = async (req, res) => {
    try {
        const active = req.path.split('/')[1]
        const qr_type = parseInt(req.body.qr_type)
        const qr_group = req.body.qr_group


        if (!req.file) {
            util.logging(req, 'No file received')
            return res.redirect('/checkImage');

        } else {
            util.logging(req, 'QR Image')
            const data_emv = await tools.qrCodeReader(`/imgs/${req.file.filename}`);
            if (data_emv !== undefined) {
                let qrCodeData = data_emv.trim();
                const crcValid = emvqr.crcValidate(qrCodeData)
                util.logging(req, qrCodeData)
                let val = data_emv.trim().substring(0, 2);
                val === '00' ? qrCodeData = qrCodeData : qrCodeData = ''

                if (qrCodeData) {
                    const emvdata = await emvqr.decode(qrCodeData, false)

                    let bankCode = await tools.iinCode(emvdata['38']?.data['01']?.data)
                    let thailand = emvdata['30']?.data['00'].data;
                    thailand === 'A000000677010112' ? bankCode = 'THAILAND' : bankCode = bankCode
                    let message
                    crcValid?.result === true ? message = 'Success' : message = 'QR CHECKSUM INVALID'
                    util.logging(req, message)
                    res.render('pages/checkqr/check_image', {
                        message: message,
                        crc_result: crcValid?.result,
                        crc_value: crcValid?.hash,
                        playload: qrCodeData,
                        bank: bankCode,
                        emvdata: emvdata,
                        active: active,
                        qr_type: qr_type,
                        qr_group: qr_group
                    })

                } else {
                    const message = 'undefined';
                    util.logging(req, message)
                    res.render('pages/checkqr/check_image', {
                        message: message,
                        crc_result: null,
                        crc_value: null,
                        playload: data_emv.trim(),
                        bank: null,
                        emvdata: null,
                        active: active,
                        qr_type: qr_type,
                        qr_group: qr_group
                    })
                }

            } else {
                const message = 'undefined';
                util.logging(req, message)
                res.render('pages/checkqr/check_image', {
                    message: message,
                    crc_result: null,
                    crc_value: null,
                    playload: null,
                    bank: null,
                    emvdata: null,
                    active: active,
                    qr_type: qr_type,
                    qr_group: qr_group
                })
            }
        }
    } catch (error) {
        return error.message
    }
}