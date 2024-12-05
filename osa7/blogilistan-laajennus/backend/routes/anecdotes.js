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

const generateId = () => {
    return anecdoteJson.length > 0
    ? Math.max(...anecdoteJson.map(n => n.id)) + 1
    : 1    
}

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

anecdoteRouter.get('/:id/comments', (request, response) => {
    const id = Number(request.params.id)

    const anecdoteToFind = anecdoteJson.find(anecdote => anecdote.id === id)

    if(!anecdoteToFind){
        return response.status(404).json({
            error: 'Anecdote not found'
        })
    }

    response.json(anecdoteToFind.comments)
})

anecdoteRouter.post('/', (request, response) => {
    console.log(request.body)
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
        info: body.url || '',
        votes: body.votes,
        id: generateId(),
        user: body.user,
        comments: body.comments
    }

    anecdoteJson.push(newAnecdote)

    response.status(201).json(newAnecdote)
})

anecdoteRouter.post('/:id/comments', (request, response) => {
    const id = Number(request.params.id)
    const { comment } = request.body

    if(!comment) {
        return response.status(400).json({
            error: 'Content is required!'
        })
    }

    const anecdoteToUpdate = anecdoteJson.find(anecdote => anecdote.id === id)

    if(!anecdoteToUpdate){
        return response.status(400).json({
            error: 'Anecdote not found!'
        })
    }

    anecdoteToUpdate.comments.push(comment)

    response.status(201).json(anecdoteToUpdate.comments)
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

anecdoteRouter.delete('/:id', (request, response) => {
    const id = Number(request.params.id)

    const updatedAnecdotes = anecdoteJson.filter(anecdote => anecdote.id !== id)

    anecdoteJson.length = 0
    anecdoteJson.push(...updatedAnecdotes)

    response.status(204).end()
})

module.exports = anecdoteRouter