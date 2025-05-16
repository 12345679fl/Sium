export default function handler(req, res) {
  console.log("[API] Risposta:", req.body);
  res.status(200).end();
}
