import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
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
        },
        setUsers(state, action){
            return action.payload
        }
    }
})

export const { addUser, addAnecdoteToUser, setUsers } = usersSlice.actions

export default usersSlice.reducer