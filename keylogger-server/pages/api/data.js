let keyLog = [];

export default async function handler(req, res) {
  // Step 1: Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // CORS preflight
  }

  // Step 2: Handle POST request to store keycode
  if (req.method === "POST") {
    const { keycode } = req.body;

    if (typeof keycode === "number") {
      keyLog.push(keycode);
      if (keyLog.length > 100) keyLog.shift(); // limit to last 100
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: "Invalid keycode" });
  }

  // Step 3: Handle GET request to retrieve keycodes
  if (req.method === "GET") {
    return res.status(200).json(keyLog);
  }

  // Step 4: Handle other methods
  res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
