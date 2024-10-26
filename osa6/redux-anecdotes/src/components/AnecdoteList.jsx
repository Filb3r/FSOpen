import { useSelector, useDispatch } from "react-redux"
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter.toLowerCase()){
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        }
        return anecdotes
    })

    const vote = (anecdote) => {
        dispatch((updateVote(anecdote)))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList