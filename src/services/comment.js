import axios from 'axios'
import  dudeservice from "./dude";

const baseUrl = '/api/comment/'

const getCommentsByForumPost = async (forumpostid) => {
  try {
  const response = await axios.get(baseUrl+'forumpost/'+forumpostid)
  return response.data

} catch (exception) {
  console.log(exception)
  return []
}
}

const postComment = async (forumpost) => {
  try{
  const response = await axios.post(baseUrl, forumpost, dudeservice.getHeaders())
  return response.data
  } catch (exception) {
    console.log(exception)
  }
}

export default { getCommentsByForumPost, postComment }