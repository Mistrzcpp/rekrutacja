"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Importuj() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/importuj", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Import zakończony");
      } else {
        setMessage("Błąd importu");
      }
    } catch (err) {
      setMessage("Błąd serwera");
    }

    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        className="btn-close my-3 ms-3"
        aria-label="Close"
        title="Wyjdź"
        onClick={() => navigate("/")}
      ></button>
      <div style={{ padding: "40px" }}>
        <h2>Import CSV</h2>

        <input type="file" accept=".csv" onChange={handleUpload} />

        {loading && <p>Wczytywanie...</p>}
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
