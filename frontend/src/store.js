import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as notificationReducer } from './reducers/notificationReducer'
import { reducer as blogReducer } from './reducers/blogReducer'
import thunk from 'redux-thunk'

const combinedReducer = combineReducers( {
  notification: notificationReducer,
  blogs: blogReducer
  })
const store = createStore(
  combinedReducer,
  applyMiddleware(thunk)
)

export default store