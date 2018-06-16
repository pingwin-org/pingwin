const users = (state = {}, action) => {
  switch (action.type) {
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
      return Object.assign({}, state, {
        userWasAdded: false,
        addingUser: true,
        addUserError: null
      });
    case 'ADD_USER_SUCCESS':
      return Object.assign({}, state, {
        userWasAdded: true,
        addingUser: false,
        addUserError: null
      });
    case 'ADD_USER_ERROR':
      return Object.assign({}, state, {
        userWasAdded: false,
        addingUser: false,
        addUserError: action.error
      });
    default:
      return state;
  }
}

export default users;
