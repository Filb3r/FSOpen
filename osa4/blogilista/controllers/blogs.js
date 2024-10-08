const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request,response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id).populate('user', {username: 1, name: 1, id: 1})
  if (blog){
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
}) 

blogsRouter.post('/', async (request,response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken){
    return response.status(401).json({error: 'token invalid'})
  }
  const user = request.user

  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes || 0,
    "user": user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id).populate('user', {username: 1, name: 1, id: 1})

  if(!user || (blog.user.id.toString() != user.id.toString())){
    return response.status(401).json({error: 'token invalid'})
  } 

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