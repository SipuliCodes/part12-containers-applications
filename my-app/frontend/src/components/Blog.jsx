import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, name, remove }) => {
  const [visibleInfo, setVisibleInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlog = (event) => {
    event.preventDefault()
    remove(blog.id, {
      title: blog.title,
      author: blog.author
    })
  }

  const likeBlog = (event) => {
      event.preventDefault()
    like({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id )

  }

  const toggleVisibility = () => {
    setVisibleInfo(!visibleInfo)
  }

  return (
    <div className='blog' style={ blogStyle }>
      <div>
        {blog.title} {blog.author}
        {!visibleInfo && <button onClick={toggleVisibility}>view</button>}
        {visibleInfo && <button onClick={toggleVisibility}>hide</button>}
      </div>
      {visibleInfo &&
                <div>
                  {blog.url}
                  <br />
                    likes {blog.likes} <button onClick={likeBlog}>like</button>
                  <br />
                  {blog.user.name}
                  {name === blog.user.name &&
                        <div>
                          <button onClick={removeBlog}>remove</button>
                        </div>
                  }
                </div>
      }

    </div>
  )
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog