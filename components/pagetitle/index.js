import React from "react";
import Link from "next/link";

const PageTitle = (props) => {
  const { pageTitle, pagesub, bgImage } = props;

  return (
    <section
      className="page-title"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></section>
  );
};

export default PageTitle;
