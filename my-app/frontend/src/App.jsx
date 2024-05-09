import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'


const App = () => {
  const noteFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccesMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginUser = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const likeBlog = async (blogObject, id) => {
    try {
        const updatedBlog = await blogService.like(blogObject, id)

      setBlogs((blogs) =>
        blogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        ))

    } catch (exception) {

    }
  }

  const removeBlog = async (id, details) => {
    try {
        if (window.confirm(`Remove blog ${details.title} by ${details.author}`)) {
            await blogService.remove(id)
            setBlogs((blogs) =>
                blogs.filter((blog) =>
                    blog.id !== id))
        }
    } catch {
    }
  }

  const addBlog = async (blogObject) => {
    try {
      noteFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setSuccesMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => { setSuccesMessage(null) }, 2000)
    } catch (exception) {
    }
  }

  if (user === null) {
    return (
      <LoginForm
        login={loginUser}
        errorMessage={errorMessage}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      {succesMessage && succesMessage}

      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm
          createBlog={addBlog}
          user={user}
        />
      </Togglable>

      {blogs.sort((blogA, blogB) => {
        if (blogA.likes > blogB.likes) {
          return -1
        } else if (blogA.likes < blogB.likes) {
          return 1
        }
        return 0
      }).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          name={user.name}
          remove={removeBlog}
        />)}

    </div>
  )

}

export default App