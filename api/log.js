export default function handler(req, res) {
  const { selectedTime } = req.body
  console.log(`[LOG] Ha scelto ${selectedTime}`)
  res.status(200).end()
}
