const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'sys-service-003' });
const commons = require('../commons/commons');
const { allNotNull } = require('./../utils/objectUtils');
const { findDirToUpload } = require('./../utils/osUtils');
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
        return jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(path))) {
        return jsonResponseType3(
            response,
            'Path not found',
            commons.httpStatus.BAD_REQUEST);
    }

    return response.download(path, getFullFileExtensionFromPath(path), (error) => {
        if (error) {
            jsonResponseType2(response, error.stack, request.body, commons.httpStatus.INTERNAL_SERVER_ERROR);
        }
    });
}

exports.downloadZip = async (request, response, next) => {

    const path = request.body.path;

    if (!allNotNull(path)) {
        return jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isEndWith(path, '.zip'))) {
        return jsonResponseType3(
            response,
            `Path is required end with extension '.zip'`,
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(path))) {
        return jsonResponseType3(
            response,
            'Path not found',
            commons.httpStatus.BAD_REQUEST);
    }

    return response.download(path, getFullFileExtensionFromPath(path), (error) => {
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
        return jsonResponseType3(
            response,
            'Path is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!allNotNull(zipPath)) {
        return jsonResponseType3(
            response,
            'zipPath is required',
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isEndWith(zipPath, '.zip'))) {
        return jsonResponseType3(
            response,
            `zipPath is required end with extension '.zip'`,
            commons.httpStatus.BAD_REQUEST);
    }

    if (!(await isDirectoryExisted(path))) {
        return jsonResponseType3(
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
        return jsonResponseType2(response, error.stack, request.body, commons.httpStatus.INTERNAL_SERVER_ERROR);
    }

}

exports.upload = (request, response, next) => {

    if (!request.files) {
        return jsonResponseType3(
            response,
            'File is required',
            commons.httpStatus.BAD_REQUEST);
    }

    const file = request.files.file;
    const repository = findDirToUpload() + '/' + file.name;

    file.mv(repository, (error) => {
        if (error) {
            return jsonResponseType3(
                response,
                error.stack,
                commons.httpStatus.INTERNAL_SERVER_ERROR);
        }

        return jsonResponseType2(
            response,
            'File has been uploaded successfully',
            repository,
            commons.httpStatus.OK);
    })
}