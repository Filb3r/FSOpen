const express = require('express')
const anecdoteRouter = express.Router()

const anecdoteJson = [{
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1,
    user: {
        username: 'timo',
        id: 2
    },
    comments: [
        "Makia!",
        "Hieno!"
    ]
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2,
    user: {
        username: 'timo',
        id: 2
    },
    comments: [
        "!!!!"
    ]
  }]

anecdoteRouter.get('/', (request,response) => {
    response.json(anecdoteJson)
})

anecdoteRouter.get('/:id', (request, response) => {
    const id = Number(request.params.id)
    const anecdoteToFind = anecdoteJson.find(anecdote => anecdote.id === id)

    if(!anecdoteToFind){
        return response.status(404).json({
            error: 'Anecdote not found'
        })
    }

    response.json(anecdoteToFind)
})

anecdoteRouter.post('/', (request, response) => {
    if (!request.body) {
        return response.status(400).json({ 
            error: 'Request body is missing' 
        })
    }
    
    const body = request.body

    if (!body.content || !body.author) {
        return response.status(400).json({ 
            error: 'Content and author are required' 
        })
    }

    const newAnecdote = {
        content: body.content,
        author: body.author,
        info: body.info || '',
        votes: 0,
        id: body.id,
        user: body.user,
        comments: []
    }

    anecdoteJson.push(newAnecdote)

    response.status(201).json(newAnecdote)
})

anecdoteRouter.put('/:id', (request, response) => {
    const id = Number(request.params.id)
    const body = request.body

    const index = anecdoteJson.findIndex(a => a.id === id)

    if (index === -1) {
        return response.status(404).json({ 
            error: 'Anecdote not found' 
        })
    }
    
    const updatedAnecdote = {
        ...anecdoteJson[index],
        ...body,
        id: id
    }

    anecdoteJson[index] = updatedAnecdote

    response.json(updatedAnecdote)
})

module.exports = anecdoteRouter