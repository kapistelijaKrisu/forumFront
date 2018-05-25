import axios from 'axios'
import dudeservice from "./dude";

const baseUrl = '/api/forumpost/'

const getForumpostsByCategory = async (categoryid) => {
  const response = await axios.get(baseUrl + '/category/' + categoryid)
  return response.data
}

const getForumpostsByDude = async (dudeid) => {
  const response = await axios.get(baseUrl + '/dude/' + dudeid)
  return response.data
}

const postForumpost = async (forumpost) => {
  const response = await axios.post(baseUrl, forumpost, dudeservice.getHeaders())
  return response.data
}

export default { getForumpostsByCategory, postForumpost, getForumpostsByDude }