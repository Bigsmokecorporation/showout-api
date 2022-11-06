import winston from 'winston';
import httpContext from 'express-http-context';

const { combine, splat, timestamp, printf, simple } = winston.format;

const myFormat = printf( ({ level, message, timestamp, ...metadata }) => {

    let msg = `${timestamp} [${level}] : ${message.toString().replace(/\n/g, ' ')}`;
    if (metadata && metadata.stamp) {
        delete metadata.stamp;
    }
    if (metadata && metadata.length > 0) {

        msg += JSON.stringify(metadata);
    }

    msg = appendTraceLog(msg);
    return msg;
});

const console = new winston.transports.Console({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' });
const exceptionTransport = new winston.transports.File({ filename: './server/app-logs/app-logs.log' });

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
        splat(),
        simple(),
        timestamp(),
        myFormat
    ),
    transports: [console],
    exceptionHandlers: [
        console,
        exceptionTransport
    ]
});

class GlobalLog {

    /**
     * @desc Logs user actions at the INFO level
     * @param user User object/doc, must contain _id and role
     * @param action Message/action to log
     */
    static log (user = {}, action = '') {
        this.info(action, user);
    }

    static info (action = '', user = {}) {
        logger.info(action,
            {
                stamp: MOMENT(Date.now()).utc().format('D MMM YYYY h:mm:ss A'),
                user: user && user._id,
                role: user && user.role
            });
    }

    /**
     * @desc Logs user actions at the ERROR level
     * @param user User object/doc, must contain _id and role
     * @param action Message/action to log
     */
    static error (action = '', user = {}) {
        logger.error(action,
            {
                stamp: MOMENT(Date.now()).utc().format('D MMM YYYY h:mm:ss A'),
                user: user && user._id || '',
                role: user && user.role || ''
            });
    }

    /**
     * @desc Logs user actions at the DEBUG level. This won't log on production
     * @param action Message/action to log
     * @param user
     */
    static debug (action, user = {}) {
        if (process.env.NODE_ENV === 'production') return;
        logger.debug(action,
            {
                stamp: MOMENT(Date.now()).utc().format('D MMM YYYY h:mm:ss A'),
                user: user && user._id || '',
                role: user && user.role || ''
            });
    }
}

export default GlobalLog;

function appendLog (key, value, msg) {
    if (value) {
        msg += ` [${key}: ${value}]`;
    }
    return msg;
}

function appendTraceLog (msg) {
    let user = httpContext.get('user');
    if (user) {
        msg = appendLog('User Id', user.id, msg);
    }
    return msg;
}

