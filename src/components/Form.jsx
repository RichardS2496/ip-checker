import "../styles/Form.css";
import { SearchResult } from "./SearchResult";
import { useState, useEffect, useCallback, useRef } from "react";

export function Form() {
  const [ipInput, setIpInput] = useState("");
  const [showMyIp, setShowMyIp] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL_IP_API = import.meta.env.VITE_API_URL;

  // Función para hacer la consulta a la API con una IP (o sin ella)
  const fetchIPData = useCallback(async (ip = "") => {
    //   const url = `https://${URL_IP_API}/?${ip ? `ip=${ip}&` : ""}format=json`;

    const url = `https://ipwho.is/${ip}`;

    //   const options = {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-key": API_KEY,
    //       "x-rapidapi-host": "ip-geo-location4.p.rapidapi.com",
    //     },
    //   };

    setLoading(true);
    setSearchResult(null);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error("Error al consultar la IP");

      const data = await response.json();
      setSearchResult(data);
      console.log("Datos recibidos:", data);
    } catch (err) {
      setError("Hubo un problema al consultar la IP.", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const didFetch = useRef(false);

  // Al iniciar el componente, detectar IP del usuario y buscar info
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const detectAndFetch = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setShowMyIp(data.ip);
        fetchIPData(data.ip);
      } catch (err) {
        console.error("Error al detectar IP al iniciar", err);
      }
    };

    detectAndFetch();
  }, [fetchIPData]);

  const handleInputChange = (e) => {
    setIpInput(e.target.value);
  };

  const handleCheckIP = (e) => {
    e.preventDefault();
    if (!ipInput.trim()) {
      setError("Por favor ingresa una IP válida.");
      return;
    }
    fetchIPData(ipInput.trim());
    setShowMyIp(ipInput);
  };

  return (
    <div>
      <div className="main-app-container">
        <div className="form-section">
          <span className="text-sm font-medium text-white">
            Your current IP
          </span>
          <h2 className="title-ip-section">{showMyIp}</h2>
          <h3 className="text-white text-2xl font-medium">
            {searchResult.city} / {searchResult.country}
          </h3>

          <form className="form-container" action="">
            <input
              className="input-form"
              type="text"
              placeholder="Introduce the IP"
              value={ipInput}
              onChange={handleInputChange}
            />
            <div className="btns-form-container">
              <button onClick={handleCheckIP} className="search-btn">
                Search IP
              </button>
            </div>
          </form>
        </div>
      </div>
      <SearchResult loading={loading} error={error} result={searchResult} />
    </div>
  );
}
