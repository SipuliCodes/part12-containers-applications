import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async details => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, details, config)
  return response.data
}

const like = async (details, id) => {

  const url = `${baseUrl}/${id}`

  const response = await axios.put(url, details)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`

  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, like, remove }