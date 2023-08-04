const fs = require('fs');
const crypto = require('./functions/cryptography');
const crypto2 = require('crypto');
exports.signatureVerify = async (req, res) => {
    try {
        const signature = "8f0ae6762be9d074f742bf59cf5bfe1ae7569b24c212d6da96e246baf584208ac70914efdb29b1a25b6b07bf34c18444e124763c2ec70b3d9148beabd446cd6294e68519e6e8a02bc4c9b869788a9005669d68deaf73d7b5bf300c629815ce0ba6cdecd363148a7917b83caecb0b71ed38994b7f2ecd4b2a254a917d58d061fd5be71e900f365de3c9767e3c46e3ae9fe864d20b4db06b2bc789265d650ac773924359008d6089b6b0d70e75c81a53dbf27e50d48f91460fa9e666f96d183d17e088b4f9fbaa4cc8e50631d3bd211ff801ebf83173fcacc4f8084c42219e3769c31150bdc69ceced01dcd6b544058acf607e6edfb8e4f031b7d03ca4e1226ed4"
        const key = fs.readFileSync('key/public.pem', 'utf-8')
        const keyPri = fs.readFileSync('key/private.pem', 'utf-8')
        const responses = 'verify'
        const body = { "frommember": "LMPS", "fromuser": "2059083986", "fromuserfullname": "ALEX SAELAO", "fromaccount": "1000111100020211", "tomember": "BFL", "toaccount": "00020101021138610016A0052662846625770108371604180203001031800100003620100001853034185802LA6304EFD7", "totype": "QR", "reference": "4PYFEO7XL5WD6LARZ34W", "time": "2023-07-12 15:23:50" }
        const dataToString = JSON.stringify(body);

        const sign = crypto.rsaSignToHex(dataToString, keyPri)

        const verify = crypto.rsaVerify(dataToString, signature, key)

        
        return res.status(200).json({
            result: responses,
            verify: verify,
            signature: signature,
            key: key
        })

    } catch (error) {
        return error.message
    }
}
exports.testSidebar = async (req, res) => {
    try {
        res.render('layouts/header_with_sidebar');
    } catch (error) {
        return error.message
    }
}
