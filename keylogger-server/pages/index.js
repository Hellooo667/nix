import { useEffect, useState } from "react";

export default function Home() {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch("/api/data");
        const json = await res.json();
        setKeys(json);
      } catch (err) {
        console.error("Failed to fetch keys:", err);
      }
    };

    fetchKeys();
    const interval = setInterval(fetchKeys, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      backgroundColor: "white",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "monospace",
      color: "black"
    }}>
      <h1>Live Keystroke Viewer</h1>
      <ul>
        {keys.map((key, index) => (
          <li key={index}>Keycode: {key}</li>
        ))}
      </ul>
    </div>
  );
}

