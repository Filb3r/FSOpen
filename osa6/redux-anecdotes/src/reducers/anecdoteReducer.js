import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const anecdoteId = action.payload
      const newState = state.map(anecdote =>
        anecdote.id === anecdoteId
        ? {...anecdote, votes: anecdote.votes + 1}
        : anecdote)

    return newState.sort((a,b) => b.votes - a.votes)
      },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer