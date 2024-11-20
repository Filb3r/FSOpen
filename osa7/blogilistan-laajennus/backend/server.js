const express = require('express')
const app = express()
const anecdoteRoute = require('./routes/anecdotes')

app.get('/', (request, response) => {
    response.send('Hello!')
})

app.use('/anecdotes', anecdoteRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})