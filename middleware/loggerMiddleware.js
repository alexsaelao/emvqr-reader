module.exports.loggerMiddleware = async (req, res, next) => {
    try {
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        let ips = req.ip
        let protocol = req.protocol.toUpperCase()
        ips.substr(0, 7) === '::ffff:' ? ips = ips.substr(7) : ips = ips
        console.log(`${date} - ${protocol} REQUEST FROM - http://${ips} - Accessing`)
        next()
    } catch (error) {
        next(error)
    }
}