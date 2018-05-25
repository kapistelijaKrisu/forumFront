import axios from 'axios'
import  dudeservice from "./dude";

const baseUrl = '/api/category/'


const getAllCategories = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postCategory = async (category) => {
  const response = await axios.post(baseUrl, category, dudeservice.getHeaders())
  return response.data
}

export default { getAllCategories, postCategory }