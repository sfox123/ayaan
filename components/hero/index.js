import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = (props) => {
  var settings = {
    dots: true,
    arrows: false,
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
          <div className="slide">
            <div
              className="slide-inner"
              style={{
                "--bg-image": `url("/images/slider/1.jpg")`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                    <div className="slide-title">
                      <h2>Ayaan Tours</h2>
                    </div>
                    <div className="slide-subtitle">
                      <p>
                        Make Your Life Better and Bright! You must trip with Us!
                      </p>
                    </div>
                    <div className="btns">
                      <Link href="/contact" className="theme-btn">
                        Book A Trip
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div
              className="slide-inner"
              style={{
                "--bg-image": `url("/images/slider/2.jpg")`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                    <div className="slide-title">
                      <h2>Sri Lanka</h2>
                    </div>
                    <div className="slide-subtitle">
                      <p>World's Top 20 Must visit Country</p>
                    </div>
                    <div className="btns">
                      <Link href="/contact" className="theme-btn">
                        Book A Trip
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div
              className="slide-inner"
              style={{
                "--bg-image": `url("/images/slider/3.jpg")`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col col-lg-8 col-md-12 col-12 slide-caption">
                    <div className="slide-title">
                      <h2>Ayaan Tours</h2>
                    </div>
                    <div className="slide-subtitle">
                      <p>
                        Will Make everything easy for you! You just need to
                        enjoy!
                      </p>
                    </div>
                    <div className="btns">
                      <Link href="/contact" className="theme-btn">
                        Book A Trip
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};
export default Hero;
