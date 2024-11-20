import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import Notification from './components/Notification';
import Anecdotes from './components/Anecdotes';
import CreateNewAnecdote from './components/CreateNewAnecdote';
import About from './components/About'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Anecdote from './components/Anecdote'
import { logoutUser } from './reducers/userReducer'

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
  
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Notification/>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user.username} logged in <button onClick={() => dispatch(logoutUser())}>logout</button> </em>
          : <Link style={padding} to="/login">login</Link> 
        }
        <Routes>
          <Route path="/" element={user ? <Anecdotes anecdotes={anecdotes}/> : <Navigate replace to="/login"/>}/>
          <Route path="/create" element={user ? <CreateNewAnecdote/>: <Navigate replace to="/login"/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/users/:id" element={<User users={users}/>}/>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
