import { createSlice } from "@reduxjs/toolkit";


const initialState = [{
    username: 'pekka',
    createdAnecdotes: []
    },
    {
      username: 'timo',
      createdAnecdotes: []
    }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            state.push({
                username: action.payload,
                createdAnecdotes: []
            })
        },
        addAnecdoteToUser(state, action) {
            const { username, anecdote } = action.payload
            const user = state.find(user => user.username === username)
            if(user){
                user.createdAnecdotes.push(anecdote)
            }
        }
    }
})

export const { addUser, addAnecdoteToUser } = usersSlice.actions

export default usersSlice.reducer