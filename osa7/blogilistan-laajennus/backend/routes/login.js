const express = require('express')
const loginRouter = express.Router()
const jwt = require('jsonwebtoken')

const usersJson = require('../utils/userData')

loginRouter.post('/login', (request, response) => {
    const { username, password } = request.body

    //const user 
})