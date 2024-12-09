import axios from 'axios'

const baseUrl = 'http://localhost:3000/login'

const login = async (username, password) => {
    try {
        const response = await axios.post(baseUrl, { username, password })
        const { token } = response.data

        localStorage.setItem('authToken', token)
        return response.data
    } catch (error) {
        console.error('Login failed:', error)
    }

}

export default { login }