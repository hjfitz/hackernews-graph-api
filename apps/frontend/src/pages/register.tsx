import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export const CREATE_USER_MUTATION = gql`
  mutation CreateNewUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
	  id
	}
  }
`

const RegisterPage = () => {
  const [createUser, {data, error}] = useMutation(CREATE_USER_MUTATION)
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

	createUser({ variables })
  }

  useEffect(() => {
    if (!data) return
    router.push('/login')
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
	  <button onClick={createNewUser}>Sign up</button>
	</section>
  )
}

export default RegisterPage
