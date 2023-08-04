const tools = require('./functions/tools');
const util = require('../utility/logger');
const emvqr = require('./functions/emvqr');
const { Merchant } = require('steplix-emv-qrcps');

exports.emvText = async (req, res) => {
    try {
        const active = req.path.split('/')[1]

        res.render('pages/emv_text', {
            message: null,
            crc_result: null,
            crc_value: null,
            playload: null,
            bank: null,
            emvdata: null,
            active: active
        });
    } catch (error) {
        return error.message
    }
}

exports.emvImage = async (req, res) => {
    try {
        const active = req.path.split('/')[1]
        res.render('pages/emv_image', {
            message: null,
            crc_result: null,
            crc_value: null,
            playload: null,
            bank: null,
            emvdata: null,
            active: active
        });
    } catch (error) {
        return error.message
    }
}

exports.uploadText = async (req, res) => {
    try {
        const { data_emv } = req.body

        const active = req.path.split('/')[1]

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
                res.render('pages/emv_text', {
                    message: message,
                    crc_result: crcValid?.result,
                    crc_value: crcValid?.hash,
                    playload: qrCodeData,
                    bank: bankCode,
                    emvdata: emvdata,
                    active: active
                })

            } else {
                console.log(qrCodeData)
                const message = 'undefined';
                util.logging(req, message)
                res.render('pages/emv_text', {
                    message: message,
                    crc_result: null,
                    crc_value: null,
                    playload: data_emv.trim(),
                    bank: null,
                    emvdata: null,
                    active: active
                })
            }

        }
    } catch (error) {
        return error.message
    }
}


exports.uploadImage = async (req, res) => {
    try {
        
        const active = req.path.split('/')[1]

        if (!req.file) {
            util.logging(req, 'No file received')
            return res.redirect('/image');

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
                    res.render('pages/emv_image', {
                        message: message,
                        crc_result: crcValid?.result,
                        crc_value: crcValid?.hash,
                        playload: qrCodeData,
                        bank: bankCode,
                        emvdata: emvdata,
                        active: active
                    })

                } else {
                    const message = 'undefined';
                    util.logging(req, message)
                    res.render('pages/emv_image', {
                        message: message,
                        crc_result: null,
                        crc_value: null,
                        playload: data_emv.trim(),
                        bank: null,
                        emvdata: null,
                        active: active
                    })
                }
            } else {
                const message = 'undefined';
                util.logging(req, message)
                res.render('pages/emv_image', {
                    message: message,
                    crc_result: null,
                    crc_value: null,
                    playload: null,
                    bank: null,
                    emvdata: null,
                    active: active
                })
            }
        }
    } catch (error) {
        return error.message
    }
}
