import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        
        dispatch(createNotification(`New anecdote created: '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
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