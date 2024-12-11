const express = require('express')
const usersRouter = express.Router()

const usersJson = require('../utils/userData')

usersRouter.get('/', (request, response) => {
    response.json(usersJson)
})

usersRouter.get('/:username', (request, response) => {
    const username = request.params.username
    const userToFind = usersJson.find(user => user.username === username)

    if(!userToFind){
        return response.status(404).json({
            error: 'User not found!'
        })
    }

    response.json(userToFind)
})

usersRouter.post('/', (request, response) => {
    const body = request.body

    if(!body.username || !body.password) {
        return response.status(400).json({
            error: 'Username or password missing!'
        })
    }

    const newUser = {
        username: body.username,
        password: body.password,
        createdAnecdotes: []
    }

    usersJson.push(newUser)

    response.status(201).json({...newUser, registered: true})
})

usersRouter.post('/:username/anecdotes', (request, response) => {
    const username = request.params.username
    const anecdote  = request.body

    const userToUpdate = usersJson.find(user => user.username === username)

    if(!userToUpdate){
        return response.status(400).json({
            error: 'User not found!'
        })
    }

    userToUpdate.createdAnecdotes.push(anecdote)

    response.status(201).json(userToUpdate.createdAnecdotes)
})


module.exports = usersRouter