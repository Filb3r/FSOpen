const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request,response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(request.params.id)
  if (blog){
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
}) 

blogsRouter.post('/', async (request,response) => {
  const body = request.body
  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findOneAndDelete({_id: id})
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  console.log(updatedBlog)

  response.status(200).json(blog)
})

module.exports = blogsRouter