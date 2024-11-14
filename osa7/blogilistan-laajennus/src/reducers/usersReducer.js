import { createSlice } from "@reduxjs/toolkit";


const initialState = [{
    username: 'pekka',
    id: 1,
    createdBlogs: []
    },
    {
      username: 'timo',
      id: 2,
      createdBlogs: [
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2,
            user: {
                username: 'timo',
                id: 2
        }},
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1,
            user: {
                username: 'timo',
                id: 2
            }
          }
      ]
    }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            let usersId = Math.floor(Math.random() * 10000)
            state.push({
                username: action.payload,
                id: usersId,
                createdBlogs: []
            })
        },
        addBlogToUser(state, action) {
            const { username, blog } = action.payload
            const user = state.find(user => user.username === username)
            if(user){
                user.createdBlogs.push(blog)
            }
        }
    }
})

export const { addUser, addBlogToUser } = usersSlice.actions

export default usersSlice.reducer