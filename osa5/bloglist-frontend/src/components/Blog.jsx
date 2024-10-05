import {useState} from 'react'

const Blog = ({ blog, handleLike}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showMore = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
      setVisible(!visible)
  }

  const likeBlog = (event) => {
    event.preventDefault()

    const blogData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }

    handleLike(event, blogData)
  }


  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
      <div style={showMore}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div> 
        {blog.author}
      </div>
    </div>
)}

export default Blog