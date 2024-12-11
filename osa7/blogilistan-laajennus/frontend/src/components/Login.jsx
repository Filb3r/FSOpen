import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { addUser } from '../reducers/usersReducer'
import userService from '../services/users'
import loginService from '../services/login'
import { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { setNotification } from "../reducers/notificationReducer"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formRef = useRef()
    const users = useSelector((state) => state.users)

    const handleLoginNew = async(event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        try {
            const loginResponse = await loginService.login(username, password)

            if(loginResponse.token) {
                dispatch(setUser({
                    username: username,
                    token: loginResponse.token
                }))
                navigate('/')
                dispatch(setNotification(`Logged in as ${username}`, 2))
            } else {
                console.error("Invalid login credentials.")
            }
        } catch (error) {
            console.log('Login failed', error)
        }
    }

    const handleRegister = async(event) => {
        event.preventDefault()
        const form = formRef.current
        const username = form.username.value
        const password = form.password.value

        if(!users.find((user) => user.username === username)){
            try {
                const newUser = {
                    username: username,
                    password: password
                }
    
                const registerResponse = await userService.addUser(newUser)
    
                if(registerResponse.registered === true){
                    dispatch(addUser(username))
                    dispatch(setNotification(`Registered new user: ${username}`, 2))
                    form.reset()
                }
            } catch (error) {
                console.log('register failed', error)
            }
        }

    }

    return(
        <div>
            <h2>Login</h2>
            <Form onSubmit={handleLoginNew} ref={formRef}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
                <Button variant="primary" type="button" onClick={handleRegister}>Register</Button>
            </Form>
        </div>
    )
}

export default Login