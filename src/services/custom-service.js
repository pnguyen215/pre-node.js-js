const commons = require('./../commons/commons');
const {
    buildResponse
} = require('./base-service');

exports.saySomething = (req, res) => {
    buildResponse(res, commons.httpStatus.OK, 'Say something...!');
}