const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs =[
    {
      "title": "Aku Ankka",
      "author": "Don Rosa",
      "url": "www.akuankka.com",
      "likes": 120
    },
    {
      "title": "Hessu Hopo",
      "author": "Don Tester",
      "url": "www.hessu.com",
      "likes": 196
    }
  ]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async() => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('')


after(async () => {
    await mongoose.connection.close()
})