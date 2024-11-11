import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { useNavigate } from "react-router-dom";

const CreateNewAnecdote = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        const content = {
            content: event.target.content.value,
            author: event.target.author.value,
            url: event.target.info.value
        }

        console.log(content)
        dispatch(createNewAnecdote(content))
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