import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { ...content, votes: 0, comments: []}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addComment = async (content, id) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment: content })
    return response.data
}

const addVote = async(content, id) => {
    const updatedAnecdote = {
        ...content,
        votes: content.votes + 1
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
} 

export default { getAll, createNew, addComment, addVote }