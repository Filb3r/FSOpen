import { createSlice } from "@reduxjs/toolkit"

const initialState = [{
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1,
    user: {
        username: 'timo',
        id: 2
    },
    comments: [
        "Makia!",
        "Hieno!"
    ]
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2,
    user: {
        username: 'timo',
        id: 2
    },
    comments: [
        "!!!!"
    ]
  }]

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState,
    reducers: {
        createAnecdote(state, action) {
            const content = action.payload
            state.push(content)
        },
        updateAnecdote(state, action) {
            const content = action.payload

            const updatedList = state.map(anecdote => 
                anecdote.id === content.id
                ? content
                : anecdote
            )

            return updatedList
        },
        removeAnecdote(state, action) {
            const content = action.payload

            const updatedList = state.filter((anecdote) => anecdote.id !== content.id)

            return updatedList
        },
        addComment(state, action) {
            const { id, comment } = action.payload

            const anecdote = state.find(anecdote => anecdote.id === id)

            anecdote.comments.push(comment)
        }
    }
})

export const { createAnecdote, updateAnecdote, removeAnecdote, addComment } = anecdoteSlice.actions

export const createNewAnecdote = (content, user) => {
    return async dispatch => {

      const newAnecdote = {
        ...content,
        id: Math.floor(Math.random() * 10000),
        votes: 0,
        user
      }
      dispatch(createAnecdote(newAnecdote))
    }
}

export const voteAnecdote = content => {
    return async dispatch => {
        const votedAnecdote = {
            ...content,
            votes: content.votes + 1 
        }

        dispatch(updateAnecdote(votedAnecdote))
    }
}

export default anecdoteSlice.reducer