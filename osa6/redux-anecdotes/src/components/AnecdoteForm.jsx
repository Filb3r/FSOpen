import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        dispatch(createAnecdote(content))
        event.target.anecdoteInput.value = ''
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="anecdoteInput"/></div>
                <button>create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm