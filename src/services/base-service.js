exports.buildResponse = (res, statusCode, data) => {

    res.status(statusCode).json({
        result: data
    });
};