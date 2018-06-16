'use strict';

const users = require('express').Router();
const User = require('mongoose').model('User');

users.get('/', async function (req, res) {
  const users = await User.find({}).exec();
  res.send(users);
});

users.post('/', async function (req, res) {
  try {
    const user = new User(req.body);
    delete user.rating; // prevent rating from being set by the request
    await user.save();
    console.log('Added new user', user.username);
    res.sendStatus(200);
  } catch (e) {
    console.log('error posting user', e);
    res.status(500).send(e.message);
  }
});

module.exports = users;
