const routes = require('express').Router();

routes.use('/users', require('./users'));

module.exports = routes;
