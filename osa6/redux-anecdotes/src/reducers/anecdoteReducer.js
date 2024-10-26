import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload

      const newState = state.map(anecdote => 
        anecdote.id === updatedAnecdote.id
        ? updatedAnecdote
        : anecdote
      )

      return newState.sort((a,b) => b.votes - a.votes)
      },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer