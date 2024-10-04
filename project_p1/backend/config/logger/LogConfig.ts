import Log4js from "log4js"

const Log4jsConfig = Log4js.configure({
    appenders: {
        console: { type: 'console'},
        file: {type: 'file',filename: 'logs/error.log'}
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'all'
        },
        fl: {
            appenders: ['file'],
            level: 'all'
        }
    }
})

export default Log4jsConfig;