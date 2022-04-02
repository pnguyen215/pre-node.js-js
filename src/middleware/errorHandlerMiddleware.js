const { jsonResponseType3 } = require('./../services/base-service');
const commons = require('./../commons/commons');
const BaseError = require('./../model/errors/baseError');
const loggerWinston = require('./loggerWinstonMiddleware');

function logError(error) {
    loggerWinston.error(error);
}

function logErrorMiddleware(error, request, response, next) {
    logError(error);
    next();
}

function responseError(error, request, response, next) {
    jsonResponseType3(
        response,
        error.message,
        error.statusCode || commons.httpStatus.INTERNAL_SERVER_ERROR
    );
}

function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}

module.exports = {
    logError,
    logErrorMiddleware,
    responseError,
    isOperationalError
}

// In your API routes you’ll end up using the next() function to forward errors to the error handler middleware
// The next() function is a special function in Express.js middlewares that sends values down the middleware chain.
// Example:
/*
app.post('/user', async (req, res, next) => {
 try {
const newUser = User.create(req.body)
 } catch (error) {
 next(error)
 }
})
*/

// At the bottom of your routes files you should have a .use() method that uses the error handler middleware function.
/*
const { logError, returnError } = require('./errorHandlerMiddleware')

app.use(logError)
app.use(returnError)
*/

// The error handler middleware should have a few key parts.
// You should check if the error is operational, and decide which errors to send as alert notifications so you can debug them in more detail.