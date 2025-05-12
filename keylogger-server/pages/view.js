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
    // Special keys mapping
    const specialKeys = {
      8: '⌫',  // Backspace
      9: '⇥',  // Tab
      13: '⏎', // Enter
      16: '⇧', // Shift
      17: '⌃', // Ctrl
      18: '⌥', // Alt
      20: '⇪', // Caps Lock
      27: '⎋', // Escape
      32: '␣', // Space
      37: '←', // Arrow Left
      38: '↑', // Arrow Up
      39: '→', // Arrow Right
      40: '↓', // Arrow Down
      46: '⌦', // Delete
      91: '⌘', // Command (Left)
      93: '⌘', // Command (Right)
    };

    return specialKeys[code] || String.fromCharCode(code);
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      color: "#000", // Darker text
      fontFamily: "monospace",
      fontSize: "2rem", // Increased font size
      whiteSpace: "nowrap", // Prevent line breaks
      overflowX: "auto" // Add horizontal scroll if needed
    }}>
      <h1 style={{ color: "#000", fontSize: "2.5rem" }}>Logged Keys</h1>
      <div style={{ 
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        borderRadius: "4px",
        minHeight: "3rem",
        border: "1px solid #ddd"
      }}>
        {data.map((code, index) => (
          <span key={index}>{decodeKey(code)}</span>
        ))}
      </div>
    </div>
  );
}
