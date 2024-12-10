import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { addUser } from '../reducers/usersReducer'
import userService from '../services/users'
import loginService from '../services/login'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state) => state.users)
    const user = useSelector((state) => state.user)

    const handleLoginNew = async(event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        try {
            if(!users.find((user) => user.username === username)){
                const newUser = {
                    "username": username
                }
                await userService.addUser(newUser)
                dispatch(addUser(username))
            }

            const loginResponse = await loginService.login(username, password)

            if(loginResponse.token) {
                dispatch(setUser({
                    username: username,
                    token: loginResponse.token
                }))
                navigate('/')
            } else {
                console.error("Invalid login credentials.")
            }
        } catch (error) {
            console.log('Login failed', error)
        }

    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginNew}>
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