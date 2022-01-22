'use strict';

const _ = require('lodash');
const config = require('../../config.json');
const yggioRequest = require('./yggio-request');

const init = yggioUrl => {
  yggioRequest.setYggioUrl(yggioUrl);
};

const registerMatch = async match => {
  // make sure MQTT-topic is reserved in Yggio
  const topics = await yggioRequest.get({
    url: '/api/reserved-mqtt-topics'
  });
  console.log(topics);
  // publish match over MQTT
};

module.exports = {
  init,
  registerMatch,
};
