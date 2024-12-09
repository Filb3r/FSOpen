const express = require('express')
const loginRouter = express.Router()
const jwt = require('jsonwebtoken')

const usersJson = require('../utils/userData')

loginRouter.post('/', (request, response) => {
    const { username, password } = request.body

    console.log('Login route hit', request.body);

    const user = usersJson.find(user => user.username === username && user.password === password)

    if(!user) {
        return response.status(401).json({ error: 'invalid credentials!' })
    }

    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    response.json({ token })
})

module.exports = loginRouter