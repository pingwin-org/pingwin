const users = (state = {}, action) => {
  console.log('user reducer', state, action);
  switch(action.type) {
    case 'FETCH_USERS':
      return Object.assign({}, state, {
        fetchingUsers: true,
        fetchUsersError: null
      });
    case 'FETCH_USERS_SUCCESS':
      return Object.assign({}, state, {
        fetchingUsers: false,
        fetchUsersError: null,
        users: action.users
      });
    case 'FETCH_USERS_ERROR':
      return Object.assign({}, state, {
        fetchingUsers: false,
        fetchUsersError: action.error
      });
    case 'ADD_USER':
      return state;
    default:
      return state;
  }
}

export default users;
