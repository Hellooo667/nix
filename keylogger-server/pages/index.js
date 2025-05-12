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
        console.error("Failed to fetch keys:", err);
      }
    };

    fetchKeys();
    const interval = setInterval(fetchKeys, 1000);
    return () => clearInterval(interval);
  }, []);

  const decodeKey = (code) => {
    const keyMap = {
      8: 'Backspace', 9: 'Tab', 13: 'Enter', 27: 'Esc', 32: 'Space',
      37: '←', 38: '↑', 39: '→', 40: '↓', 91: 'Meta', 93: 'Menu',
    };

    if (code >= 2 && code <= 10) return String(code - 1); // 1–9
    if (code === 11) return '0'; // 0
    if (code >= 16 && code <= 25) return String.fromCharCode(81 + (code - 16)); // q–p
    if (code >= 30 && code <= 38) return String.fromCharCode(65 + (code - 30)); // a–l
    if (code >= 44 && code <= 50) return String.fromCharCode(122 - (50 - code)); // z–m

    return keyMap[code] || `[${code}]`;
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      color: "#111",
      fontFamily: "monospace",
      fontSize: "1.5rem",
      padding: "2rem",
      minHeight: "100vh",
      boxSizing: "border-box",
      overflowX: "auto"
    }}>
      <h1 style={{ fontSize: "2rem" }}>Logged Keys</h1>
      <div style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word"
      }}>
        {data.map((code, index) => (
          <span key={index}>{decodeKey(code)}</span>
        ))}
      </div>
    </div>
  );
}
