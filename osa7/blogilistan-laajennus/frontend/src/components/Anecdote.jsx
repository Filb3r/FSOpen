import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { voteAnecdote, addComment } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdotes"

const Anecdote = ({anecdotes}) => {
    const dispatch = useDispatch()
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id == id)

    const vote = async(anecdote) => {
        await anecdoteService.addVote(anecdote, id)
        dispatch(voteAnecdote(anecdote))   
    }

    const handleaddComment = async(event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        await anecdoteService.addComment(comment, id)
        dispatch(addComment({id: anecdote.id , comment}))
        event.target.comment.value = ''
    }

    return(
        <div>
            <h2>{anecdote.content}</h2>
            <a href={anecdote.info}>{anecdote.info}</a>
            <div>{anecdote.votes} likes <button onClick={() => vote(anecdote)}>like</button></div>
            <div>added by {anecdote.user}</div> 
            <h3>comments</h3>
            <form onSubmit={handleaddComment}>
                <input name="comment" />
                <button type="submit">add comment</button>
            </form>

            <ul>
            {anecdote.comments.map(comment => 
                <li key={comment}>{comment}</li>
            )}
            </ul>
        </div>
    )
}

export default Anecdote