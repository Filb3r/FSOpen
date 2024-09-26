const { test, after, beforeEach, describe } = require('node:test')
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
    console.log('cleared blogs')

    const blogObjects = initialBlogs
      .map(blog => new Blog(blog))
    
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Step 1 tests', () => {
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
})

describe('Step 2 tests', () => {
test('every blogs id key should be "id" and not "_id"', async() => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.ok(Object.keys(blog).includes('id'))
  })
})
})

describe('Step 3,4 and 5 tests', () => {
  test('check if posting a blog works', async() => {
    const blogPost = {
      "title": "Testing",
      "author": "Tester Guy",
      "url": "www.testing.com",
      "likes": 605
    }
  
    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(201)
  
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, (initialBlogs.length + 1))
  })

  test('if no likes are given, it should return 0', async() => {
    const blogPost = {
      "title": "Testing",
      "author": "Tester Guy",
      "url": "www.testing.com"
    }
  
    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(201)
  
    const response = await api.get('/api/blogs')
    const postedBlog = response.body[response.body.length - 1]
    assert.strictEqual(postedBlog.likes, 0)

    await api
      .delete(`/api/blogs/${postedBlog.id}`)
      .expect(204)
  })

  test('if title or url not given, expect 400 bad request', async() => {
    const blogPost = {
      "title": "test title",
      "author": "Tester Guy",
      "likes": 45
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(400)
  })
  })


after(async () => {
    await mongoose.connection.close()
})