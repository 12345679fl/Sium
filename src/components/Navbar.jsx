"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../App"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-md relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Link to="/" className="flex items-center">
              <motion.span
                className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Fanta<span className="text-red-600">Ypsilon</span>
                <motion.span
                  className="absolute -top-1 -right-4 text-xs bg-yellow-400 text-red-600 px-1 rounded-md font-bold"
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  PRO
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop menu */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/"
                  ? "text-white bg-gradient-to-r from-orange-500 to-red-600"
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              } transition-colors`}
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/dashboard"
                      ? "text-white bg-gradient-to-r from-orange-500 to-red-600"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  } transition-colors`}
                >
                  Dashboard
                </Link>
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/login"
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-600"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                } transition-colors`}
              >
                Accedi
              </Link>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            className="md:hidden flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/"
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-600"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                } transition-colors`}
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === "/dashboard"
                        ? "text-white bg-gradient-to-r from-orange-500 to-red-600"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    } transition-colors`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      closeMenu()
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/login"
                      ? "text-white bg-gradient-to-r from-orange-500 to-red-600"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  } transition-colors`}
                >
                  Accedi
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
