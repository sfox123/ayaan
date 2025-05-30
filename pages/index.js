import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import About from "../components/about";
import Features from "../components/Features";
import Footer from "../components/footer";
import Scrollbar from "../components/scrollbar";
import Heading from "../components/Heading";
import Cider from "../components/Cider";

import TaxiBookingPage from "../components/TaxiBookingPage";
import Slider from "../components/Slider";

const HomePage = () => {
  return (
    <Fragment>
      <Navbar />
      {/* <Hero heroClass={"hero-style-1"} /> */}
      <Slider />
      <TaxiBookingPage />
      <Heading text="destinations" size="lg" />
      <About />
      <Heading text="Tours" size="lg" />
      <Features />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default HomePage;
