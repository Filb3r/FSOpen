import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showMore = { display: visible ? '' : 'none' }
  const showToUser = { display: blog.user.username === user.username  ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    const blogData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user
    }

    handleLike(blogData)
  }

  const removeBlog = (event) => {
    event.preventDefault()

    handleRemove(blog.id)
  }


  return (
    <div style={blogStyle} className='blog'>
      {blog.title}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
      <div style={showMore}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>{blog.author}</div>
        <div style={showToUser}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )}

export default Blog