const log4js = require('log4js')
const log4jsConfig = require('./loggerConfig.json')

log4js.configure(log4jsConfig)

module.exports = log4js.getLogger();

