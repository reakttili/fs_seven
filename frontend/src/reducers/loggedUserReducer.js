const reducer = (store = null, action) => {
  switch (action.type) {
  case 'SET_LOGGED_USER':
    console.log("Logged user set:", action.user)
    store = action.user
    return store
  default:
    return store
  }
}

const actionFor = {
  settingLoggedUser(user) {
    return async (dispatch, getState) => {
      dispatch({
        type: 'SET_LOGGED_USER',
        user: user
      })
    }
  }
}

export { reducer }
export { actionFor }
