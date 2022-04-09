const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'sys-service-003' });
const commons = require('../commons/commons');
const { allNotNull } = require('./../utils/objectUtils');
const {
    isDirectoryExisted,
    createDirectories,
    isEndWith,
    getFullFileExtensionFromPath
} = require('./../utils/sysUtils');
const {
    jsonResponseTypeMessage,
    jsonResponseType1,
    jsonResponseType2,
    jsonResponseType3,
    jsonResponseType4
} = require('./base-service');


exports.downloadSources = async (request, response, next) => {
    const path = request.body.path;

    if (!allNotNull(path)) {
        jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(path))) {
        jsonResponseType3(
            response,
            'Path not found',
            commons.httpStatus.BAD_REQUEST);
    }

    response.download(path, getFullFileExtensionFromPath(path), (error) => {
        if (error) {
            jsonResponseType2(response, error.stack, request.body, commons.httpStatus.INTERNAL_SERVER_ERROR);
        }
    });
}

exports.downloadZip = async (request, response, next) => {

    const path = request.body.path;

    if (!allNotNull(path)) {
        jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isEndWith(path, '.zip'))) {
        jsonResponseType3(
            response,
            `Path is required end with extension '.zip'`,
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(path))) {
        jsonResponseType3(
            response,
            'Path not found',
            commons.httpStatus.BAD_REQUEST);
    }

    response.download(path, getFullFileExtensionFromPath(path), (error) => {
        if (error) {
            jsonResponseType2(response, error.stack, request.body, commons.httpStatus.INTERNAL_SERVER_ERROR);
        }
    });

}

exports.zipDirectories = async (request, response, next) => {

    const path = request.body.path;
    const zipPath = request.body.zipPathDownload;
    const enabledZipLocal = request.query.enabledZipLocal;

    if (!allNotNull(path)) {
        jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!allNotNull(zipPath)) {
        jsonResponseType3(
            response,
            'zipPath is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isEndWith(zipPath, '.zip'))) {
        jsonResponseType3(
            response,
            `zipPath is required end with extension '.zip'`,
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(path))) {
        jsonResponseType3(
            response,
            'Path not found',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(zipPath))) {
        await createDirectories(zipPath);
    }

    try {

        const zip = new commons.admZip();
        zip.addLocalFolder(path);

        if (enabledZipLocal == 'true') {
            zip.writeZip(zipPath);
        }

        const fileName = getFullFileExtensionFromPath(zipPath);
        const dataDownloaded = zip.toBuffer();

        response.set('Content-Type', 'application/octet-stream');
        response.set('Content-Disposition', `attachment; filename=${fileName}`);
        response.set('Content-Length', dataDownloaded.length);
        response.send(dataDownloaded);
    } catch (error) {
        loggerWinston.error(`Can't zip or download zip folder, cause: ${error}`);
        jsonResponseType2(response, error.stack, request.body, commons.httpStatus.INTERNAL_SERVER_ERROR);
    }

}