let keyLog = [];

export default async function handler(req, res) {
  // Enable CORS for both browser and curl requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight
  }

  if (req.method === "POST") {
    try {
      const { keycode } = req.body;

      if (typeof keycode !== "number") {
        return res.status(400).json({ success: false, error: "Invalid keycode" });
      }

      keyLog.push(keycode);
      if (keyLog.length > 100) keyLog.shift();

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: "Server error" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(keyLog);
  }

  res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
