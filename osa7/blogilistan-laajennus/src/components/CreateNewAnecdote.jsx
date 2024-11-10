import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const CreateNewAnecdote = () => {
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();

        const content = {
            content: event.target.content.value,
            author: event.target.author.value,
            url: event.target.info.value
        }

        console.log(content)
        dispatch(createNewAnecdote(content))
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