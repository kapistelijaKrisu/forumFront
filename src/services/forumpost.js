import axios from 'axios'
import dudeservice from "./dude";

const baseUrl = '/api/forumpost/'

const getDetailedForumpost = async (forumpostid)=> {
  const response = await axios.get(baseUrl + forumpostid)
  return response.data
}

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

const postComment = async (forumpost) => {
  const response = await axios.post('/api/comment', forumpost, dudeservice.getHeaders())
  return response.data

}

export default { postComment, getForumpostsByCategory, postForumpost, getForumpostsByDude, getDetailedForumpost }