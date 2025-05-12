import { useEffect, useState } from 'react';

export default function View() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch("/api/data");
        const json = await res.json();
        console.log("API response:", json); // See what's returned
        if (Array.isArray(json)) {
          setData(json);
        } else {
          console.error("Unexpected data format:", json);
        }
      } catch (err) {
        console.error("Failed to fetch keys:", err);
      }
    };

    fetchKeys(); // initial call
    const interval = setInterval(fetchKeys, 1000); // refresh every second
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div style={{
      padding: 20,
      minHeight: "100vh",
      backgroundColor: "#fff",
      color: "#000",
      fontFamily: "monospace"
    }}>
      <h1>Logged Keycodes</h1>
      <ul>
        {data.map((code, i) => (
          <li key={i}>Keycode: {code}</li>
        ))}
      </ul>
    </div>
  );
}
