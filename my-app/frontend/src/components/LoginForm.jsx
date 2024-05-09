import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, errorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()

    login({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      {errorMessage && errorMessage}
      <form>
        <div>
                    username
          <input
            type="text"
            value={username}
            name="username"
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={password}
						name="password"
						id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button onClick={loginUser} id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm