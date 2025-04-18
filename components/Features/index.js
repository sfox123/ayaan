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
    title: key.replace("-", " ").replace("day", "Days"), // e.g. "5 Days"
    image: `/images/tours/${key.replace("-", "").replace("day", "")}.png`,
  }));

  // Mapping from formatted title (lowercase) to slug
  const slugConversion = {
    "5 days": "five",
    "7 days": "seven",
    "9 days": "nine",
    "14 days": "fourteen",
  };

  return (
    <div style={{ margin: "20px" }} className="featured-area featured-sub">
      <div className="container-fluid">
        <div className="row grid">
          {categories.map((category, index) => {
            // Get the lower-case title for mapping
            const lowerTitle = category.title.toLowerCase();
            const tourSlug = slugConversion[lowerTitle] || lowerTitle;
            return (
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
                      <Link onClick={ClickHandler} href={`/tours/${tourSlug}`}>
                        {category.title}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
