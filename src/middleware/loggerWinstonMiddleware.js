const commons = require('../commons/commons');
const winston = commons.winston;
const { combine, timestamp, json, printf, colorize, align } = winston.format;


const errorFilter = winston.format((info, option) => {
    return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, option) => {
    return info.level === 'info' ? info : false;
});

const attributes = {
    common: {
        dateTimeFormatted: 'YYYY-MM-DD hh:mm:ss.SSS A'
    },
    destination: {
        infoPath: './logs/_1_apps_info.log',
        errorPath: './logs/_1_apps_error.log',
        warningPath: './logs/_1_apps_warn.log',
        debugPath: './logs/_1_apps_debug.log',
        exceptionPath: './logs/_2_exceptions.log',
        rejectionPath: './logs/_3_rejections.log'
    }
}

const options = {
    infoFile: {
        level: 'info',
        filename: attributes.destination.infoPath,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 20,
        colorize: false,
        format: combine(
            infoFilter(),
            timestamp({
                format: attributes.common.dateTimeFormatted,
            }),
            json()),
    },
    errorFile: {
        level: 'error',
        filename: attributes.destination.errorPath,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 20,
        colorize: false,
        format: combine(
            errorFilter(),
            timestamp({
                format: attributes.common.dateTimeFormatted,
            }),
            json())
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
    exceptionHandler: {
        filename: attributes.destination.exceptionPath,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
        colorize: false,
    },
    rejectionHandler: {
        filename: attributes.destination.rejectionPath,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
        colorize: false,
    }
};

const loggerWinston = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console)
    ],
    exceptionHandlers: [
        new winston.transports.File(options.exceptionHandler)
    ],
    rejectionHandlers: [
        new winston.transports.File(options.rejectionHandler)
    ],
    exitOnError: false,
    format: combine(
        // colorize({ all: true }),
        // printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
        timestamp({
            format: attributes.common.dateTimeFormatted,
        }),
        json(),
        align()
    ),
});


module.exports = loggerWinston;