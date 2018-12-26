import axios from 'axios'
import dudeservice from "./dude";

const baseUrl = '/api/forumpost/'

const getDetailedForumpost = async (forumpost_id)=> {
  const response = await axios.get(baseUrl + forumpost_id)
  return response.data
}

const getForumpostsByCategory = async (category_id, limit, offset) => {
  const response = await axios.get(baseUrl + 'category/' + category_id, {
    params: {
      limit: limit,
      offset: offset
    }
  })
  return response.data
}

const getForumpostsByDude = async (dude_id, limit, offset) => {
  const response = await axios.get(baseUrl + 'dude/' + dude_id, {
    params: {
      limit: limit,
      offset: offset
    }
  })
  return response.data
}

const postForumpost = async (forumpost) => {
  const response = await axios.post(baseUrl, forumpost, dudeservice.getHeaders())
  return response.data
}

const putForumpost = async (forumpost) => {
  const response = await axios.put(baseUrl, forumpost, dudeservice.getHeaders())
  return response.data
}

const postComment = async (forumpost) => {
  const response = await axios.post('/api/comment', forumpost, dudeservice.getHeaders())
  return response.data

}

const editComment = async (comment) => {
  console.log('aa')
  const response = await axios.put('/api/comment', comment, dudeservice.getHeaders())
  return response.data
}

const getForumpostCountByCategory = async (category_id) => {
  const response = await axios.get(baseUrl + 'count/category/'+category_id)
  return response.data
}
const getForumpostCountByCreator = async (dude_id) => {
  const response = await axios.get(baseUrl + 'count/creator/'+dude_id)
  return response.data
}

export default { postComment, getForumpostCountByCreator, getForumpostCountByCategory, getForumpostsByCategory, postForumpost, getForumpostsByDude, getDetailedForumpost, putForumpost, editComment }