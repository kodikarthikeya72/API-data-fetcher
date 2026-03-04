import { useEffect, useState } from "react"
import "./App.css"
import { fetchUsers } from "./services/api"
import Loader from "./components/Loader"
import ErrorMessage from "./components/ErrorMessage"
import UserCard from "./components/UserCard"

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // delegate the actual network call to our service helper
    fetchUsers()
      .then((data) => {
        console.log("fetched users", data)
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("fetch error", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!users || users.length === 0) {
    return <h2 className="center">No users available</h2>
  }

  return (
    <div className="container">
      <h1>User Directory</h1>

      <div className="grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App