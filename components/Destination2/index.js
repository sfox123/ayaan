import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Destinations from "../../api/destination";
import Image from "next/image";

const Destination2 = () => {
  var settings = {
    dots: false,
    arrows: false,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
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

  return (
    <div className="destination-service section-padding">
      <div
        className="container"
        style={{ padding: "0 15px", margin: "0 20px" }}
      >
        <div className="destination-carousel">
          <Slider {...settings}>
            {Destinations.slice(0, 4).map((destination, ditem) => (
              <div className="item" key={ditem}>
                <div className="destination-item">
                  <div className="destination-img">
                    <Image
                      width={500}
                      height={500}
                      src={destination.img}
                      alt={destination}
                    />
                  </div>
                  <div className="destination-content">
                    <div className="content-left">
                      <h5>
                        <Link
                          onClick={ClickHandler}
                          href={`/destination/${destination.title.toLowerCase()}`}
                          as={`/destination/${destination.title.toLowerCase()}`}
                        >
                          {destination.title}
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Destination2;
