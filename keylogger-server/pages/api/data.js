export default async function handler(req, res) {
  // Allow all origins (for development only)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight
  }

  if (req.method === 'POST') {
    const { keycode } = req.body;
    console.log('Received keycode:', keycode);

    // Save or process the keycode
    return res.status(200).json({ status: 'OK', keycode });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
