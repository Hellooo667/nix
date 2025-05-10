import { useEffect, useState } from 'react';

export default function View() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const result = await res.json();
      setData(result);
    };

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
