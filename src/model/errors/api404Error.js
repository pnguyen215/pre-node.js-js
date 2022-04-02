const httpStatusCodes = require('./../enums/httpStatusCodes');
const BaseError = require('./baseError');

class Api404Error extends BaseError {

    constructor(
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

module.exports = Api404Error;

// how to use Api404Error
// const Api404Error = require('./api404Error')
//  throw new Api404Error(`your-messages`)