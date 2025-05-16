"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../App"
import confetti from "canvas-confetti"
import ypsilonVideo from "../assets/ypsilon-video.mp4"
import ypsilonVideo2 from "../assets/ypsilon-video2.mp4"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("stats")
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [redeemStep, setRedeemStep] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [firstVideoEnded, setFirstVideoEnded] = useState(false)
  const [selectedTime, setSelectedTime] = useState("10:00")
  const [showTimeConfirmation, setShowTimeConfirmation] = useState(false)
  const videoRef = useRef(null)

  const handleSubmit = async (e) => {
    console.error(selectedTime);
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/append", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedTime }),
      });

      if (!res.ok) throw new Error("Errore durante la richiesta");

      console.log("Messaggio inviato con successo!");
    } catch (err) {
      console.error("Errore:", err);
    }
  };

  // Form data for credit card
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  useEffect(() => {
    // Trigger confetti when the dashboard loads
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    // Show welcome notification
    setTimeout(() => {
      setNotificationMessage("Benvenuto nella dashboard! 🎉")
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleCardInputChange = (e) => {
    const { name, value } = e.target
    setCardData({
      ...cardData,
      [name]: value,
    })
  }

  const handleRedeemSubmit = (e) => {
    e.preventDefault()
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    setRedeemStep(1) // Move to video step
  }

  const handleFirstVideoEnd = () => {
    setFirstVideoEnded(true)
  }

  const handleSecondVideoEnd = () => {
    setVideoEnded(true)
    // Trigger confetti for fun
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: 0.5, y: 0.5 },
    })
  }

  // Function to create thumbs up emojis
  const createThumbsUpEmojis = () => {
    const emojisContainer = document.createElement("div")
    emojisContainer.className = "thumbs-up-container"
    emojisContainer.style.position = "fixed"
    emojisContainer.style.top = "0"
    emojisContainer.style.left = "0"
    emojisContainer.style.width = "100%"
    emojisContainer.style.height = "100%"
    emojisContainer.style.pointerEvents = "none"
    emojisContainer.style.zIndex = "9998"
    emojisContainer.style.overflow = "hidden"
    document.body.appendChild(emojisContainer)

    // Create multiple thumbs up emojis
    for (let i = 0; i < 50; i++) {
      createThumbsUpEmoji(emojisContainer)
    }

    return emojisContainer
  }

  // Create a single thumbs up emoji with animation
  const createThumbsUpEmoji = (container) => {
    const emoji = document.createElement("div")
    emoji.textContent = "👍🏿"
    emoji.style.position = "absolute"
    emoji.style.fontSize = `${Math.random() * 30 + 20}px`
    emoji.style.left = `${Math.random() * 100}%`
    emoji.style.top = `${Math.random() * 100}%`
    emoji.style.opacity = "0"
    emoji.style.transform = "scale(0.5)"
    emoji.style.transition = "none"
    container.appendChild(emoji)

    // Trigger animation in the next frame
    setTimeout(() => {
      emoji.style.transition = `all ${Math.random() * 2 + 1}s ease-out`
      emoji.style.opacity = "1"
      emoji.style.transform = "scale(1)"

      // Move in random direction
      const xMove = (Math.random() - 0.5) * 200
      const yMove = (Math.random() - 0.5) * 200
      emoji.style.left = `calc(${emoji.style.left} + ${xMove}px)`
      emoji.style.top = `calc(${emoji.style.top} + ${yMove}px)`

      // Fade out after animation
      setTimeout(() => {
        emoji.style.opacity = "0"

        // Remove after fade out
        setTimeout(() => {
          if (container.contains(emoji)) {
            container.removeChild(emoji)
          }
          // Create a new emoji to replace this one (for continuous effect)
          createThumbsUpEmoji(container)
        }, 1000)
      }, 2000)
    }, 10)
  }

  const handleTimeSubmit = (e) => {
    e.preventDefault()
    setShowTimeConfirmation(true)

    // Create thumbs up emojis effect
    const emojisContainer = createThumbsUpEmojis()

    // Store the container reference to remove it later
    window.thumbsUpContainer = emojisContainer
  }

  const closeTimeConfirmation = () => {
    setShowTimeConfirmation(false)

    // Remove the emoji container if it exists
    if (window.thumbsUpContainer && document.body.contains(window.thumbsUpContainer)) {
      document.body.removeChild(window.thumbsUpContainer)
    }

    // Redirect to a URL with the selected time as a parameter
    window.location.href = `/time?selected=${encodeURIComponent(selectedTime)}`
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" } },
  }

  // Floating bubbles animation
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    left: Math.random() * 100,
    animationDuration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }))

  // Available times for coffee
  const availableTimes = [
    "",
    "Rimandiamo",
    "Mai, questo sito mi ha cringiato troppo. Preferisco starti lontano!",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00"
  ]

  return (
    <motion.div
      className="container mx-auto px-4 py-8 relative"
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

      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto relative overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-500 rounded-full opacity-10"></div>

        <div className="text-center mb-8 relative z-10">
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <motion.h1
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {user?.username.charAt(0).toUpperCase()}
            </motion.h1>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Benvenuta, Peggio Resp
          </motion.h1>
          <p className="text-gray-600">Hai completato con successo l'accesso al sito più cringe e più brutto mai fatto.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <motion.div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
            <motion.button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "stats" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("stats")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Statistiche
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "redeem" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("redeem")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Riscatta Premio
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "profile" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("profile")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Profilo
            </motion.button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 gap-6 mb-8"
              >
                <motion.div
                  variants={item}
                  className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-xl relative overflow-hidden"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-300 rounded-full opacity-30"></div>

                  <h2 className="text-xl font-bold text-orange-600 mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Statistiche Fanta
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Le vendite di Fanta sono calate del 98% da quando sei a capo! Continua così e raggiungeremo
                    nuovi record! Complimenti, solo tu sei in grado di raggiungere questo obbiettivo!👍🏿 
                  </p>
                  <div className="h-4 bg-white bg-opacity-50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ delay: 1, duration: 1.5 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-gray-500">Progresso</p>
                    <p className="text-sm font-medium text-orange-600">75%</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-xl relative overflow-hidden"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-red-300 rounded-full opacity-30"></div>

                  <h2 className="text-xl font-bold text-red-600 mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Vendite Ypsilon Rossa
                  </h2>
                  <p className="text-gray-700 mb-4">
                    La Ypsilon Rossa spacca.
                    (Grazie al cazzo aggiungerei... Dove giro giro ne trovo una...)
                  </p>
                  <div className="h-4 bg-white bg-opacity-50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ delay: 1.2, duration: 1.5 }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-gray-500">Progresso</p>
                    <p className="text-sm font-medium text-red-600">88%</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={container} initial="hidden" animate="show" className="text-center">
                <motion.h2 variants={item} className="text-2xl font-bold text-gray-800 mb-4">
                  Dai che lo so che vuoi riscattare il premio. Ecco a te.
                </motion.h2>

                <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-3d"
                    onClick={() => setActiveTab("redeem")}
                  >
                    Riscatta Premio
                  </motion.button>

                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "redeem" && (
            <motion.div
              key="redeem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text mb-2">
                    Riscatta il Tuo Premio Esclusivo
                  </h2>
                  <p className="text-gray-600">Complimenti! Hai guadagnato un premio esclusivo Fanta-Ypsilon.</p>
                </motion.div>

                {redeemStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl mb-6">
                      <h3 className="text-lg font-bold text-orange-600 mb-4">
                        Per riscattare il tuo premio, inserisci i dati della tua carta.
                        Mhe dai, ti prego...
                      </h3>

                        <form onSubmit={handleRedeemSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Numero Carta
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={cardData.cardNumber}
                              readOnly
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                          </div>

                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                              Nome sulla Carta
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={cardData.cardName}
                              readOnly
                              placeholder="Mario Rossi"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                Data Scadenza
                              </label>
                              <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                value={cardData.expiry}
                                readOnly
                                placeholder="MM/AA"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                              />
                            </div>

                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={cardData.cvv}
                                readOnly
                                placeholder="123"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                              />
                            </div>
                          </div>

                          <div className="pt-4">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              type="submit"
                              className="w-full fancy-button text-white py-3 rounded-lg font-bold shadow-md"
                            >
                              Successivo
                            </motion.button>
                          </div>
                        </form>

                    </div>
                  </motion.div>
                )}

                {redeemStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl mb-6">
                      <h3 className="text-lg font-bold text-orange-600 mb-4">
                        Video 1: Guarda la Ypsilon che sorpassa una supercar!
                      </h3>
                      <p class="text-gray-600 bg-gray-100 p-4 rounded-lg my-6 leading-relaxed max-w-2xl">
                        Complimenti! Ora però ti subisci due video consecutivi di una "Y che sorpassa una super car".
                        Piccola nota, mi scocciavo a trovarne uno online quindi ho cercato di generarli con l'IA.
                        Fanno così schifo che mi sono piaciuti tantissimo AHHAHAHAH.
                      </p>

                      <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          controls
                          onEnded={handleFirstVideoEnd}
                        >
                          <source src={ypsilonVideo} type="video/mp4" />
                          Il tuo browser non supporta il tag video.
                        </video>
                      </div>

                      <p className="text-gray-600 italic">Guarda fino alla fine per sbloccare il secondo video!</p>
                    </div>

                    {firstVideoEnded && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-br from-red-50 to-yellow-50 p-6 rounded-xl mb-6">
                          <h3 className="text-lg font-bold text-red-600 mb-4">Video 2: Un'altra Ypsilon che sorpassa una supercar!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h3>

                          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                            <video className="w-full h-full object-cover" controls onEnded={handleSecondVideoEnd}>
                              <source src={ypsilonVideo2} type="video/mp4" />
                              Il tuo browser non supporta il tag video.
                            </video>
                          </div>

                          <p className="text-gray-600 italic">
                            Guarda fino alla fine per sbloccare la prossima sezione!
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                          <h3 className="text-xl font-bold text-orange-600 mb-4">
                            A che ora ci vediamo per il caffè???
                          </h3>

                          <form onSubmit={(e) => {
                            e.preventDefault();
                            handleTimeSubmit(e);
                            handleSubmit(e);
                          }} className="space-y-4">
                            <div className="max-w-xs mx-auto">
                              <label htmlFor="timeSelect" className="block text-sm font-medium text-gray-700 mb-2">
                                Seleziona un orario:
                              </label>

                              <select
                                id="timeSelect"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                              >
                                {availableTimes.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="pt-2">
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="fancy-button text-white py-2 px-6 rounded-lg font-bold shadow-md"
                              >
                                Conferma
                              </motion.button>
                            </div>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <h1 className="text-5xl font-bold text-white">{user?.username.charAt(0).toUpperCase()}</h1>
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.username}</h2>
              <p className="text-gray-600 mb-8">Super Admin</p>

              <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Informazioni Profilo</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Username</span>
                    <span className="font-medium">{user?.username}</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Ruolo</span>
                    <span className="font-medium">Amministratore</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Data registrazione</span>
                    <span className="font-medium">Oggi</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Ultimo accesso</span>
                    <span className="font-medium">Adesso</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Popup for credit card joke */}
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
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.h2
                  className="text-2xl font-bold text-red-600 mb-4"
                  animate={{ rotate: [0, -2, 2, -2, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5, repeatDelay: 2 }}
                >
                  Magari...
                </motion.h2>
                <p className="text-gray-700 mb-2">Non mettere i tuoi dati della carta...</p>
                <p className="text-gray-700 mb-6 flex justify-center items-center">
                  Ripensaci <span className="text-2xl mx-2">👀</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePopup}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-6 rounded-full font-bold shadow-md hover:from-orange-600 hover:to-red-700 transition-all"
                >
                  Ho capito!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time confirmation popup */}
      <AnimatePresence>
        {showTimeConfirmation && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTimeConfirmation}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm w-full"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0] }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Perfetto!
                </motion.h2>

                <motion.p
                  className="text-gray-700 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Ci vediamo alle <span className="font-bold text-orange-600">{selectedTime}</span> per un caffè!
                </motion.p>

                <motion.p
                  className="text-gray-700 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Questo è il grande problema dell'essere un informatico annoiato. Ho fatto di molto peggio nella mia vita... 
                  Poi dai, siamo onesti, quanto sono originale AHAHAH? No, comunque mi diverto veramente con poco e questa era 
                  anche una preview alle storie pazze future che ti racconterò. Spoiler: "Compito in classe", "Google Chrome". 
                  P.S. Premi "Fantastico" oppure io non posso sapere che hai scelto ahahah.  
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeTimeConfirmation}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-6 rounded-full font-bold shadow-md hover:from-orange-600 hover:to-red-700 transition-all"
                >
                  Fantastico!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm"
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-500 rounded-full p-2">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{notificationMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Dashboard
