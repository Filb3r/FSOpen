import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogAddForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    handleCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createNewBlog}>
      <div>
        <h2>Create new</h2>
                title
        <input type="text" value={title} name="Title" placeholder='Title' onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
                author
        <input type="text" value={author} name="Author" placeholder='Author' onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
                url
        <input type="text" value={url} name="Url" placeholder='URL' onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogAddForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default BlogAddForm