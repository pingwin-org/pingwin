const mongoose = require('mongoose');
const models = require('../../backend/src/models');
mongoose.connect('mongodb://localhost/pingwin');
const User = require('mongoose').model('User');

User.find({}).then(users => {
  return Promise.all(users.map(user => user.save()))
}).then(() => {
  process.exit(1)
})
