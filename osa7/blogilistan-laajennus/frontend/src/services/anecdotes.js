import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content, currentUser) => {
    console.log(currentUser)
    const object = { ...content, votes: 0, comments: [], user: currentUser}
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew }