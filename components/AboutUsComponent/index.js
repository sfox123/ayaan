import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faLeaf,
  faClipboardList,
  faCar,
  faMapMarkerAlt,
  faHeart,
  faHeadset,
  faCompass,
  faPhoneAlt, // Added for CTA
} from "@fortawesome/free-solid-svg-icons";

// Import the JSON data
import aboutUsData from "../../api/aboutUs.json"; // Adjust path as necessary
import Link from "next/link";

// Map icon names from JSON to FontAwesome icon objects
const iconMap = {
  faUsers: faUsers,
  faLeaf: faLeaf,
  faClipboardList: faClipboardList,
  faCar: faCar,
  faMapMarkerAlt: faMapMarkerAlt,
  faHeart: faHeart,
  faHeadset: faHeadset,
  faCompass: faCompass,
  faPhoneAlt: faPhoneAlt,
};

const AboutUsComponent = () => {
  const { introduction, mission, vision, whyChooseUs, conclusion } =
    aboutUsData;

  return (
    <div className="about__container">
      {/* Introduction Section */}
      <section className="about__section about__introduction">
        <h1 className="about__main-heading">About Ayaan Tours Sri Lanka</h1>
        <p className="about__text">{introduction}</p>
      </section>

      {/* Mission & Vision Section */}
      <section className="about__section about__mission-vision">
        <div className="about__mission-vision-card">
          <h2 className="about__sub-heading">{mission.title}</h2>
          <p className="about__text">{mission.description}</p>
        </div>
        <div className="about__mission-vision-card">
          <h2 className="about__sub-heading">{vision.title}</h2>
          <p className="about__text">{vision.description}</p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about__section about__why-choose-us">
        <h2 className="about__sub-heading about__center-text">
          {whyChooseUs.title}
        </h2>
        <div className="about__feature-grid">
          {whyChooseUs.features.map((feature, index) => (
            <div key={index} className="about__feature-card">
              <div className="about__feature-icon-wrapper">
                {iconMap[feature.icon] && (
                  <FontAwesomeIcon
                    icon={iconMap[feature.icon]}
                    className="about__feature-icon"
                  />
                )}
              </div>
              <h3 className="about__feature-title">{feature.title}</h3>
              <p className="about__feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion & CTA Section */}
      <section className="about__section about__conclusion">
        <p className="about__text about__center-text">{conclusion.text}</p>
        <div className="about__cta-section">
          <Link href={"/contact"} className="about__cta-button">
            <FontAwesomeIcon icon={faPhoneAlt} className="about__cta-icon" />
            {conclusion.cta}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUsComponent;
