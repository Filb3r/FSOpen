const express = require('express')
const usersRouter = express.Router()

const usersJson = [{
    username: 'pekka',
    createdAnecdotes: []
    },
    {
      username: 'timo',
      createdAnecdotes: [{
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
    }
]

usersRouter.get('/', (request, response) => {
    response.json(usersJson)
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


module.exports = usersRouter