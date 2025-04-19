import "../styles/SearchResult.css";

// src/components/SearchResult.jsx

export function SearchResult({ result, loading, error }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!result) {
    return <p>No found information</p>; // o algún mensaje tipo "No hay resultados"
  }

  return (
    <div className="section-result">
      <div className="result-inner-container">
        <div className="data-result-section">
          <p>
            <strong>Type:</strong> {result.ip}
          </p>

          <p>
            <strong>Type:</strong> {result.type}
          </p>
          <p>
            <strong>País:</strong> {result.country.country_name}
          </p>
          <p>
            <strong>Ciudad:</strong> {result.country.country_name}
          </p>
          <p>
            <strong>ISP:</strong> {result.isp}
          </p>
        </div>
        <div className="map-section">Google Map</div>
      </div>
    </div>
  );
}
