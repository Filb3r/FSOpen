import { useDispatch } from "react-redux"
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        dispatch(createNewAnecdote(content))
        
        dispatch(setNotification(`New anecdote created: '${content}'`, 5))
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