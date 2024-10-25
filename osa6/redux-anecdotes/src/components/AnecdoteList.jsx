import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter.toLowerCase()){
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        }
        return anecdotes
    })

    const vote = (id) => {
        dispatch((voteAnecdote(id)))
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(createNotification(`You voted for: '${votedAnecdote.content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
      }
    
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList