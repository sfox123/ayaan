import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Breadcrumb from "../../components/breadcrumb";
import MyGallery from "../../components/gallery";

const GalleryPage = () => {
  return (
    <Fragment>
      <Navbar hclass={"wpo-header-style-3"} />
      <Breadcrumb />
      <MyGallery />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default GalleryPage;
