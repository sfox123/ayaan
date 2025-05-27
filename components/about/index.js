import React, { useState, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import Heading from "../Heading";
import districtsData from "../../api/district.json";

const SriLankaMap = dynamic(() => import("../../components/SriLankaMap"), {
  ssr: false,
});

export default function About() {
  const [selectedDistrict, setSelectedDistrict] = useState("Sigiriya");
  const imgRef = useRef(null); // Create a ref for the image
  const isInView = useInView(imgRef, { once: true }); // Trigger animation only once when visible

  const ClickHandler = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // Function to handle displaying district names
  const handleName = (district) => {
    switch (district.toLowerCase()) {
      case "kandy":
        return "Kandy City";
      case "colombo":
        return "Colombo City";
      case "matale":
        return "Sigiriya"; // Matale district is associated with Sigiriya
      case "badulla":
        return "Ella";
      default:
        return district;
    }
  };

  // Function to handle district click from the map
  const handleDistrictClick = (districtName) => {
    setSelectedDistrict(districtName);
  };

  // Find the data for the selected district, defaulting to Sigiriya if not found
  const selectedDistrictData =
    districtsData.districts.find(
      (district) =>
        district.name.toLowerCase() === selectedDistrict.toLowerCase()
    ) || districtsData.districts.find((d) => d.name.toLowerCase() === "matale"); // Fallback to Matale/Sigiriya data

  return (
    <div className="wpo-about-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="wpo-about-img">
              {/* Sri Lanka Map component */}
              <SriLankaMap
                selectedDistrictName={
                  selectedDistrict === "Sigiriya" ? "Matale" : selectedDistrict // Pass "Matale" to map if "Sigiriya" is selected
                }
                onDistrictClick={handleDistrictClick}
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="wpo-about-text">
              <div className="wpo-section-title">
                {/* Heading for the selected district/location */}
                <Heading text={handleName(selectedDistrict)} size="md" />
              </div>
              {/* Polaroid-style image container */}
              <div className="tours__polaroid-frame">
                <motion.img
                  key={selectedDistrict} // Key for re-animating on district change
                  ref={imgRef}
                  src={
                    selectedDistrictData?.image ||
                    "https://placehold.co/400x300/E0E0E0/333333?text=Image+Not+Found"
                  } // Use image path from JSON, with a placeholder fallback
                  alt={selectedDistrictData?.alt || selectedDistrict} // Use alt text from data or selectedDistrict
                  className="tours__polaroid-image" // Existing class and new class for image styling
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1, rotate: 0 }
                      : { opacity: 0, scale: 0.8, rotate: -10 }
                  }
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
                {/* Alt text for the polaroid photo */}
                <div className="tours__polaroid-caption">
                  {selectedDistrictData?.["image-alt"] || selectedDistrict}
                </div>
              </div>
              {/* Description paragraph */}
              <motion.p
                key={selectedDistrict} // Key for re-animating on district change
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="font-about"
              >
                {/* Display content, defaulting to Sigiriya's content if selectedDistrictData is not found */}
                {selectedDistrictData?.content ||
                  districtsData.districts.find(
                    (d) => d.name.toLowerCase() === "matale"
                  )?.content ||
                  "No content available for this district."}
              </motion.p>
              {/* Explore button */}
              <div className="btns" style={{ marginBottom: "20px" }}>
                <Link
                  onClick={ClickHandler}
                  href={`/location/${selectedDistrictData?.name.toLowerCase().replace(" ", "-") || "sigiriya"}`} // Dynamic link based on selected district
                  className="theme-btn-s2"
                >
                  {`Explore ${handleName(selectedDistrict)}`}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
