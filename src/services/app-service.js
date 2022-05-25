const loggerWinston = require('./../middleware/loggerWinstonMiddleware').child({ requestId: 'app-service-002' });
const commons = require('./../commons/commons');
const {
    jsonResponseTypeMessage,
    jsonResponseType1,
    jsonResponseType2,
    jsonResponseType3,
    jsonResponseType4
} = require('./base-service');

exports.defaultRoutes = (request, response) => {
    const bots = [
        {
            username: 'bot1',
            id: 1
        },
        {
            username: 'bot2',
            id: 2
        },
        {
            username: 'bot3',
            id: 3
        },
    ]

    return jsonResponseType1(response, "This is list of bots", bots);
    /*
    return jsonResponseTypeMessage(response, 'This is text message');
    return jsonResponseType1(response, "This is Message", arrays);
    return jsonResponseType2(response, "This is Message", arrays, commons.httpStatus.OK);
    return jsonResponseType3(response, "This is Message", commons.httpStatus.OK);
    return jsonResponseType4(response, arrays, commons.httpStatus.OK);
    */
}

exports.defaultErrorRoutes = (request, response) => {
    return jsonResponseTypeMessage(response, 'This is text message defaultErrorRoutes');
};