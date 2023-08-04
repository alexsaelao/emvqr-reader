const path = require('path');
const fs = require('fs')
const FileStreamRotator = require('file-stream-rotator')

exports.logDir = () => {
    const logDirectory = path.join(__dirname, '../logs')
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
    const accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(logDirectory, 'access-%DATE%.log'),
        interval: '1d',
        verbose: false,
    });
    return accessLogStream
}

exports.logging = function (req, content) {
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    let ips = req.ip
    let protocol = req.protocol.toUpperCase()
    let method = req.method
    ips.substr(0, 7) === '::ffff:' ? ips = ips.substr(7) : ips = ips
    console.log(`${date} - ${protocol} REQUEST FROM - http://${ips} - ${method} - CONTENT - ${content}`)
}