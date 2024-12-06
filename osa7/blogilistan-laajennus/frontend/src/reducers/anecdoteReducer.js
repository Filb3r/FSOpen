import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState : [],
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
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { createAnecdote, updateAnecdote, removeAnecdote, addComment, setAnecdotes } = anecdoteSlice.actions

export const createNewAnecdote = (content) => {
    return async dispatch => {

      const newAnecdote = {
        ...content,
        id: Math.floor(Math.random() * 10000),
        votes: 0,
        comments: []
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