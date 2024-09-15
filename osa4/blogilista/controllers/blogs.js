const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request,response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})

blogsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Blog
    .findOne({_id: id})
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
}) 

blogsRouter.post('/', (request,response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})


blogsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Blog
  .findOneAndDelete({_id: id})
  .then(result => {
    response.status(201).json('Succesfully deleted!')
  })
  .catch(error => next(error))
})

blogsRouter

module.exports = blogsRouter