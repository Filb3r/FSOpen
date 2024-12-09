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
    if(!request.body) {
        return response.status(400).json({
            error: 'Request body missing!'
        })
    }
    const body = request.body

    const newUser = {
        username: body.username,
        createdAnecdotes: []
    }

    usersJson.push(newUser)

    response.status(201).json(newUser)
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