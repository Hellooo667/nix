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
    // Enhanced keycode mapping
    const keyMap = {
      8: '⌫',   // Backspace
      9: '⇥',    // Tab
      13: '↵',   // Enter
      16: '⇧',   // Shift
      17: '⌃',   // Ctrl
      18: '⌥',   // Alt
      19: '⎉',   // Pause/Break
      20: '⇪',   // Caps Lock
      27: '⎋',   // Escape
      32: '␣',   // Space
      33: '⇞',   // Page Up
      34: '⇟',   // Page Down
      35: '↘',   // End
      36: '↖',   // Home
      37: '←',   // Arrow Left
      38: '↑',   // Arrow Up
      39: '→',   // Arrow Right
      40: '↓',   // Arrow Down
      45: '⎀',   // Insert
      46: '⌦',   // Delete
      91: '⊞',   // Windows/Command
      93: '≣',   // Menu
      112: 'F1', // Function keys...
      113: 'F2',
      // Add more F-keys as needed
    };

    // Check if it's a printable character
    if (code >= 33 && code <= 126 && !keyMap[code]) {
      return String.fromCharCode(code);
    }
    
    return keyMap[code] || `[${code}]`;
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      color: "#000", // Pure black
      fontFamily: "'Courier New', monospace",
      fontSize: "2rem",
    }}>
      <h1 style={{ 
        color: "#000",
        fontSize: "2.5rem",
        marginBottom: "1rem"
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
        gap: "0.5rem"
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
