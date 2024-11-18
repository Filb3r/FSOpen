import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeAnecdote, voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdotes}) => {
    const dispatch = useDispatch()
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id == id)

    console.log(anecdote)

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))   
    }

    const deleteAnecdote = (anecdote) => {
        dispatch(removeAnecdote(anecdote))
    }


    return(
        <div>
            <h2>{anecdote.content}</h2>
            <a href={anecdote.info}>{anecdote.info}</a>
            <div>{anecdote.votes} likes <button onClick={() => vote(anecdote)}>like</button></div>
            <div>added by {anecdote.user.username}</div>
            <h3>comments</h3>
        </div>
    )
}

export default Anecdote