import Link from "next/link"
import { useAuthContext } from "../context/AuthContext"

export const Nav = () => {
  const {username} = useAuthContext()
  if (!username) {
    return (
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </nav>
    )
  }
  return (
    <nav>
	  <p>Welcome, {username}</p>
	  <Link href="/create">Create a post</Link>
	  <Link href="/logout">Log out</Link>
	</nav>
  )
}
