import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import About from "../components/about";
import Destination from "../components/Destination";
import VideoSection from "../components/videoSection";
import Testimonial from "../components/Testimonial";
import BlogSection from "../components/BlogSection";
import Footer from "../components/footer";
import Scrollbar from "../components/scrollbar";
import Heading from "../components/Heading";
import TaxiBooking from "../components/taxi";

const HomePage = () => {
  return (
    <Fragment>
      <Navbar />
      <Hero heroClass={"hero-style-1"} />
      <Heading text="destinations" size="lg" />
      <About />
      <Destination />
      <Heading text="taxi" size="lg" />
      <TaxiBooking />
      <VideoSection />
      <Testimonial />
      <BlogSection />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default HomePage;
