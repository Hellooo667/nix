// pages/view.js
import { useEffect, useState } from 'react';

export default function View() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch("/api/data");
        const json = await res.json();
        console.log("API response:", json);
        if (Array.isArray(json)) {
          setData(json);
        } else {
          console.error("API did not return an array:", json);
        }
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
      backgroundColor: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      color: "#000",
      fontFamily: "monospace"
    }}>
      <h1>Logged Keycodes</h1>
      <ul>
        {data.map((code, index) => (
          <li key={index}>Keycode: {code}</li>
        ))}
      </ul>
    </div>
  );
}
