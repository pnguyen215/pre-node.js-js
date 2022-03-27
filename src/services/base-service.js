const commons = require('./../commons/commons');

//  console.log('Function = ? ', JSON.stringify(model, null, 2));

let onModelDefault = {
    items: null,
    code: commons.httpStatus.OK,
    total: 0,
    message: '',
    status: '',
    debugMsg: '',
    publish: new Date(),
    gwt: new Date()
};

function buildResponseMessage(message) {
    let model = { ...onModelDefault };
    model.message = message;
    model.code = commons.httpStatus.OK;
    return model;
}

function buildResponseType1(message, data) {
    let model = buildResponseMessage(message);
    model.items = data;

    if (data === null || data === undefined) {
        model.total = 0;
    }

    if (data instanceof Set || data instanceof Map) {
        model.total = data.size;
    }

    if (Array.isArray(data)) {
        model.total = data.length;
    }

    return model;
}

function buildResponseType2(message, data, statusCode) {
    let model = buildResponseType1(message, data);
    model.code = statusCode;
    return model;
}

function buildResponseType3(message, statusCode) {
    let model = buildResponseType2(message, null, statusCode);
    return model;
}

function buildResponseType4(data, statusCode) {
    let model = buildResponseType2(null, data, statusCode);
    return model;
}

exports.jsonResponseTypeMessage = (response, message) => {
    response.status(200).json(buildResponseMessage(message));
};

exports.jsonResponseType1 = (response, message, data) => {
    response.status(200).json(buildResponseType1(message, data));
}

exports.jsonResponseType2 = (response, message, data, statusCode) => {
    response.status(statusCode).json(buildResponseType2(message, data, statusCode));
}

exports.jsonResponseType3 = (response, message, statusCode) => {
    response.status(statusCode).json(buildResponseType3(message, statusCode));
}

exports.jsonResponseType4 = (response, data, statusCode) => {
    response.status(statusCode).json(buildResponseType4(data, statusCode));
}