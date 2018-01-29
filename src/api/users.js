const users = require('express').Router();

var userList = [];

users.get('/', function (req, res) {
  res.send(userList);
});

users.post('/', function (req, res) {
  const newUser = req.body;
  console.log(req.body);
  userList.push(req.body);
  res.sendStatus(200);
});

module.exports = users;
