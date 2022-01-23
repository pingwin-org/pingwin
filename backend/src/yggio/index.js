'use strict';

const _ = require('lodash');
const mqtt = require('async-mqtt');
const config = require('../../config.json');
const yggioRequest = require('./yggio-request');

const generateMqttTopic = name => 'yggio/generic/v2/pingwin/' + name;

let topics = [];
const updateTopics = async () => {
  topics = await yggioRequest.get({
    url: '/api/reserved-mqtt-topics'
  });
};

const ensureYggioSetUp = async name => {
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
      await updateTopics();
    } catch(e) {
      console.error(e.message);
    }
  }
};

const registerMatch = async ({ player1, player2 }) => {
  await Promise.all([
    await ensureYggioSetUp(player1.username),
    await ensureYggioSetUp(player2.username)
  ]);

  try {
    const client  = await mqtt.connectAsync(config.YGGIO_MQTT_HOST, {username: config.MQTT_USERNAME, password: config.MQTT_PASSWORD});
    await client.publish(generateMqttTopic(player1.username), JSON.stringify({rating: player1.newRating}));
    await client.publish(generateMqttTopic(player2.username), JSON.stringify({rating: player2.newRating}));
    await client.end();
  } catch (e) {
    console.error(e);
  }
};

const init = async yggioUrl => {
  yggioRequest.setYggioUrl(yggioUrl);
  await updateTopics();
};

module.exports = {
  init,
  registerMatch,
};
