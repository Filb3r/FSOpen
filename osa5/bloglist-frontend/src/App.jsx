import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogAddForm from './components/BlogAddForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verifyMessage, setVerifyMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password!')
      console.log('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, '3000')
    }
  }

  const handleCreate = async(event, blogData) => {
    event.preventDefault()

    try{
      blogFormRef.current.toggleVisibility()
      const blogPost = await blogService.postNew(blogData)
      setVerifyMessage(`New blog created: ${blogPost.title}`)
      setBlogs(blogs.concat(blogPost))
      setTimeout(() => {
        setVerifyMessage(null)
      }, '3000')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async(event, blogData) => {
    event.preventDefault()

    //TÄMÄ EI OLE KUNNOSSA VIELÄ!
    try {
      console.log('f')
      console.log(blogData)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  if(user === null){
    return (
      <div>
        <Notification verifyMessage={verifyMessage} errorMessage={errorMessage}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            password 
            <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Notification verifyMessage={verifyMessage} errorMessage={errorMessage}/>
        {user.name} logged in!
        <button type="submit" onClick={(event) => handleLogout(event)}>Logout</button>
      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
      )}
      <Togglable buttonLabel="Add new" ref={blogFormRef}>
        <BlogAddForm
          handleCreate={handleCreate}
        />
      </Togglable>
    </div>
  )
}

export default App