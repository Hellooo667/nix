import { useEffect, useState } from 'react';

export default function View() {
  const [data, setData] = useState([]);

 useEffect(() => {
  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/data");
      const json = await res.json();
      console.log("API response:", json); // ← log what comes back
      setKeys(json);
    } catch (err) {
      console.error("Failed to fetch keys:", err);
    }
  };

  fetchKeys();
  const interval = setInterval(fetchKeys, 1000);
  return () => clearInterval(interval);
}, []);


    const interval = setInterval(fetchData, 1000); // refresh every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Logged Keycodes</h1>
      <ul>
        {data.map((code, i) => (
          <li key={i}>{code}</li>
        ))}
      </ul>
    </div>
  );
}
