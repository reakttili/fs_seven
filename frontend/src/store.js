import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as notificationReducer } from './reducers/notificationReducer'
import { reducer as blogReducer } from './reducers/blogReducer'
import { reducer as userReducer } from './reducers/userReducer'
import { reducer as loggedReducer } from './reducers/loggedUserReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducer = combineReducers( {
  notification: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
  loggedUser: loggedReducer
  })
const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store