"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../App"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { registerPassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Reset password error when password changes
    if (passwordError && password === "") {
      setPasswordError(false)
    }
  }, [password, passwordError])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      // Show error when password is entered
      if (password.length > 0) {
        setPasswordError(true)
        setShowConfetti(true) // Trigger confetti for fun
      } else {
        setPasswordError(false)
      }

      // Register the password anyway
      if (username && password) {
        registerPassword(password)
      }

      setIsLoading(false)
    }, 800)
  }

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const confettiElements = 50
      const container = document.createElement("div")
      container.style.position = "fixed"
      container.style.top = "0"
      container.style.left = "0"
      container.style.width = "100%"
      container.style.height = "100%"
      container.style.pointerEvents = "none"
      container.style.zIndex = "9999"
      document.body.appendChild(container)

      for (let i = 0; i < confettiElements; i++) {
        createConfetti(container)
      }

      const timer = setTimeout(() => {
        document.body.removeChild(container)
        setShowConfetti(false)
      }, 3000)

      return () => {
        clearTimeout(timer)
        if (document.body.contains(container)) {
          document.body.removeChild(container)
        }
      }
    }
  }, [showConfetti])

  const createConfetti = (container) => {
    const confetti = document.createElement("div")
    const colors = ["#ff3b30", "#ff9500", "#ffcc00", "#ff2d55", "#af52de"]

    confetti.style.position = "absolute"
    confetti.style.width = `${Math.random() * 10 + 5}px`
    confetti.style.height = `${Math.random() * 10 + 5}px`
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0"
    confetti.style.top = "0"
    confetti.style.left = `${Math.random() * 100}%`

    const animation = confetti.animate(
      [
        { transform: "translateY(0) rotate(0)", opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 },
      ],
      {
        duration: Math.random() * 2000 + 1000,
        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
    )

    container.appendChild(confetti)

    animation.onfinish = () => {
      container.removeChild(confetti)
    }
  }

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <motion.div
      className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[80vh] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-10 pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-500 rounded-full opacity-10"></div>

        <div className="text-center mb-8 relative z-10">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.3,
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </motion.svg>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-red-600 text-transparent bg-clip-text mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Registrati
          </motion.h1>
          <p className="text-gray-600">Crea un account per accedere a tutte le funzionalità!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2 font-medium">
              Username
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 ${passwordError ? "focus:ring-red-500" : "focus:ring-orange-500"}`}
              required
            />

            {passwordError && (
              <motion.div
                className="mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring" }}
              >
                <p className="text-red-500 text-sm font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ops, la password è già in uso per l'utente admin :(
                </p>
                <motion.div
                  className="w-full h-1 bg-red-200 mt-1 overflow-hidden rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full fancy-button text-white py-3 rounded-lg font-bold shadow-md transition-all relative overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registrazione in corso...
              </div>
            ) : (
              "Registrati"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <p className="text-gray-600">
            Hai già un account?{" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/login"
              className="text-orange-500 font-medium hover:text-orange-700"
            >
              Accedi
            </motion.a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Register
