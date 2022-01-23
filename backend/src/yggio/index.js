'use strict';

const _ = require('lodash');
const mqtt = require('async-mqtt');
const config = require('../../config.json');
const yggioRequest = require('./yggio-request');

const generateMqttTopic = name => 'yggio/generic/v2/pingwin/' + name;

const ensureYggioSetUp = async (topics, name) => {
  const nameTopic = generateMqttTopic(name);
  if (!_.find(topics, ({topic}) => topic === nameTopic)) {
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
  await Promise.all([
    await ensureYggioSetUp(topics, player1.username),
    await ensureYggioSetUp(topics, player2.username)
  ]);
  // TODO: fix problems with MQTT
  try {
    const client  = await mqtt.connectAsync(config.YGGIO_MQTT_HOST, {username: config.MQTT_USERNAME, password: config.MQTT_PASSWORD});
    await client.publish(generateMqttTopic(player1.username), JSON.stringify(player1));
    await client.publish(generateMqttTopic(player2.username), JSON.stringify(player2));
    await client.end();
  } catch (e) {
    console.error(e);
  }
};

const init = yggioUrl => yggioRequest.setYggioUrl(yggioUrl);

module.exports = {
  init,
  registerMatch,
};
