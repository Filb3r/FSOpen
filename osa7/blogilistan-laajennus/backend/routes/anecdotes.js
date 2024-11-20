const express = require('express')
const anecdoteRouter = express.Router()

anecdoteRouter.get('/', (request,response) => {
    response.send('<h1>Anecdotes here -> </h1>')
})

module.exports = anecdoteRouter