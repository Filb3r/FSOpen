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
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(blogs)
    })
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
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
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

  const handleCreate = async(blogData) => {

    try{
      blogFormRef.current.toggleVisibility()
      const blogPost = await blogService.addBlog(blogData)
      setVerifyMessage(`New blog created: ${blogPost.title}`)
      blogPost.user = user
      setBlogs(blogs.concat(blogPost))
      setTimeout(() => {
        setVerifyMessage(null)
      }, '3000')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async(blogData) => {
    try {
      await blogService.updateBlog(blogData)
      const updatedBlogs = blogs.map(b => (b.id === blogData.id ? blogData : b))
      updatedBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async(blogToRemove) => {
    try {
      const response = await blogService.removeBlog(blogToRemove)
      if(response !== null) {
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove))
        setVerifyMessage('Blog removed!')
        setTimeout(() => {
          setVerifyMessage(null)
        }, '3000')
      }
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
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
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
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
        <button type="submit" onClick={() => handleLogout()}>Logout</button>
      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
      )}
      <Togglable buttonLabel="Add" ref={blogFormRef}>
        <BlogAddForm
          handleCreate={handleCreate}
        />
      </Togglable>
    </div>
  )
}

export default App