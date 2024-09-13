// src/components/Home.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) return null

  return (
    <div>
      <h1>Welcome, {user.first_name}!</h1>
      <p>Email: {user.email}</p>
      <img src={user.profilePic} alt="Profile" style={{width: 100, height: 100}} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home