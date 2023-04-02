import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { useAuthContext } from '../context/AuthContext'

export const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    createSession(username: $username, password: $password) {
	  token
	}
  }
`

const RegisterPage = () => {
  const [loginUser, {data, error}] = useMutation(LOGIN_MUTATION)
  const {setUsername, setToken} = useAuthContext()
  const [errorMessage, setErrorMessage] = useState('')
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const router = useRouter()

  function createNewUser() {
    if (!usernameRef.current || !passwordRef.current) return
    const variables = {
	  username: usernameRef.current.value,
	  password: passwordRef.current.value,
	}

	loginUser({ variables })
  }

  useEffect(() => {
    if (!data) return
	const {token} = data.createSession
	const [,payload] = token.split('.')
	const {username} = JSON.parse(atob(payload))
	setToken(token)
	setUsername(username)
    router.push('/')
  }, [data])

  useEffect(() => {
    if (error) {
	  setErrorMessage(error.message)
	}
  }, [error])

  if (errorMessage) {
    return (
	  <section>
	    <p>{errorMessage}</p>
	  </section>
	)
  }

  return (
    <section>
	  <label>username
	    <input ref={usernameRef} />
	  </label>
	  <label>Password
	    <input type="password" ref={passwordRef} />
	  </label>
	  <button onClick={createNewUser}>Sign in</button>
	</section>
  )
}

export default RegisterPage
