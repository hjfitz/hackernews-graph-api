import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { useAuthContext } from '../context/AuthContext'

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $url: String!) {
    createPost(title: $title, storyUrl: $url) {
	  id
	}
  }
`

const CreatePage = () => {
  const [createPost, {data, error}] = useMutation(CREATE_POST_MUTATION)
  const {setUsername, setToken} = useAuthContext()
  const [errorMessage, setErrorMessage] = useState('')
  const titleRef = useRef<HTMLInputElement>()
  const URLRef = useRef<HTMLInputElement>()
  const router = useRouter()

  function createNewPost() {
    if (!titleRef.current || !URLRef.current) return
    const variables = {
	  title: titleRef.current.value,
	  URL: URLRef.current.value,
	}

	void createPost({ variables })
  }

  useEffect(() => {
    if (!data) return
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
	  <label>Title
	    <input ref={titleRef} />
	  </label>
	  <label>URL
	    <input ref={URLRef} />
	  </label>
	  <button onClick={createNewPost}>Create</button>
	</section>
  )
}

export default CreatePage 
