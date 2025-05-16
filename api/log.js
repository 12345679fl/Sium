export default function handler(req, res) {
  if (req.method === "POST") {
    const { path, timestamp } = req.body;
    console.log(`[LOG] Accesso a ${path} alle ${timestamp}`);
    res.status(200).json({ message: "Log ricevuto" });
  } else {
    res.status(405).json({ message: "Metodo non consentito" });
  }
}
