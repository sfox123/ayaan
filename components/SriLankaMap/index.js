import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import blankStyle from "./blank-style.json";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

// Example "enabled" list: each item must match the GeoJSON district `properties.name`
const enabledDistricts = [
  "Kandy",
  "Anuradhapura",
  "Colombo",
  "Badulla",
  "Galle",
  "Jaffna",
  "Polonnaruwa",
  "matale",
];

// Helper: Build a Mapbox expression to filter “enabled” vs “disabled”
function getEnabledFilter() {
  // “in” expression: true if the district name is in our array
  return [
    "in",
    ["downcase", ["get", "name"]],
    ["literal", enabledDistricts.map((d) => d.toLowerCase())],
  ];
}

export default function SriLankaMap({ selectedDistrictName, onDistrictClick }) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) return; // Only run once

    const mapboxMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: blankStyle,
      center: [80.7, 7.9],
      zoom: 7,
      dragPan: false,
      dragRotate: false,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
    });

    mapboxMap.on("load", () => {
      setMap(mapboxMap);

      // 1) Add the GeoJSON source
      mapboxMap.addSource("sri-lanka", {
        type: "geojson",
        data: "/lk.json", // place your lk.json in /public
      });

      // ============= DISABLED LAYERS (gray outline) =============
      // Districts *not* in our "enabled" list
      mapboxMap.addLayer({
        id: "sl-fill-disabled",
        type: "fill",
        source: "sri-lanka",
        filter: ["!", getEnabledFilter()], // NOT in the enabled set
        paint: {
          "fill-color": "#000",
          "fill-opacity": 0.02, // Very light fill
        },
      });
      mapboxMap.addLayer({
        id: "sl-outline-disabled",
        type: "line",
        source: "sri-lanka",
        filter: ["!", getEnabledFilter()],
        paint: {
          "line-color": "#999", // Gray outline
          "line-width": 1,
        },
      });

      // ============= ENABLED LAYERS (black outline) =============
      // Districts in "enabledDistricts"
      mapboxMap.addLayer({
        id: "sl-fill-enabled",
        type: "fill",
        source: "sri-lanka",
        filter: getEnabledFilter(),
        paint: {
          "fill-color": "#c8b79e", // a parchment-like fill
          "fill-opacity": 0.3,
        },
      });

      // Outline
      mapboxMap.addLayer({
        id: "sl-outline-enabled",
        type: "line",
        source: "sri-lanka",
        filter: getEnabledFilter(),
        paint: {
          "line-color": "#5b3a29", // dark brown outline
          "line-width": 2,
        },
      });

      // ============= HOVER LAYER (only for enabled) =============
      mapboxMap.addLayer({
        id: "sl-hover-enabled",
        type: "fill",
        source: "sri-lanka",
        filter: ["==", ["get", "name"], ""], // start empty
        paint: {
          "fill-color": "#333",
          "fill-opacity": 0.3,
        },
      });

      // ============= SELECTED LAYER (highlight in orange) =============
      mapboxMap.addLayer({
        id: "sl-fill-selected",
        type: "fill",
        source: "sri-lanka",
        filter: ["==", ["downcase", ["get", "name"]], ""], // updated dynamically
        paint: {
          "fill-color": "#FFA500",
          "fill-opacity": 0.35,
        },
      });

      // Fit to bounding box
      mapboxMap.fitBounds(
        [
          [79.7, 5.8], // SW corner
          [82.1, 10.0], // NE corner
        ],
        { padding: 20 }
      );

      // HOVER only on the enabled fill layer
      mapboxMap.on("mousemove", "sl-fill-enabled", (e) => {
        if (!e.features?.length) return;
        const hovered = e.features[0].properties.name;
        mapboxMap.setFilter("sl-hover-enabled", [
          "==",
          ["get", "name"],
          hovered,
        ]);
      });
      mapboxMap.on("mouseleave", "sl-fill-enabled", () => {
        mapboxMap.setFilter("sl-hover-enabled", ["==", ["get", "name"], ""]);
      });
      mapboxMap.on("mouseenter", "sl-fill-enabled", () => {
        mapboxMap.getCanvas().style.cursor = "pointer";
      });
      mapboxMap.on("mouseleave", "sl-fill-enabled", () => {
        mapboxMap.getCanvas().style.cursor = "";
      });
      // CLICK only on enabled districts
      mapboxMap.on("click", "sl-fill-enabled", (e) => {
        if (!e.features?.length) return;
        const clickedDistrict = e.features[0].properties.name;
        onDistrictClick?.(clickedDistrict);
      });
    });
  }, [map, onDistrictClick]);

  // Update the "selected" layer whenever selectedDistrictName changes
  useEffect(() => {
    if (!map) return;
    if (!map.getLayer("sl-fill-selected")) return;

    // If not in the "enabled" list, we might do nothing or forcibly clear selection
    const selectedLower = selectedDistrictName?.toLowerCase() || "";
    const isAllowed = enabledDistricts
      .map((d) => d.toLowerCase())
      .includes(selectedLower);

    map.setFilter("sl-fill-selected", [
      isAllowed ? "==" : "==", // We'll do the same check, but if not allowed, set empty
      ["downcase", ["get", "name"]],
      isAllowed ? selectedLower : "",
    ]);
  }, [map, selectedDistrictName]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />
  );
}
