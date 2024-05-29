
import log4js from 'log4js'
import log4jsConfig from './log4js.cjs';

log4js.configure(log4jsConfig)

export default log4js.getLogger();

