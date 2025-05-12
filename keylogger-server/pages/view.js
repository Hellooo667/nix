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
      8: '⌫', 9: '⇥', 13: '↵', 16: '⇧', 17: '⌃',
      18: '⌥', 19: '⎉', 20: '⇪', 27: '⎋', 32: ' ',
      33: '⇞', 34: '⇟', 35: '↘', 36: '↖', 37: '←',
      38: '↑', 39: '→', 40: '↓', 45: '⎀', 46: '⌦',
      91: '⊞', 93: '≣',
      112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5',
      117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10',
      122: 'F11', 123: 'F12'
    };

    if (keyMap[code]) return keyMap[code];
    if (code >= 48 && code <= 90 || code >= 97 && code <= 122) {
      return String.fromCharCode(code);
    }
    return `[${code}]`;
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      color: "#000",
      fontFamily: "'Courier New', monospace",
      fontSize: "2rem",
      fontWeight: "normal"
    }}>
      <h1 style={{
        color: "#000",
        fontSize: "2.5rem",
        marginBottom: "1rem",
        fontWeight: "normal"
      }}>
        Logged Keys
      </h1>

      <div style={{
        backgroundColor: "#f8f8f8",
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        minHeight: "4rem",
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        alignItems: "center",
        gap: "0.5rem",
        whiteSpace: "nowrap"
      }}>
        {data.length > 0 ? (
          data.map((code, index) => (
            <span key={index} style={{
              display: "inline-block",
              minWidth: "1.5em",
              textAlign: "center"
            }}>
              {decodeKey(code)}
            </span>
          ))
        ) : (
          <span style={{ color: "#888" }}>No keys logged yet...</span>
        )}
      </div>
    </div>
  );
}
