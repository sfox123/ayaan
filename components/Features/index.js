import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tours from "../../api/tours.json";

const Features = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // Extract categories from Tours
  const categories = Object.entries(Tours).map(([key, value]) => ({
    title: key.replace("-", " ").replace("day", "Days"), // Format the title
    slug: key, // Use the key as the slug
    image: `/images/tours/${key.replace("-", "").replace("day", "")}.png`,
  }));

  return (
    <div style={{ margin: "20px" }} className="featured-area featured-sub">
      <div className="container-fluid">
        <div className="row grid">
          {categories.map((category, index) => (
            <div
              className="col-lg-4 items col-md-6 col-sm-6 col-12"
              key={index}
            >
              <div className="featured-wrap">
                <div className="featured-img">
                  <Image
                    src={category.image}
                    width={500}
                    height={500}
                    alt={category.title}
                  />
                  <div className="featured-content">
                    <Link
                      onClick={ClickHandler}
                      href="/tours/[slug]"
                      as={`/tours/${category.title}`}
                    >
                      {category.title}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
