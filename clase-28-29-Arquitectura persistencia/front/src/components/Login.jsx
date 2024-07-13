/* eslint-disable react/prop-types */
import { useState } from "react"


export const Login = ({handleLogin}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
     const response = await fetch('http://localhost:8080/api/session/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    console.log(data)
    if(data.status === 'success'){ 
      handleLogin(true)
    } else {
      handleLogin(false)
      setErrorMessage(data.msg)
    }

  }
  
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="p-4  w-50">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Login</button>
      <p>
      {errorMessage && <p>{errorMessage}</p>}

      </p>
      </form>
    </>
  )
}
