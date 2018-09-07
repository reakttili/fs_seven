import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
//import userService from './services/users'

const render = () => {
    
    ReactDOM.render(
      <Provider store={store}>
        <App store={store} />
      </Provider>,
      document.getElementById('root')
    )
  }
  
  render()
  store.subscribe(render)