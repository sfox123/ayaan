import React, { useState, useCallback } from "react";
import Link from "next/link"; // Keep if you use the exploreLink
import dynamic from "next/dynamic";
// import { motion, useInView } from "framer-motion"; // Keep if you use for panel animations

// Placeholder Heading component - replace with your actual import if different
const Heading = ({ text, size = "md" }) => {
  const Tag = size === "lg" ? "h1" : size === "md" ? "h2" : "h3";
  return <Tag style={{ marginTop: 0, marginBottom: "10px" }}>{text}</Tag>; // Basic styling
};

const SriLankaMap = dynamic(
  () => import("../SriLankaMap").then((mod) => mod.SriLankaMap),
  { ssr: false }
);

function About() {
  // Or export default function About() if it's a Next.js page
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
          {/* {selectedPoi.images && selectedPoi.images[0] && (
            <img
              src={selectedPoi.images[0]}
              alt={selectedPoi.imageAlt || selectedPoi.name}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "4px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
          )} */}
        </div>
      )}

      {/* <p className="map__about-footer">
        <strong>How it works:</strong> Icons represent points of interest. Click
        an icon to see details below. Sigiriya’s icon is initially highlighted
        on the map.
      </p> */}
    </div>
  );
}

// If this is a Next.js page (e.g., in pages/about.js), it typically needs a default export:
export default About;
