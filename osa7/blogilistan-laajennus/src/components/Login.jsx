import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { addUser } from '../reducers/usersReducer'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state) => state.users)

    const handleLogin = (event) => {
        event.preventDefault()

        const username = event.target.username.value

        if(!users.find((user) => user.username === username)){
            dispatch(addUser(username))
        }

        dispatch(setUser({username}))

        navigate('/')
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username: <input type="text" name="username"/>
                </div>
                <div>
                    password: <input type="password" name="password"/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login