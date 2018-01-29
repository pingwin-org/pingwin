'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();

// Serve static content from src/web
app.use(express.static('src/web'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);

app.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});

