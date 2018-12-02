import io from 'socket.io-client';
import { fetchMatches } from '../actions/matches';
import { newUser, updatedUser } from '../actions/users';

let socket;
let dispatch;

const registerSockets = (consts) => {
  socket.on(consts.matches.NEW, (data) => {
    dispatch(fetchMatches());
  });

  socket.on(consts.users.NEW, (data) => {
    dispatch(newUser(data));
  });

  socket.on(consts.users.UPDATED, (data) => {
    dispatch(updatedUser(data));
  });
};

module.exports.init = (store) => {
  dispatch = store.dispatch;
  socket = io('/');
  socket.on('connect', () => {
    console.log('YARGH CONNECTIONSSSSS');
    socket.on('CONSTANTS', (constants) => {
      registerSockets(constants);
    });
  });
};
