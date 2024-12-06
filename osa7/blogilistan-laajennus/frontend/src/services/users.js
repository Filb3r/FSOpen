import axios from 'axios'

const baseUrl = 'http://localhost:3000/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postComment = async (content, user) => {
    const response = await axios.post(`${baseUrl}/${user.username}/anecdotes`, content)
    return response.data
}

export default { getAll, postComment }