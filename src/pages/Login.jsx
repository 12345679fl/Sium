"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../App"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Reset shake animation
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => {
        setShake(false)
      }, 820)
      return () => clearTimeout(timer)
    }
  }, [shake])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      if (login(username, password)) {
        navigate("/dashboard")
      } else {
        setError("Credenziali non valide. Riprova!")
        setShake(true)
      }
      setIsLoading(false)
    }, 800)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    navigate("/register")
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
        className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden ${shake ? "shake" : ""}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-500 rounded-full opacity-10"></div>

        <div className="text-center mb-8 relative z-10">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center"
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
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </motion.svg>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Accedi
          </motion.h1>
          <p className="text-gray-600">Entra nel mondo Fanta e Ypsilon!</p>
        </div>

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="text-right">
            <motion.a
              href="#"
              onClick={handleForgotPassword}
              className="text-orange-500 hover:text-orange-700 text-sm inline-block"
              whileHover={{ scale: 1.05, x: 3 }}
            >
              Password dimenticata?
            </motion.a>
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
                Accesso in corso...
              </div>
            ) : (
              "Accedi"
            )}
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm w-full relative overflow-hidden"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500 rounded-full opacity-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10"></div>

              <div className="text-center relative z-10">
                <motion.h2
                  className="text-2xl font-bold text-red-600 mb-4"
                  animate={{
                    rotate: [0, -2, 2, -2, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  Potevi scrivertela!
                </motion.h2>
                <p className="text-gray-700 mb-6">
                  Vabbene dai, sono gentile e ti faccio accedere lo stesso...
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePopup}
                  className="fancy-button text-white py-2 px-6 rounded-full font-bold shadow-md"
                >
                  Registrati ora
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Login
