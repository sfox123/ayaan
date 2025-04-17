import React, { Fragment } from "react";
import PageTitle from "../../components/pagetitle";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Destination3 from "../../components/Destination3";
import Breadcrumb from "../../components/breadcrumb";
const ToursPage = () => {
  return (
    <Fragment>
      <Navbar hclass={"wpo-header-style-3"} />
      <Breadcrumb />
      <PageTitle
        bgImage={"images/tours/bg.png"}
        pageTitle={"Tours"}
        pagesub={"Ayaan Tours"}
      />
      <Destination3 />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default ToursPage;
