import Link from "next/link";
import BlogSidebar from "../BlogSidebar";

import Image from "next/image";

const BlogList = (props) => {
  const { name, itenary, type, price, id } = props.data || {};
  const { title } = props || {};

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              <div className="post">
                <Image
                  src={`/images/blog/${title}/${id}.png`}
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
