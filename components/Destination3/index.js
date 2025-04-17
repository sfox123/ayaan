import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import tours from "../../api/tours.json";
import Image from "next/image";

const Destination3 = () => {
  var settings = {
    dots: true,
    arrows: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // Extract categories and their first tour for display
  const categories = Object.entries(tours).map(([key, value]) => ({
    category: key, // e.g., "5-day", "7-day"
    title: `${key.replace("-", " ").replace("day", "Days")}`, // Format the title
    image:
      `/images/tours/${key.replace("-", "").replace("day", "")}.png` ||
      "/default-image.jpg", // Use the first tour's image or a default image
  }));

  return (
    <div className="destination-area-2 section-padding">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="destination-text">
              <div className="wpo-section-title">
                <h2>Our Featured Tour Packages</h2>
              </div>
              <p>
                Discover the magic of Sri Lanka with our carefully curated tour
                packages—each designed to immerse you in the island’s rich Tamil
                heritage, from the towering gopurams of Jaffna’s temples to the
                serene backwaters and vibrant kolam art. Experience cultural
                performances, temple pilgrimages, wildlife safaris, and scenic
                train journeys, all set against breathtaking landscapes and
                sunset‑lit shores. Whether you seek history, adventure, or
                relaxation, our packages promise an unforgettable journey
                tailored to your dreams.
              </p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="country-r">
              <div className="country-carousel">
                <Slider {...settings}>
                  {categories.map((category, index) => (
                    <div className="item" key={index}>
                      <div className="destination-item">
                        <div className="destination-img">
                          <Image
                            src={category.image}
                            alt={category.title}
                            width={400}
                            height={300}
                          />
                        </div>
                        <div className="destination-content">
                          <div className="content-left">
                            <h5>
                              <Link
                                onClick={ClickHandler}
                                href={`/tours/${category.category}`}
                              >
                                {category.title}
                              </Link>
                            </h5>
                          </div>
                          <div className="content-right">
                            <span>Price : 40000 LKR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination3;
