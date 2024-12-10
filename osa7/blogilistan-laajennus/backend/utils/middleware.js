const logger = require('./logger')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()


const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('------------')
    next()
}

const authenticate = (request, response, next) => {
    const authorization = request.headers.authorization

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split(' ')[1]
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            request.user = decoded.user
            next()
        } catch (error) {
            return response.status(401).json({ error: 'Invalid token' })
        }
    } else {
        return response.status(401).json({ error: 'Authorization token is missing!'})
    }
}

module.exports = {
    requestLogger,
    authenticate
}