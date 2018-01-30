'use strict';

const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use('/matches', require('./matches'));

module.exports = routes;
