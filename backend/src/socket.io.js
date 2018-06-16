let io;

module.exports.init = (server) => {
  io = require('socket.io')(server);
};

module.exports.notifyUpdate = (type, id) => {
  console.log('Socket - ', type, id);
  io.emit(type, { id: id });
};


