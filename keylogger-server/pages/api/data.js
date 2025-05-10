let keyLog = [];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle POST to log keycode
  if (req.method === "POST") {
    const { keycode } = req.body;

    if (typeof keycode === "number") {
      keyLog.push(keycode);
      if (keyLog.length > 100) keyLog.shift(); // Keep last 100 entries
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: "Invalid keycode" });
  }

  // Handle GET to return keylog
  if (req.method === "GET") {
    return res.status(200).json(keyLog);
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}


