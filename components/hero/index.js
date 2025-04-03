import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = (props) => {
  var settings = {
    dots: true,
    arrows: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
  };
  return (
    <section className={`hero ${props.heroClass}`}>
      <div className="hero-slider">
        <Slider {...settings}>
          <div className="slide-inner">
            <video autoPlay loop muted playsInline className="video-background">
              <source src="/videos/wall.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="container">
              <div className="row">
                <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                  {/* <div className="btns">
                    <Link href="/room" className="theme-btn">
                      Book A Room
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="slide">
            <div className="slide-inner">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="video-background"
              >
                <source src="/videos/wall_sig.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="container">
                <div className="row">
                  <div className="col col-lg-8 col-md-12 col-12 slide-caption">

                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="slide">
            <div className="slide-inner">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="video-background"
              >
                <source src="/videos/wall_sig.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="container">
                <div className="row">
                  <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </Slider>
      </div>
    </section>
  );
};
export default Hero;
