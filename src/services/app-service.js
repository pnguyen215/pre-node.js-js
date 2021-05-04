const commons = require('./../commons/commons');
const {
    buildResponse
} = require('./base-service');

exports.defaultRoutes = (req, res) => {
    buildResponse(res, commons.httpStatus.OK, 'IoT');
}

exports.defaultErrorRoutes = (req, res) => {
    buildResponse(res, commons.httpStatus.OK, 'Can not to find routes!');
};