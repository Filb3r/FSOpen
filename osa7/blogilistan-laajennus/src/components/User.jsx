import { useParams } from "react-router-dom"

const User = ({users}) => {
    const id = useParams().id
    const user = users.find(user => user.id == id)

    if(!user){
        return null
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <h2>added anecdotes</h2>
            <ul>
                {user.createdAnecdotes.map(createdAnecdote => 
                    <li key={createdAnecdote.id}>{createdAnecdote.content}</li>
                )}
            </ul>
            

        </div>
    )
}

export default User