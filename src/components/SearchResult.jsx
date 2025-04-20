import "../styles/SearchResult.css";
// import { useState } from "react";

// src/components/SearchResult.jsx

export function SearchResult({ result, loading, error }) {
  //   const [latitude, setLatitude] = useState("");
  //   const [longitude, setLongitude] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!result) {
    return <p>No found information</p>; // o algún mensaje tipo "No hay resultados"
  }

  //   const { latitude, longitude } = result;

  const mapUrl = `https://maps.google.com/maps?q=${result.latitude},${result.longitude}&z=15&output=embed`;

  return (
    <div className="section-result">
      <div className="result-inner-container">
        <div className="data-result-section">
          <div>
            <h2 className="title-standard mb-2 flex flex-row items-center justify-start gap-4">
              IP Location{" "}
              <img
                src={result.flag.img}
                alt={`Bandera de ${result.country}`}
                className="w-6 h-4"
              />
            </h2>
            <hr className="border-blue-900" />
            <div className="my-4 flex flex-col gap-4">
              <p>
                <strong>City:</strong> {result.city}
              </p>
              <p>
                <strong>Region:</strong> {result.region}
              </p>

              <p>
                <strong>Country / Capital:</strong> {result.country} -{" "}
                {result.capital}
              </p>
              <p>
                <strong>Continent Code:</strong> {result.country_code}
              </p>
              <p>
                <strong>Continent:</strong> {result.continent}
              </p>
              <p>
                <strong>Continent Code:</strong> {result.continent_code}
              </p>
              <p>
                <strong>ZIP Code:</strong> {result.postal}
              </p>
            </div>
          </div>
          <div>
            <h2 className="title-standard mb-2">IP Information</h2>
            <hr className="border-blue-900" />
            <div className="my-4 flex flex-col gap-4">
              <p>
                <strong>IP:</strong> {result.ip}
              </p>

              <p>
                <strong>Type:</strong> {result.type}
              </p>
              <p>
                <strong>ASN:</strong> {result.connection.asn}
              </p>
              <p>
                <strong>Domain:</strong> {result.connection.domain}
              </p>
              <p>
                <strong>ISP:</strong> {result.connection.isp}
              </p>
              <p>
                <strong>Organization:</strong> {result.connection.org}
              </p>
            </div>
          </div>
        </div>
        <div className="right-result-section">
          <div className="map-section">
            <iframe
              className="map-iframe"
              title="Ubicación IP"
              width="100%"
              height="300"
              frameBorder="0"
              src={mapUrl}
              allowFullScreen
            ></iframe>
          </div>
          <div className="timezone-section">
            <h2 className="title-standard">Time Information</h2>
            <hr className="border-blue-900" />
            <div className="mt-4 flex flex-col gap-4">
              <p>
                <strong>Time Zone:</strong> {result.timezone.id}
              </p>
              <p>
                <strong>Current Time:</strong> {result.timezone.current_time}
              </p>
              <p>
                <strong>UTC:</strong> {result.timezone.utc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
