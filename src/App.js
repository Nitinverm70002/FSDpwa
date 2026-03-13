import React, { useState, useEffect } from "react";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    // This API call will be cached by Workbox (Network First)
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => console.log("Serving from cache (offline)"));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>My React PWA</h1>

      {/* Offline Banner */}
      {!isOnline && (
        <div style={{
          background: "#ff5722", color: "white",
          padding: "10px", borderRadius: "5px", marginBottom: "1rem"
        }}>
          ⚠️ You are offline — serving cached content
        </div>
      )}

      {isOnline && (
        <div style={{
          background: "#4caf50", color: "white",
          padding: "10px", borderRadius: "5px", marginBottom: "1rem"
        }}>
          ✅ Online
        </div>
      )}

      <h2>API Data (cached when offline):</h2>
      {data ? (
        <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "5px" }}>
          <strong>{data.title}</strong>
          <p>{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;