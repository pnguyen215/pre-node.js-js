
const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'objectUtils-004' });


function allNotNull(...values) {

    if (values == null ||
        values == undefined ||
        values == '') {
        loggerWinston.debug(`allNotNull::step::1 = ${values}`);
        return false;
    }

    for (const value in values) {
        if (value == null || value == undefined || value == '') {
            loggerWinston.debug(`allNotNull::step::2 = ${values}`);
            return false;
        }
    }

    loggerWinston.debug(`allNotNull::step::3 = ${values}`);
    return true;
}

function trimAsWhitespace(value) {

    if (!value) {
        loggerWinston.debug(`trimAsWhitespace::step::1 = ${value}`);
        return value;
    }

    if (!(value instanceof String)) {
        loggerWinston.debug(`trimAsWhitespace::step::2 = ${value}`);
        return value;
    }

    loggerWinston.debug(`trimAsWhitespace::step::3 = ${value}`);
    return value.trim();
}

module.exports = {
    allNotNull,
    trimAsWhitespace
}