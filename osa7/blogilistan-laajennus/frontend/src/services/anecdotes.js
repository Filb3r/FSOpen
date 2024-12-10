import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'

const getAuthConfig = () => {
    const token = localStorage.getItem('authToken')
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl, getAuthConfig())
    return response.data
}

const createNew = async (content) => {
    const object = { ...content, votes: 0, comments: []}
    const response = await axios.post(baseUrl, object, getAuthConfig())
    return response.data
}

const addComment = async (content, id) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment: content }, getAuthConfig())
    return response.data
}

const addVote = async(content, id) => {
    const updatedAnecdote = {
        ...content,
        votes: content.votes + 1
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote, getAuthConfig())
    return response.data
} 

export default { getAll, createNew, addComment, addVote }