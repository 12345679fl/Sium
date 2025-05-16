export default function handler(req, res) {
  const { path, timestamp } = req.body
  console.log(`[LOG] Accesso a ${path} alle ${timestamp}`)
  res.status(200).end()
}
