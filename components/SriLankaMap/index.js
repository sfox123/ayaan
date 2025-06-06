import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import poisDataImport from "../../api/pois.json"; // your POI list
import lkGeoJSON from "../../public/lk.json"; // Sri Lanka GeoJSON

// Ensure Mapbox CSS is imported in your _app.js or main layout component
// import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN_HERE"; // 🚨 REPLACE THIS!

export function SriLankaMap({ onPoiClick }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const poisGeoJSON = {
    type: "FeatureCollection",
    features: poisDataImport.map((poi) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: poi.coordinates,
      },
      properties: {
        id: poi.id,
        name: poi.name,
        iconUrl: poi.iconUrl,
        ...poi, // Pass through all original POI data
      },
    })),
  };

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "/blank-style.json", // Path to your blank style in /public
      center: [80.8, 7.9],
      zoom: 6.5,
      dragPan: false, // Map is static
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragRotate: false,
      interactive: false,
    });

    const map = mapRef.current;

    map.on("load", () => {
      console.log("SriLankaMap: Map loaded.");

      if (!map.getSource("srilanka")) {
        map.addSource("srilanka", { type: "geojson", data: lkGeoJSON });
      }
      if (!map.getLayer("srilanka-fill")) {
        map.addLayer({
          id: "srilanka-fill",
          type: "fill",
          source: "srilanka",
          paint: { "fill-color": "#E0E0E0", "fill-opacity": 0.7 },
        });
      }
      if (!map.getLayer("srilanka-outline")) {
        map.addLayer({
          id: "srilanka-outline",
          type: "line",
          source: "srilanka",
          paint: { "line-color": "#B0B0B0", "line-width": 1 },
        });
      }

      map.fitBounds(
        [
          [79.6, 5.7],
          [82.0, 10.1],
        ],
        { padding: 20, duration: 0 }
      );

      const imageLoadPromises = poisGeoJSON.features.map((feature) => {
        return new Promise((resolve, reject) => {
          const iconKey = feature.properties.id;
          const iconUrl = feature.properties.iconUrl;
          if (!iconUrl) {
            resolve();
            return;
          }
          if (map.hasImage(iconKey)) {
            resolve();
            return;
          }
          map.loadImage(iconUrl, (err, img) => {
            if (err) {
              console.error("Failed to load icon:", iconKey, err);
              reject(err);
            } else if (img) {
              map.addImage(iconKey, img);
              resolve();
            } else {
              resolve();
            }
          });
        });
      });

      Promise.all(imageLoadPromises)
        .then(() => {
          console.log("All POI images attempted to load for sprite.");
          if (!map.getSource("pois")) {
            map.addSource("pois", { type: "geojson", data: poisGeoJSON });
          }

          // Optional: Remove or adjust Sigiriya-halo if all icons are uniformly small
          if (!map.getLayer("sigiriya-halo")) {
            map.addLayer({
              id: "sigiriya-halo",
              type: "circle",
              source: "pois",
              filter: ["==", ["get", "id"], "sigiriya-rock"], // Still targets Sigiriya
              paint: {
                // You might want to adjust radius if icon size changed drastically
                "circle-radius": 10, // Example: smaller halo if icon is 0.5
                "circle-color": "#FFD54F",
                "circle-opacity": 0.35,
              },
            });
          }

          if (!map.getLayer("pois-layer")) {
            map.addLayer({
              id: "pois-layer",
              type: "symbol",
              source: "pois",
              layout: {
                "icon-image": ["get", "id"],
                "icon-size": [
                  "case",
                  ["==", ["get", "id"], "sigiriya-rock"],
                  0.5, // Sigiriya icon at 50% of its original size
                  0.35, // Other POI icons at 35% of their original size
                ],
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
              },
            });
          }
        })
        .catch((error) =>
          console.error("Error loading POI icon images:", error)
        );

      map.on("click", "pois-layer", (e) => {
        if (e.features && e.features.length > 0) {
          const clickedFeature = e.features[0];
          if (clickedFeature.properties) {
            onPoiClick?.(clickedFeature.properties);
          }
        }
      });

      map.on("mouseenter", "pois-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "pois-layer", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        console.log("SriLankaMap: Map instance removed.");
      }
    };
  }, []); // Empty dependency array ensures map initializes once

  return <div className="map__map-container" ref={mapContainerRef} />;
}
