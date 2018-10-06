import axios from 'axios'
import dudeservice from "./dude";

const baseUrl = '/api/forumpost/'

const getDetailedForumpost = async (forumpost_id)=> {
  const response = await axios.get(baseUrl + forumpost_id)
  return response.data
}

const getForumpostsByCategory = async (category_id) => {
  const response = await axios.get(baseUrl + 'category/' + category_id)
  return response.data
}

const getForumpostsByDude = async (dude_id) => {
  const response = await axios.get(baseUrl + 'dude/' + dude_id)
  return response.data
}

const postForumpost = async (forumpost) => {
  const response = await axios.post(baseUrl, forumpost, dudeservice.getHeaders())
  return response.data
}

const postComment = async (forumpost) => {
  const response = await axios.post('/api/comment', forumpost, dudeservice.getHeaders())
  return response.data

}

export default { postComment, getForumpostsByCategory, postForumpost, getForumpostsByDude, getDetailedForumpost }