import axios from 'axios'
const baseUrl = '/api/'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getHeaders = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl + 'login', credentials)
  return response.data
}

const register = async (credentials) => {
  const response = await axios.post(baseUrl + 'dude', credentials)
  return response.data
}
export default { setToken, token, login, register, getHeaders }