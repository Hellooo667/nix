let keyLog = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { keycode } = req.body;
      if (typeof keycode === "number") {
        keyLog.push(keycode);
        if (keyLog.length > 100) keyLog.shift(); // Keep only recent 100
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ error: "Invalid keycode" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(keyLog);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

