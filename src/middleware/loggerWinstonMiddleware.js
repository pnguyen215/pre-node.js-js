const commons = require('../commons/commons');
const winston = commons.winston;
const winstonRotate = commons.winston_rotate;
const { combine, timestamp, json, printf, colorize, align } = winston.format;


const errorFilter = winston.format((info, option) => {
    return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, option) => {
    return info.level === 'info' ? info : false;
});

const attributes = {
    common: {
        dateTimeFormatted: 'YYYY-MM-DD hh:mm:ss.SSS A',
        dateRotatePattern: 'YYYY-MM-DD-HH-MM'
    },
    destination: {
        infoPath: './logs/_1_apps_info.log',
        infoRotatePath: './logs/_1_app_info_rotate_%DATE%.log',
        errorPath: './logs/_1_apps_error.log',
        errorRotatePath: './logs/_1_app_error_rotate_%DATE%.log',
        warningPath: './logs/_1_apps_warn.log',
        debugPath: './logs/_1_apps_debug.log',
        exceptionPath: './logs/_2_exceptions.log',
        rejectionPath: './logs/_3_rejections.log'
    },
    params: {
        maximumSizeRotate: '20m', // 20m, 1k
        maximumFilesKeepRotate: '30d', // 30d
        maximumSize: 5242880, // 5MB
        maximumFiles: 20,
        enabledViewStateWinstonRotate: false
    }
}

const options = {
    infoFile: {
        level: 'info',
        filename: attributes.destination.infoPath,
        handleExceptions: true,
        json: true,
        maxsize: attributes.params.maximumSize,
        maxFiles: attributes.params.maximumFiles,
        colorize: false,
        format: combine(
            infoFilter(),
            timestamp({
                format: attributes.common.dateTimeFormatted,
            }),
            json()),
    },
    infoRotateFile: {
        level: 'info',
        filename: attributes.destination.infoRotatePath,
        datePattern: attributes.common.dateRotatePattern,
        zippedArchive: true,
        colorize: false,
        prepend: true,
        json: true,
        maxSize: attributes.params.maximumSizeRotate,
        maxFiles: attributes.params.maximumFilesKeepRotate,
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
        maxsize: attributes.params.maximumSize,
        maxFiles: attributes.params.maximumFiles,
        colorize: false,
        format: combine(
            errorFilter(),
            timestamp({
                format: attributes.common.dateTimeFormatted,
            }),
            json())
    },
    errorRotateFile: {
        level: 'error',
        filename: attributes.destination.errorRotatePath,
        datePattern: attributes.common.dateRotatePattern,
        zippedArchive: true,
        colorize: false,
        prepend: true,
        json: true,
        maxSize: attributes.params.maximumSizeRotate,
        maxFiles: attributes.params.maximumFilesKeepRotate,
        format: combine(
            errorFilter(),
            timestamp({
                format: attributes.common.dateTimeFormatted,
            }),
            json()),
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
        maxsize: attributes.params.maximumSize,
        maxFiles: attributes.params.maximumFiles,
        colorize: false,
    },
    rejectionHandler: {
        filename: attributes.destination.rejectionPath,
        handleExceptions: true,
        json: true,
        maxsize: attributes.params.maximumSize,
        maxFiles: attributes.params.maximumFiles,
        colorize: false,
    }
};

const infoRotateTransport = new winstonRotate(options.infoRotateFile);
const errorRotateTransport = new winstonRotate(options.errorRotateFile);

const loggerWinston = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console),
        infoRotateTransport,
        errorRotateTransport,
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

if (attributes.params.enabledViewStateWinstonRotate) {

    infoRotateTransport.on('new', (filename) => {
        console.log('infoRotateTransport::state::new = ', filename);
    });

    infoRotateTransport.on('rotate', (oldFilename, newFilename) => {
        console.log('infoRotateTransport::state::rotate = ', oldFilename, newFilename);
    });

    infoRotateTransport.on('archive', (zipFilename) => {
        console.log('infoRotateTransport::state::archived = ', zipFilename);
    });

    infoRotateTransport.on('logRemoved', (removedFilename) => {
        console.log('infoRotateTransport::state::logRemoved = ', removedFilename);
    });

    errorRotateTransport.on('new', (filename) => {
        console.log('errorRotateTransport::state::new = ', filename);
    });

    errorRotateTransport.on('rotate', (oldFilename, newFilename) => {
        console.log('errorRotateTransport::state::rotate = ', oldFilename, newFilename);
    });

    errorRotateTransport.on('archive', (zipFilename) => {
        console.log('errorRotateTransport::state::archived = ', zipFilename);
    });

    errorRotateTransport.on('logRemoved', (removedFilename) => {
        console.log('errorRotateTransport::state::logRemoved = ', removedFilename);
    });
}


module.exports = loggerWinston;