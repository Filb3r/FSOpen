const {test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest= require('supertest')
const app = require('../app')
const assert = require('node:assert')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        "username": "root",
        "name": "root",
        "password": "testi"
    },
    {
        "username": "wilber",
        "name": "Ville",
        "password": "testi"
    }
]

beforeEach(async() => {
    await User.deleteMany({})
    console.log('cleared users')

    const userObjects = initialUsers
        .map(user => new User(user))
    
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

describe('testing user adding', () => {
    test('giving too short password should return error', async() => {
        const invalidUser = {
            "username": "testing",
            "name": "test",
            "password": "12"
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
        console.log(response.body)

        const allUsers = await api.get('/api/users')

        assert.strictEqual(allUsers.body.length, initialUsers.length)
    })
})
 
after(async() => {
    await mongoose.connection.close()
})