import { useDispatch, useSelector } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { useNavigate } from "react-router-dom";
import { addBlogToUser } from "../reducers/usersReducer";

const CreateNewAnecdote = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.currentUser)

    const handleSubmit = (event) => {
        event.preventDefault();

        const content = {
            content: event.target.content.value,
            author: event.target.author.value,
            url: event.target.info.value
        }

        dispatch(createNewAnecdote(content, user))
        dispatch(addBlogToUser({username: user.username, blog: content}))
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
            <button>create</button>
        </form>
        </div>
        )
}

export default CreateNewAnecdote