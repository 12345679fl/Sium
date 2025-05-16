"use client"

import { useState, createContext, useContext, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"
import { Analytics } from "@vercel/analytics/react";
import "./App.css"

// Auth context
export const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

function App() {
  const [user, setUser] = useState(null)
  const [userPassword, setUserPassword] = useState("")

  // Check if user is in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    const savedPassword = localStorage.getItem("userPassword")
    if (savedPassword) {
      setUserPassword(savedPassword)
    }

    // Create animated dots
    createAnimatedDots()
  }, [])

  // Function to create animated dots
  const createAnimatedDots = () => {
    const dotsContainer = document.createElement("div")
    dotsContainer.className = "animated-dots"

    for (let i = 0; i < 50; i++) {
      const dot = document.createElement("div")
      dot.className = "dot"

      // Random positioning
      dot.style.left = `${Math.random() * 100}%`
      dot.style.top = `${Math.random() * 100}%`

      // Random size
      const size = Math.random() * 5 + 2
      dot.style.width = `${size}px`
      dot.style.height = `${size}px`

      // Random animation delay
      dot.style.animationDelay = `${Math.random() * 15}s`

      dotsContainer.appendChild(dot)
    }

    document.body.appendChild(dotsContainer)
  }

  const login = (username, password) => {
    if (username === "admin" && password === userPassword) {
      const userData = { username }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const registerPassword = (password) => {
    setUserPassword(password)
    localStorage.setItem("userPassword", password)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, registerPassword, userPassword }}>
      <Router>
        <div className="app-container bg-gradient-to-br from-[#ff3b30] via-[#ff9500] to-[#ffcc00] min-h-screen">
          {/* Animated background elements */}
          <div className="animated-bg-element animated-bg-element-1"></div>
          <div className="animated-bg-element animated-bg-element-2"></div>
          <div className="animated-bg-element animated-bg-element-3"></div>

          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
          <Analytics />
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
