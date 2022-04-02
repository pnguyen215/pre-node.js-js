const commons = require('../commons/commons');
const morgan = commons.logger;
const json = commons.morgan_json;
const loggerWinston = require('./loggerWinstonMiddleware');

const format = json({
    method: ':method',
    url: ':url',
    status: ':status',
    contentLength: ':res[content-length]',
    responseTime: ':response-time'
});

const options = {
    common: {
        logSessions: 'Morgan Http Request'
    }
}

const loggerMorganHttp = morgan(format, {
    stream: {
        write: (message) => {
            const {
                method,
                url,
                status,
                contentLength,
                responseTime
            } = JSON.parse(message);

            loggerWinston.info(options.common.logSessions,
                {
                    timestamp: new Date().toString(),
                    method,
                    url,
                    status: Number(status),
                    contentLength,
                    responseTime: Number(responseTime)
                }
            );
        }
    }
});

module.exports = loggerMorganHttp;