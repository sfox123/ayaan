import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "../../api/destination";
import cities from "../../api/city";

const BlogSidebar = (props) => {
  const { title, name } = props || {};
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    if (title) {
      const filtered = data.filter(
        (item) => item.title.toLowerCase() === title.toLowerCase()
      );
      if (filtered.length > 0) {
        setDescription(filtered[0].description);
        setImg(filtered[0].blogImage);
      }
    }
  }, [title]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // Find the city that matches the title prop
  const currentCity = cities.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  return (
    <div className={`col col-lg-4 col-12 ${props.blLeft}`}>
      <div className="wpo-blog-sidebar">
        <div className="widget profile-widget">
          <div className="profile-img">
            <Image src={img} alt="" width={118} height={118} />
            <h2>{capitalizeFirstLetter(title)}</h2>
            <p>{description}</p>
          </div>
        </div>
        {currentCity && currentCity.options.length > 1 && (
          <div className="widget category-widget">
            <h3>Other Packages</h3>
            <ul>
              {currentCity.options
                .filter(
                  (option) => option.name?.toLowerCase() !== name?.toLowerCase()
                )
                .map((option) => (
                  <li key={option.id}>
                    <a
                      href={`/city-tours/${title.toLowerCase()}/${option.id}`}
                      onClick={ClickHandler}
                    >
                      {option.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSidebar;
