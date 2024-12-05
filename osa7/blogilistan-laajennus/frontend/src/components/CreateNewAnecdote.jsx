import { useDispatch, useSelector } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { useNavigate } from "react-router-dom";
import { addAnecdoteToUser } from "../reducers/usersReducer";
import anecdoteService from '../services/anecdotes'

const CreateNewAnecdote = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.user.currentUser)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const content = {
            content: event.target.content.value,
            author: event.target.author.value,
            url: event.target.info.value
        }

        const newAnecdote = await anecdoteService.createNew(content, currentUser)
        console.log(newAnecdote)
        dispatch(createNewAnecdote(newAnecdote))
        dispatch(addAnecdoteToUser({username:currentUser.username, anecdote: content}))
        navigate('/')
    }

    return (
        <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
            <div>
            content
            <input name="content" />
            </div>
            <div>
            author
            <input name="author" />
            </div>
            <div>
            url for more info
            <input name="info" />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
        )
}

export default CreateNewAnecdote