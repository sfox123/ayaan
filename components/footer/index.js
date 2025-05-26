import React from "react";
import Link from "next/link";
import Logo from "/public/images/logo-white.png";
import Image from "next/image";
import Destinations from "../../api/destination";
import TaxiBooking from "../TaxiBooking";
import { useDispatch, useSelector } from "react-redux";
import { handleVisible } from "../../store/actions/action";

const Footer = (props) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.visibility.visible);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const toggleTaxiBooking = () => {
    dispatch(handleVisible(visible));
  };

  return (
    <>
      <section className={`${!visible && "hidden"} taxi-container`}>
        <TaxiBooking handleVisible={toggleTaxiBooking} />
      </section>
      <footer className="wpo-site-footer">
        <div className="wpo-upper-footer">
          <div className="wpo-footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 custom-grid">
                  <div className="logo widget-title">
                    <Image src={Logo} alt="logo" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 custom-grid">
                  <ul>
                    <li>
                      <Link
                        onClick={ClickHandler}
                        href="https://www.facebook.com/profile.php?id=61570293444568&mibextid=JRoKGi"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ti-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/">
                        <i className="ti-instagram"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-middle">
            <div className="container">
              <div className="row">
                <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="widget market-widget wpo-service-link-widget">
                    <div className="widget-title">
                      <h3>Contact </h3>
                    </div>
                    <div className="contact-ft">
                      <ul>
                        <li>
                          <i className="fi ti-location-pin"></i>32c/2 new Mosque
                          Road Udathalawinna Madige Kandy
                        </li>
                        <li>
                          <i className="fi ti-mobile"></i>+94 77 374 1989
                        </li>
                        <li>
                          <i className="fi flaticon-email"></i>
                          info@ayaantours.com
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="widget link-widget resource-widget">
                    <div className="widget-title">
                      <h3>Destination</h3>
                    </div>
                    {Destinations.map((destination, ditem) => (
                      <div className="news-wrap" key={ditem}>
                        <div className="news-text">
                          <h3>
                            <Link
                              onClick={ClickHandler}
                              href={`/destination/${destination.title.toLocaleLowerCase()}`}
                              as={`/destination/${destination.title.toLocaleLowerCase()}`}
                            >
                              {destination.title}
                            </Link>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="widget link-widget">
                    <div className="widget-title">
                      <h3>Tours</h3>
                    </div>
                    <ul>
                      <li>
                        <Link onClick={ClickHandler} href="/tours/five">
                          5 Days
                        </Link>
                      </li>
                      <li>
                        <Link onClick={ClickHandler} href="/tours/seven">
                          7 Days
                        </Link>
                      </li>
                      <li>
                        <Link onClick={ClickHandler} href="/tours/nine">
                          9 Days
                        </Link>
                      </li>
                      <li>
                        <Link onClick={ClickHandler} href="/tours/fourteen">
                          14 Days
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wpo-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col col-lg-6 col-md-6 col-12">
                <div className="term">
                  <ul>
                    <li>
                      <p onClick={ClickHandler}>Privecy Policy</p>
                    </li>
                    <li>
                      <p onClick={ClickHandler}>Terms & Condition</p>
                    </li>
                    <li>
                      <p onClick={ClickHandler}>Cookies</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-6 col-md-6 col-12">
                <p className="copyright">
                  &copy; 2025 Ayaan. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
