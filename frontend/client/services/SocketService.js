import io from 'socket.io-client';
import { fetchMatches } from '../actions/matches';
import { fetchUsers } from '../actions/users';

let socket;
let dispatch;

module.exports.init = (store) => {

  dispatch = store.dispatch;

  socket = io('/');

  socket.on('connect', () => {
    console.log('Socket Connected')
  });
  
  socket.on('NEW_MATCH', (data) => {
    dispatch(fetchMatches());
  });

  socket.on('NEW_USER', (data) => {
    dispatch(fetchUsers());
  });

}

