import { useDispatch, useSelector } from "react-redux";
import { removeAnecdote, voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdotes = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({anecdotes}) => {
        return anecdotes
    })

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))   
    }

    const deleteAnecdote = (anecdote) => {
        dispatch(removeAnecdote(anecdote))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
            {anecdotes.map(anecdote =>
                <li key={anecdote.id}>
                        {anecdote.content}
                        <div>
                            has {anecdote.votes} votes
                            <button onClick={() => vote(anecdote)}>vote</button>
                            <button onClick={() => deleteAnecdote(anecdote)}>delete</button>
                        </div>
                </li>
            )}
            </ul>
        </div>
    )
}

export default Anecdotes