import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users)
    
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><b>anecdote created</b></td>
                    </tr>
                {users.map(user =>
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.createdAnecdotes.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users