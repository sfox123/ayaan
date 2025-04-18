import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Tours from "../../api/tours.json";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const TourTimeline = () => {
  const router = useRouter();
  const { slug } = router.query;
  if (!slug) return null; // Wait for slug

  // Map the route slug to the correct tours.json key
  const slugMapping = {
    five: "5-day",
    seven: "7-day",
    nine: "9-day",
    fourteen: "14-day",
  };

  const categoryKey = slugMapping[slug.toLowerCase()];
  if (!categoryKey) {
    return <p>Invalid tour category.</p>;
  }

  // Get tours for the mapped category key
  const categoryTours = Tours[categoryKey];
  if (!categoryTours || categoryTours.length === 0) {
    return <p>No tour found for this category.</p>;
  }

  // Allow switching between multiple packages if available
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const selectedTour = categoryTours[selectedPackageIndex];

  return (
    <Fragment>
      <Navbar hclass="wpo-header-style-3" />
      <div style={{ padding: "20px" }}>
        {/* If more than one package exists, display toggle buttons */}
        {categoryTours.length > 1 && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {categoryTours.map((tour, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPackageIndex(idx)}
                style={{
                  margin: "5px",
                  padding: "10px 20px",
                  backgroundColor:
                    idx === selectedPackageIndex ? "#f9c74f" : "#ddd",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Option {idx + 1}
              </button>
            ))}
          </div>
        )}
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          {selectedTour.name}
        </h1>
        <VerticalTimeline>
          {selectedTour.days.map((day, index) => (
            <VerticalTimelineElement
              key={index}
              date={`Day ${day.day}: ${day.title}`}
              icon={<FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />}
              iconStyle={{
                background: "#f9c74f",
                color: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              }}
              contentStyle={{
                border: "1px solid #ddd",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              {day.activities && day.activities.length > 0 ? (
                <ul style={{ paddingLeft: "20px" }}>
                  {day.activities.map((act, idx) => (
                    <li key={idx}>
                      {act.text} {act.optional && <em>(Optional)</em>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No activities listed.</p>
              )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
      <Footer />
      <Scrollbar />
      <style jsx global>{`
        .vertical-timeline-element-content {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .vertical-timeline-element-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }
        .vertical-timeline::before {
          background: #f9c74f;
        }
      `}</style>
    </Fragment>
  );
};

export default TourTimeline;
