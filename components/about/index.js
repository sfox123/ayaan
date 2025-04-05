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
  const handleName = (selectedDistrict) => {
    let displayName = selectedDistrict; // default is the original name
    let name = "";

    switch (displayName.toLowerCase()) {
      case "kandy":
        name = "Kandy City";
        break;
      case "colombo":
        name = "Colombo City";
        break;
      case "matale":
        name = "Sigiriya";
        break;
      case "badulla":
        name = "Ella";
        break;
      default:
        return displayName;
    }

    return name;
  };

  const handleDistrictClick = (districtName) => {
    let displayName = districtName; // default is the original name
    setSelectedDistrict(displayName);
  };

  // Find the image path for the selected district
  const selectedDistrictData = districtsData.districts.find(
    (district) => district.name.toLowerCase() === selectedDistrict.toLowerCase()
  );

  return (
    <div className="wpo-about-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="wpo-about-img">
              <SriLankaMap
                selectedDistrictName={
                  selectedDistrict == "Sigiriya" ? "Matale" : selectedDistrict
                }
                onDistrictClick={handleDistrictClick}
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="wpo-about-text">
              <div className="wpo-section-title">
                <Heading text={handleName(selectedDistrict)} size="md" />
              </div>
              <div>
                <motion.img
                  key={selectedDistrict}
                  ref={imgRef}
                  src={selectedDistrictData?.image || "svg/sigiriya.svg"} // Use the image path from JSON
                  alt={selectedDistrict}
                  className="sigiriya"
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
              </div>
              <motion.p
                key={selectedDistrict}
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
                {selectedDistrictData?.content ||
                  districtsData.districts[2].content}
              </motion.p>
              <div className="btns" style={{ marginBottom: "20px" }}>
                <Link
                  onClick={ClickHandler}
                  href="/about"
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
