import Link from "next/link";
import BlogSidebar from "../BlogSidebar";

import Image from "next/image";

const BlogList = (props) => {
  const { name, itenary, type, price } = props.data || {};
  const { title } = props || {};
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              <div className="post">
                <Image
                  src={`/images/blog/${title}/wall.png`}
                  width={770}
                  height={500}
                  alt=""
                  className="entry-media"
                />
                <div className="entry-details" style={{ marginTop: "24px" }}>
                  <h3>
                    {`${name} - ${type === "city" ? "City Tour" : "Day Tour"}`}
                  </h3>
                  <h2 style={{ fontWeight: 600 }}>{price} $</h2>
                  {itenary?.map((item, index) => (
                    <ul key={index} className="entry-meta">
                      <li>{item}</li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <BlogSidebar title={title} name={name} blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogList;
