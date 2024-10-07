import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `${token}`
    }
  }

  try {
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (error) {
    console.error('Error posting new blog:', error)
    return null
  }
}

const updateBlog = async(blog) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `${token}`
    }
  }

  try {
    const response = await axios.put(baseUrl + blog.id, blog, config)
    return response.data
  } catch(error) {
    console.log('Error updating blog: ', error)
    return null
  }
}

const removeBlog = async (blog) => {
  const config = {
    headers: {
      'Authorization': `${token}`
    }
  }

  try{
    const response = await axios.delete(baseUrl + blog, config)
    return response
  } catch(error) {
    console.log('Error deleting blog: ', error)
    return null
  }
}


export default { getAll, setToken, addBlog, updateBlog, removeBlog }