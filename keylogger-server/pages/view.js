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
    const keyMap = {
      8: 'Backspace', 9: 'Tab', 13: 'Enter', 27: 'Esc', 32: ' ',
      37: '←', 38: '↑', 39: '→', 40: '↓',
      91: 'Meta', 93: 'Menu'
    };

    // Custom number mapping
    if (code >= 2 && code <= 10) return String(code - 1);
    if (code === 11) return '0';

    // Top row letters: q=16 to p=25
    if (code >= 16 && code <= 25) return String.fromCharCode(81 + (code - 16));

    // Home row: a=30 to l=38
    if (code >= 30 && code <= 38) return String.fromCharCode(65 + (code - 30));

    // Bottom row: z=44 to m=50
    if (code >= 44 && code <= 50) return String.fromCharCode(90 + (code - 44));

    return keyMap[code] || `[${code}]`;
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
      <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
        {data.map((code, index) => (
          <span key={index}>{decodeKey(code)}</span>
        ))}
      </div>
    </div>
  );
}
