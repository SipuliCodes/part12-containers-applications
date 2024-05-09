import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>

      <h2>create new</h2>
      <form>
        <div>
                    title:
          <input
            type="text"
            value={title}
            name="title"
            placeholder='title'
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            name="author"
            placeholder='author'         
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            value={url}
						name="url"
						placeholder='url'
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button onClick={addBlog} id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm