import {useState} from 'react'

const BlogAddForm = ({handleCreate}) => {
        const [title, setTitle] = useState('')
        const [author, setAuthor] = useState('')
        const [url, setUrl] = useState('')

        const createNewBlog = (event) => {
            event.preventDefault()

            handleCreate(event, {title, author, url})
            setTitle('')
            setAuthor('')
            setUrl('')
        }

        return (
            <form onSubmit={createNewBlog}>
            <div>
            <h2>Create new</h2>
                title
                <input type="text" value={title} name="Title" onChange={({target}) => setTitle(target.value)}/>
            </div>
            <div>
                author
                <input type="text" value={author} name="Author" onChange={({target}) => setAuthor(target.value)}/>
            </div>
            <div>
                url
                <input type="text" value={url} name="Url" onChange={({target}) => setUrl(target.value)}/>
            </div>
            <button type="submit">create</button>    
        </form>
        )
}

export default BlogAddForm