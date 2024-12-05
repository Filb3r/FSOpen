const express = require('express')
const app = express()
const anecdoteRouter = require('./routes/anecdotes')
const middleware = require('./utils/middleware')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('Hello!')
})

app.use('/anecdotes', anecdoteRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})