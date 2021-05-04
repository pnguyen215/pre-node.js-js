module.exports = app => {

    const appService = require('./../services/app-service');

    app.get('/', appService.defaultRoutes);

    app.get('/error', appService.defaultErrorRoutes);
};