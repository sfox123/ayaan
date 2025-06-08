import React, { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Placeholder Heading component – replace with your actual import if needed
const Heading = ({ text, size = "md" }) => {
  const Tag = size === "lg" ? "h1" : size === "md" ? "h2" : "h3";
  return <Tag style={{ marginTop: 0, marginBottom: "10px" }}>{text}</Tag>;
};

const SriLankaMap = dynamic(
  () => import("../SriLankaMap").then((mod) => mod.SriLankaMap),
  { ssr: false }
);

function About() {
  const [selectedPoi, setSelectedPoi] = useState(null);

  const handlePoiClick = useCallback((poi) => {
    console.log("About: POI Clicked in parent:", poi.name);
    setSelectedPoi(poi);
    // Optional: Scroll to details panel
    const detailsPanel = document.getElementById("poi-details-panel");
    if (detailsPanel) {
      detailsPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);

  // Utility: parse images into an array if necessary
  const getImagesArray = (images) => {
    if (Array.isArray(images)) {
      return images;
    } else if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Error parsing images:", error);
        return [];
      }
    }
    return [];
  };

  // Get images array from selectedPoi
  const imagesArray = selectedPoi?.images
    ? getImagesArray(selectedPoi.images)
    : [];

  return (
    <div className="map__about-container">
      <h1 className="map__about-title">Discover Sri Lanka’s Heritage Sites</h1>
      <p className="map__about-text">
        This interactive map shows major points of interest across Sri Lanka.
      </p>

      <div className="map__map-wrapper">
        <SriLankaMap onPoiClick={handlePoiClick} />
      </div>

      {/* Panel to display selected POI details */}
      {selectedPoi && (
        <div id="poi-details-panel" className="map__poi-details-panel">
          <Heading text={selectedPoi.name} size="md" />
          {selectedPoi.description && <p>{selectedPoi.description}</p>}
          {imagesArray.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {imagesArray.slice(0, 2).map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={selectedPoi.imageAlt || selectedPoi.name}
                  style={{
                    width: "50%",
                    height: "auto",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default About;
