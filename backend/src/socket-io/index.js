let io;
const constants = require('./constants');

module.exports.constants = constants;

module.exports.init = (server) => {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {
    io.emit('CONSTANTS', constants);
  });
};

module.exports.notifyUpdate = (type, id) => {
  console.log('Socket - ', type, id);
  io.emit(type, { id: id });
};

module.exports.update = (type, data) => {
  io.emit(type, data);
};
