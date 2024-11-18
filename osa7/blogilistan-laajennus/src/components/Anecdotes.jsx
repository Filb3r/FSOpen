import { Link } from "react-router-dom";

const Anecdotes = ({anecdotes}) => {
    const style = {
        border: '1px solid black',
        padding: '5px',
        margin: '5px',
        display: 'inline-block'
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <Link style={style} to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </div>
            )}
        </div>
    )
}

export default Anecdotes