const express = require('express')
const app = express()
require('dotenv').config()
const anecdoteRouter = require('./routes/anecdotes')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const middleware = require('./utils/middleware')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('Hello!')
})

app.use('/anecdotes', middleware.authenticate, anecdoteRouter)
app.use('/users',  usersRouter)
app.use('/login', loginRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})