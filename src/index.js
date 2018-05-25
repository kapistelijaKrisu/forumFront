import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import axios from 'axios'

const baseUrl = '/api/'

const getAll = () => {
  try {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  } catch (e) {
    //avoid yellow warning
  }
}
getAll()



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
