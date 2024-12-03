const express = require('express')
const app = express()
const anecdoteRoute = require('./routes/anecdotes')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('Hello!')
})

app.use('/anecdotes', anecdoteRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})