'use strict';

const mongoose = require('mongoose');
const models = require('./models');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();

mongoose.connect('mongodb://localhost/pingwin');

// Serve static content from src/web
app.use(express.static('src/web'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use(morgan('dev'));

app.use('/api', api);

app.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});
