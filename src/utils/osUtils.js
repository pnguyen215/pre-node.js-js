const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'osUtils-004' });
const { allNotNull, trimAsWhitespace } = require('./objectUtils');
const commons = require('../commons/commons');


function isWindow() {
    return commons.ops.platform == 'win32'; // or process.platform
}

function isLinux() {
    return commons.ops.platform == 'linux'; // or process.platform
}

function isMac() {
    return commons.ops.platform == 'darwin'; // or process.platform
}

function findDirToUpload() {

    const dirDefault = '/undefined/resources';

    if (isWindow()) {
        return process.env.PARAMS_NAME_REPOSITORY_UPLOAD_WIN32 ?
            process.env.PARAMS_NAME_REPOSITORY_UPLOAD_WIN32 : dirDefault;
    }

    if (isLinux()) {
        return process.env.PARAMS_NAME_REPOSITORY_UPLOAD_LINUX ?
            process.env.PARAMS_NAME_REPOSITORY_UPLOAD_LINUX : dirDefault;
    }

    if (isMac()) {
        return process.env.PARAMS_NAME_REPOSITORY_UPLOAD_MAC ?
            process.env.PARAMS_NAME_REPOSITORY_UPLOAD_MAC : dirDefault;
    }

    return process.env.PARAMS_NAME_REPOSITORY_UPLOAD_DEFAULT ?
        process.env.PARAMS_NAME_REPOSITORY_UPLOAD_DEFAULT : dirDefault;
}

module.exports = {
    isWindow,
    isLinux,
    isMac,
    findDirToUpload
}