const jimp = require("jimp");
const qrCode = require('qrcode-reader');
const fs = require('fs');
const path = require("path");
const models = require('../models/emv');
const iin = require('../models/iin');
const { crc16 } = require('easy-crc');

exports.iinCode = async (data) => {
    try {
        // console.log(data)
        // const tag38 = await data.find(element => element.tag === '38');
        // const subTag01 = await tag38.value.find(element => element.tag === '01');
        const bankCodec = await iin.getDataObjectNameIIN(data)
        // console.log("=====================================================")
        // console.log(bankCodec)
        return bankCodec
    } catch (error) {
        return error.message
    }
}

exports.qrCodeReader = async (imgPath) => {
    try {
        const filePath = path.join(__dirname, imgPath)

        if (fs.existsSync(filePath)) {
            const img = await jimp.read(fs.readFileSync(filePath));
            const qr = new qrCode();
            const value = await new Promise((resolve, reject) => {
                qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
                qr.decode(img.bitmap);
            });
            return value.result;
        }
    } catch (error) {
        return error.message
    }
}
exports.crcCheck = async (str) => {
    try {

        const strSub = str.split('6304')
        let crcResult
        // console.log('========================== sub string')
        // console.log(strSub[0]+'6304')
        crc = crc16('CCITT-FALSE', strSub[0] + '6304');
        // console.log(crc.toString(16))
        crc.toString(16).length === 3 ? crc = "0" + crc.toString(16) : crc = crc.toString(16)
        // console.log(crc.toString(16))
        // console.log(typeof (crc.toString(16)))
        // console.log(strSub[1])
        // console.log(typeof (strSub[1]))


        if (strSub[1] !== strSub[1].toUpperCase()) {
            crc.toString(16) === strSub[1] ? crcResult = true : crcResult = false
        } else {
            crc.toString(16).toUpperCase() === strSub[1].toUpperCase() ? crcResult = true : crcResult = false
        }
        return {
            value: crc.toString(16).toUpperCase(),
            result: crcResult
        }
    } catch (error) {
        return error.message
    }
}
exports.emvReader = async (str) => {
    try {
        let tags = [], subTags = [];
        let i = 0, j = 0;
        let tagName, subTagName

        while (i < str.length) {
            let tag = str.substring(i, i + 2);
            i += 2;
            let valueLength = Number(str.substring(i, i + 2));
            let strValueLength = str.substring(i, i + 2);
            i += 2;
            let value = str.substring(i, i + valueLength);
            i += valueLength;
            if (tag === "38" || tag === "62") {
                let subStr = value
                // console.log("Value : " + value)
                // console.log("Length Value : " + value.length)
                while (j < valueLength) {

                    // console.log("j : " + j)
                    let subTag = subStr.substring(j, j + 2);
                    // console.log("subTag : " + subTag)
                    j += 2;

                    // console.log("j : " + j)
                    let subValueLength = Number(subStr.substring(j, j + 2));
                    // console.log("subValueLength : " + subValueLength)

                    let strSubValueLength = subStr.substring(j, j + 2);
                    // console.log("strSubValueLength : " + strSubValueLength)
                    j += 2


                    // console.log("j : " + j)
                    let subValue = subStr.substring(j, j + subValueLength);
                    // console.log("subValue : " + subValue)


                    j += subValueLength

                    // console.log("j + subValueLength : " + j)
                    if (tag === '38') {
                        subTagName = await models.getDataObjectNameSubLaoNationalQRData(subTag)
                    } else if (tag === '62') {
                        subTagName = await models.getDataObjectAdditionalFieldsName(subTag)
                    } else {
                        subTagName = 'Undefined'
                    }
                    subTags.push({ tag: subTag, name: subTagName, length: strSubValueLength, value: subValue });

                }

                tagName = await models.getDataObjectName(tag)
                tags.push({ tag: tag, name: tagName, length: strValueLength, value: subTags });
                subTags = [];
                j = 0

            } else {

                tagName = await models.getDataObjectName(tag)
                tags.push({ tag: tag, name: tagName, length: strValueLength, value: value });
            }
        }
        return tags
    } catch (error) {
        return error.message
    }
}
exports.saveDataToModels = async (data, file, field) => {
    try {
        const testData = JSON.parse(fs.readFileSync(file))
        const saveData = (data, file) => {
            const finished = (error) => {
                if (error) {
                    console.error(error)
                    return;
                }
            }
            const jsonData = JSON.stringify(data, null, 2)
            fs.writeFile(file, jsonData, finished)
            console.log("save data to data.json : success")
        }
        testData[field] = data
        saveData(testData, file)
    } catch (error) {
        return error.message
    }
}



exports.tagName = async (tag) => {
    try {
        let name
        if (tag === '00') { name = 'Payload format indicator' }
        else if (tag === '01') { name = 'Point of initiation method' }
        else if (tag === '02') { name = 'Reserved for Visa' }
        else if (tag === '38') { name = 'Merchant Account Information' }
        else if (tag === '52') { name = 'Merchant Category code' }
        else if (tag === '53') { name = 'Transaction Currency' }
        else if (tag === '54') { name = 'Transaction Amount' }
        else if (tag === '58') { name = 'Country Code' }
        else if (tag === '59') { name = 'Merchant Name' }
        else if (tag === '60') { name = 'Merchant city' }
        else if (tag === '62') { name = 'Additional Data Field Template' }
        else if (tag === '63') { name = 'CRC' }
        else { name = 'Undefined' }

        return name
    } catch (error) {
        return error.message
    }

}
exports.subTagName38 = async (tag) => {

    try {
        let name
        if (tag === '00') { name = 'Payload format indicator' }
        else if (tag === '01') { name = 'Point of initiation method' }
        else if (tag === '02') { name = 'Reserved for Visa' }
        else if (tag === '03') { name = 'Merchant Account Information' }
        else if (tag === '52') { name = 'Merchant Category code' }
        else if (tag === '53') { name = 'Transaction Currency' }
        else if (tag === '54') { name = 'Transaction Amount' }
        else if (tag === '58') { name = 'Country Code' }
        else if (tag === '59') { name = 'Merchant Name' }
        else if (tag === '60') { name = 'Merchant city' }
        else if (tag === '62') { name = 'Additional Data Field Template' }
        else if (tag === '63') { name = 'CRC' }
        else { name = 'Undefined' }

        return name
    } catch (error) {
        return error.message
    }
}