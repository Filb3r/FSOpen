import axios from 'axios'

const baseUrl = 'http://localhost:3000/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addAnecdote = async (content, user) => {
    const parsedContent = {
        content: content.content,
        author: content.author,
        url: content.url,
        id: content.id
    };

    const response = await axios.post(`${baseUrl}/${user}/anecdotes`, parsedContent)
    return response.data
}

const addUser = async (content) => {
    const response = await axios.post(baseUrl, content)
    return response.data
}

export default { getAll, addAnecdote, addUser }