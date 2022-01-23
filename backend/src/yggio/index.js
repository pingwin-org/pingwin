'use strict';

const _ = require('lodash');
const config = require('../../config.json');
const yggioRequest = require('./yggio-request');

const generateMqttTopic = name => 'yggio/generic/v2/pingwin/' + name;

const ensureYggioSetUp = async (topics, name) => {
  const nameTopic = generateMqttTopic(name);
  if (!_.find(topics, nameTopic)) {
    try {
      const reservedTopicProm = await yggioRequest.post({
        url: '/api/reserved-mqtt-topics',
        data: {
          basicCredentialsSetId: config.BASIC_CREDENTIALS_SET_YGGIO_ID,
          topic: nameTopic
        }
      });
      const iotnodeProm = await yggioRequest.post({
        url: '/api/iotnodes',
        data: {
          name,
          deviceModelName: 'pingwin-rating',
          secret:nameTopic 
        }
      });
      await Promise.all([reservedTopicProm, iotnodeProm]);
    } catch(e) {
      console.error(e.message);
    }
  }
};

const registerMatch = async ({ player1, player2 }) => {
  const topics = await yggioRequest.get({
    url: '/api/reserved-mqtt-topics'
  });
  const yggioConnectionEnsured = await Promise.all([
    ensureYggioSetUp(topics, player1.username),
    ensureYggioSetUp(topics, player2.username)
  ]);
  // TODO: publish match over MQTT
};

const init = yggioUrl => yggioRequest.setYggioUrl(yggioUrl);

module.exports = {
  init,
  registerMatch,
};
