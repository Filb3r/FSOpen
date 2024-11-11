import { useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(setUser(event.target.username.value))
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