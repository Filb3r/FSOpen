import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Anecdotes from './components/Anecdotes'
import CreateNewAnecdote from './components/CreateNewAnecdote'
import About from './components/About'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Anecdote from './components/Anecdote'
import { logoutUser } from './reducers/userReducer'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import userService from './services/users'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { setUsers } from './reducers/usersReducer'
import { jwtDecode} from 'jwt-decode'
import { setUser } from './reducers/userReducer'
import { setNotification } from "./reducers/notificationReducer"
import { Alert } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'


const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const App = () => {
  const user = useSelector(state => state.user.currentUser)
  const users = useSelector(state => state.users)
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if(token){
      const decodedToken = jwtDecode(token)

      dispatch(setUser({
        username: decodedToken.username,
        token: token
      }))
    } else {
      dispatch(logoutUser())
    }
  }, [dispatch])

  useEffect(() => {
    if(user){
      anecdoteService.getAll()
      .then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    })
    .catch(error => {
      console.error('Failed to fetch anecdotes:', error)
      })
    }
  }, [user])

  useEffect(() => {
    userService.getAll()
    .then(users => {
      dispatch(setUsers(users))
    })
    .catch(error => {
      console.error('Failed to fetch users:', error)
    })
  }, [])

  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('authToken')
    dispatch(setNotification(`Logged out!`, 2))
  }

  return (
    <Router>
      <div className='container'>
        <h1>Software anecdotes</h1>
        {(notification &&
          <Alert variant="success">
            {notification}
          </Alert>
        )}
        <Navbar collapseOnSelect='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to="/create">create new</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
               <Link style={padding} to="/about">about</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              </Nav>
              </Navbar.Collapse>
              <Navbar.Text>
                {user
                  ? <em>{user} logged in <Button variant='outline-success' onClick={() => handleLogout()}>logout</Button> </em>
                  : <Button variant='outline-success'><Link style={padding} to="/login">login</Link></Button>
                }
              </Navbar.Text>
        
        </Navbar>
        <Routes>
          <Route path="/" element={<Anecdotes anecdotes={anecdotes}/>}/>
          <Route path="/create" element={<CreateNewAnecdote/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/users/:username" element={<User users={users}/>}/>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
