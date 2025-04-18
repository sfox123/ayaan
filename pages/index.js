import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import About from "../components/about";
import VideoSection from "../components/videoSection";
import Testimonial from "../components/Testimonial";
import BlogSection from "../components/BlogSection";
import Features from "../components/Features";
import Footer from "../components/footer";
import Scrollbar from "../components/scrollbar";
import Heading from "../components/Heading";
import TaxiBooking from "../components/TaxiBooking";
import NavParallex from "../components/NavParallex";

const HomePage = () => {
  return (
    <Fragment>
      <Navbar />
      <Hero heroClass={"hero-style-1"} />
      {/* <NavParallex /> */}
      <Heading text="destinations" size="lg" />
      <About />
      <Heading text="Tours" size="lg" />
      <Features />
      <Heading text="taxi" size="lg" />
      <TaxiBooking />
      {/* <VideoSection />
      <Testimonial />
      <BlogSection /> */}
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default HomePage;
