import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import AboutUsComponent from "../../components/AboutUsComponent";
const AboutPage = () => {
  return (
    <Fragment>
      <Navbar />
      <AboutUsComponent />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default AboutPage;
