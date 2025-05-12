// pages/api/data.js

let logs = []; // Keep logs in memory across requests

export default async function handler(req, res) {
  // Allow all origins (for development)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Respond to preflight
  }

  if (req.method === "POST") {
    const { keycode } = req.body;
    if (typeof keycode === "number") {
      logs.push(keycode);
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "Invalid keycode" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(logs.slice(-100)); // Return recent logs
  }

  res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
