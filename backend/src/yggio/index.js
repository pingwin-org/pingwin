'use strict';

const _ = require('lodash');
const mqtt = require('async-mqtt');
const Bottleneck = require('bottleneck');
const config = require('../../config.json');
const yggioRequest = require('./yggio-request');

const limiter = new Bottleneck({maxConcurrent: 1});

const generateMqttTopic = name => 'yggio/generic/v2/pingwin/' + name;

let topics = [];
const refreshLocalTopicsList = async () => {
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
      await refreshLocalTopicsList();
    } catch(e) {
      console.error(e.message);
    }
  }
};

const registerMultipleMatches = async matches => {
  const client = await mqtt.connectAsync(config.YGGIO_MQTT_HOST, {username: config.MQTT_USERNAME, password: config.MQTT_PASSWORD});
  const matchPromises = _.map(matches, limiter.wrap(async m => {
    console.log(`Updating match with timestamp: ${m.createdAt}`);
    await Promise.all([ 
     await ensureYggioSetUp(m.player1.username),
     await ensureYggioSetUp(m.player2.username)
    ]);
    await Promise.all([
      await client.publish(generateMqttTopic(m.player1.username), JSON.stringify({
        rating: m.player1.newRating,
        reportedAt: m.createdAt
      })),
      await client.publish(generateMqttTopic(m.player2.username), JSON.stringify({
        rating: m.player2.newRating,
        reportedAt: m.createdAt
      })),
    ]);
  }));
  await Promise.all(matchPromises);
  await client.end();
};

const registerSingleMatch = async ({ player1, player2 }) => {
  const [,,client] = await Promise.all([
    await ensureYggioSetUp(player1.username),
    await ensureYggioSetUp(player2.username),
    await mqtt.connectAsync(config.YGGIO_MQTT_HOST, {username: config.MQTT_USERNAME, password: config.MQTT_PASSWORD})
  ]);
  await Promise.all([
    await client.publish(generateMqttTopic(player1.username), JSON.stringify({rating: player1.newRating})),
    await client.publish(generateMqttTopic(player2.username), JSON.stringify({rating: player2.newRating}))
  ]);
  await client.end();
};

const init = async (yggioUrl, matches) => {
  yggioRequest.setYggioUrl(yggioUrl);
  await refreshLocalTopicsList();
  await registerMultipleMatches(matches);
};

module.exports = {
  init,
  registerMatch: limiter.wrap(registerSingleMatch),
};
