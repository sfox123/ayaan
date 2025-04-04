import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const SriLankaMap = dynamic(() => import("../../components/SriLankaMap"), {
  ssr: false,
});

export default function About() {
  const [selectedDistrict, setSelectedDistrict] = useState("Ella");

  const handleDistrictClick = (districtName) => {
    let displayName = districtName; // default is the original name

    switch (districtName.toLowerCase()) {
      case "kandy":
        displayName = "Kandy City";
        break;
      case "colombo":
        displayName = "Colombo City";
        break;
      case "matale":
        displayName = "Sigiriya";
        break;
      case "badulla":
        displayName = "Ella";
        break;
      default:
        break;
    }

    setSelectedDistrict(displayName);
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <div className="wpo-about-area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="wpo-about-img">
              <SriLankaMap
                selectedDistrictName={
                  selectedDistrict == "Ella" ? "Badulla" : selectedDistrict
                }
                // Pass the selected district name to the SriLankaMap component
                onDistrictClick={handleDistrictClick}
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="wpo-about-text">
              <div className="wpo-section-title">
                <span>About Us</span>
                <h2>Welcome to {selectedDistrict}</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="btns">
                <Link
                  onClick={ClickHandler}
                  href="/about"
                  className="theme-btn-s2"
                >
                  More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
