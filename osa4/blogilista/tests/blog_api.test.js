const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('cleared blogs and users')

  const saltRounds = 10
  const passwordHash = await bcrypt.hash('testi', saltRounds)

  const user = new User({
    username: 'root',
    name: 'rootUser',
    passwordHash
  })

  await user.save()

  const initialBlogs =[
    {
      "title": "Aku Ankka",
      "author": "Don Rosa",
      "url": "www.akuankka.com",
      "likes": 120,
      "user": user.id
    },
    {
      "title": "Hessu Hopo",
      "author": "Don Tester",
      "url": "www.hessu.com",
      "likes": 196,
      "user": user.id
    }
  ]

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

      assert.strictEqual(response.body.length, 2)
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
    const loginResponse = await api
      .post('/api/login')
      .send({username: 'root', password: 'testi'})

    token = loginResponse.body.token  

    const blogPost = {
      "title": "Testing",
      "author": "Tester Guy",
      "url": "www.testing.com",
      "likes": 605
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogPost)
      .expect(201)
  
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 3)
  })

  test('if no likes are given, it should return 0', async() => {
    const loginResponse = await api
      .post('/api/login')
      .send({username: 'root', password: 'testi'})

    token = loginResponse.body.token

    const blogPost = {
      "title": "Testing",
      "author": "Tester Guy",
      "url": "www.testing.com"
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogPost)
      .expect(201)
  
    const response = await api.get('/api/blogs')
    const postedBlog = response.body[response.body.length - 1]
    assert.strictEqual(postedBlog.likes, 0)

    await api
      .delete(`/api/blogs/${postedBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })

  test('if title or url not given, expect 400 bad request', async() => {
    const loginResponse = await api
      .post('/api/login')
      .send({username: 'root', password: 'testi'})

    token = loginResponse.body.token
    const blogPost = {
      "title": "test title",
      "author": "Tester Guy",
      "likes": 45
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogPost)
      .expect(400)
  })
  })


after(async () => {
    await mongoose.connection.close()
})