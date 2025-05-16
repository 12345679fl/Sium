"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import fantaLogo from "../assets/fanta-logo.png"
import ypsilonImage from "../assets/ypsilon-red.png"

const Home = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [popupOrigin, setPopupOrigin] = useState("")

  const handleButtonClick = (e, origin) => {
    e.preventDefault()
    // Get button position for popup
    const rect = e.currentTarget.getBoundingClientRect()
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setPopupOrigin(origin)
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  // Floating bubbles animation
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    animationDuration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <motion.div
      className="container mx-auto px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              bottom: "-100px",
              animation: `float ${bubble.animationDuration}s ease-in-out ${bubble.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-6xl font-bold text-white mb-4 drop-shadow-lg neon-text"
            data-text="Benvenuta nel mondo Fanta e Ypsilon!"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
          >
            Benvenuta nel mondo{" "}
            <span className="text-yellow-300 glitch" data-text="Fanta">
              Fanta
            </span>{" "}
            e{" "}
            <span className="text-red-700 glitch" data-text="Ypsilon">
              Ypsilon
            </span>
            !
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Un'esperienza frizzante come Fanta e dinamica come la Ypsilon rossa. 
          </motion.p>
          <motion.p
            className="text-xl text-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Dai un occhio al sito prima di continuare e metti un pollice in su👍🏿. (Nero??? Come perchè nero??? Razzista...)
          </motion.p>
          <motion.span
            whileHover={{ scale: 1.3, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-6xl cursor-pointer block text-center mt-8"
        >
           👍🏿
          </motion.span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="bg-white p-6 rounded-xl shadow-lg shiny relative overflow-hidden"
            whileHover={{
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-orange-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500 rounded-full opacity-20"></div>

            <motion.img
              src={fantaLogo || "/placeholder.svg"}
              alt="Fanta Logo"
              className="h-32 mx-auto mb-4 object-contain floating"
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <h2 className="text-2xl font-bold text-orange-500 mb-2">La freschezza di Fanta</h2>
            <p className="text-gray-700">
              Fanta è la bevanda frizzante che ti accompagna nei momenti di divertimento. Con il suo gusto
              inconfondibile di arance, Fanta è sinonimo di allegria e spensieratezza.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 btn-3d"
              onClick={(e) => handleButtonClick(e, "fanta")}
            >
              Scopri di più
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="bg-white p-6 rounded-xl shadow-lg shiny relative overflow-hidden"
            whileHover={{
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-red-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500 rounded-full opacity-20"></div>

            <motion.img
              src={ypsilonImage || "/placeholder.svg"}
              alt="Ypsilon Rossa"
              className="h-32 mx-auto mb-4 object-contain floating"
              initial={{ x: -20 }}
              animate={{ x: 20 }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <h2 className="text-2xl font-bold text-red-600 mb-2">L'eleganza di Ypsilon Rossa</h2>
            <p className="text-gray-700">
              La Lancia Ypsilon in rosso fiammante è l'auto che combina stile, comfort e prestazioni. Un'auto compatta
              ma spaziosa, perfetta per la città e per i viaggi più lunghi.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 btn-3d"
              onClick={(e) => handleButtonClick(e, "ypsilon")}
            >
              Esplora le caratteristiche
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="mt-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Pronta a riscattare il premio?👍🏿</h2>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            className="inline-block fancy-button text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg"
          >
            Accedi ora!
          </motion.a>
        </motion.div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm w-full"
              initial={{
                scale: 0.8,
                x: popupPosition.x - window.innerWidth / 2,
                y: popupPosition.y - window.innerHeight / 2,
              }}
              animate={{
                scale: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                scale: 0.8,
                x: popupPosition.x - window.innerWidth / 2,
                y: popupPosition.y - window.innerHeight / 2,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.h2
                  className="text-2xl font-bold text-red-600 mb-4"
                  animate={{ rotate: [0, -2, 2, -2, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, repeatDelay: 2 }}
                >
                  Eh fra, chiedi troppo adesso!
                </motion.h2>
                <p className="text-gray-700 mb-6">
                  {popupOrigin === "fanta"
                    ? "Vuoi sapere troppo sulla Fanta! Goditi la bevanda e non fare troppe domande."
                    : "La Ypsilon ha i suoi segreti. Alcuni misteri è meglio non svelarli!"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePopup}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-6 rounded-full font-bold shadow-md hover:from-orange-600 hover:to-red-700 transition-all"
                >
                  Mhe va bene yha. Scusa :(
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Home
