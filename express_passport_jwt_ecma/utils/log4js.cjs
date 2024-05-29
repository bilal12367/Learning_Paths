// log4js.cjs

module.exports = {
  appenders: {
    file: {
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 10485760,
      backups: 3,
      layout: {
        type: 'pattern',
        pattern: '%d [%p] %c - %m%n'
      }
    },
    console: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%p]%] %m'
      }
    }
  },
  categories: {
    default: {
      appenders: ['file', 'console'],
      level: 'debug'
    }
  }
};
