import React from "react";
import Logo from "/public/images/logo-2.png";
import Link from "next/link";
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import MobileMenu from "../../components/MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import cities from "../../api/city"; // Import your cities array
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();

  const ClickHandler = () => {
    if (typeof window !== "undefined") {
      window.scrollTo(10, 0);
    }
  };

  const handleTaxiNavigation = React.useCallback(() => {
    if (typeof window !== "undefined" && router.pathname === "/") {
      const section = document.getElementById("taxi-booking");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", "/#taxi-booking");
        return;
      }
    }

    router.push("/#taxi-booking");
  }, [router]);

  return (
    <div className="middle-header">
      <div className={`header-style-3 ${props.hClass}`}>
        <div className="container-fluid">
          <div className="header-content">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-4">
                <div className="logo">
                  <Link onClick={ClickHandler} href="/" title="">
                    <Image src={Logo} alt="" />
                  </Link>
                </div>
              </div>
              {/* Navigation */}
              <div className="col-xl-6 col-lg-8 d-lg-block d-none">
                <nav>
                  <ul>
                    {/* Destinations */}
                    <li>
                      <Link onClick={ClickHandler} href="/destination" title="">
                        Destinations +
                      </Link>
                      <ul>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/kandy"
                            title=""
                          >
                            Kandy City
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/anuradhapura"
                            title=""
                          >
                            Anuradhapura
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/colombo"
                            title=""
                          >
                            Colombo City
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/ella"
                            title=""
                          >
                            Ella
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/galle"
                            title=""
                          >
                            Galle
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/jaffna"
                            title=""
                          >
                            Jaffna
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/pollanaruwa"
                            title=""
                          >
                            Pollanaruwa
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/sigiriya"
                            title=""
                          >
                            Sigiriya
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* Tours */}
                    <li>
                      <Link onClick={ClickHandler} href="/tours" title="">
                        Tours +
                      </Link>
                      <ul>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/tours/five"
                            title=""
                          >
                            5 Days
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/tours/seven"
                            title=""
                          >
                            7 Days
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/tours/nine"
                            title=""
                          >
                            9 Days
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/tours/fourteen"
                            title=""
                          >
                            14 Days
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* Taxi */}
                    <li>
                      <Link
                        className="brush-highlight"
                        onClick={(e) => {
                          e.preventDefault();
                          handleTaxiNavigation();
                        }}
                        href="/#taxi-booking"
                        title="Taxi Booking"
                      >
                        Taxi +
                      </Link>
                    </li>
                    {/* Gallery */}
                    <li>
                      <Link onClick={ClickHandler} href="/gallery" title="">
                        Gallery +
                      </Link>
                    </li>
                    {/* Contact */}
                    <li>
                      <Link onClick={ClickHandler} href="/contact" title="">
                        Contact +
                      </Link>
                    </li>
                    {/* City Tours - Dynamic submenu */}
                    <li>
                      <Link onClick={ClickHandler} href="#" title="">
                        City Tours +
                      </Link>
                      <ul>
                        {cities.map((city) => (
                          <li key={city.title}>
                            <h6>{city.title} +</h6>
                            <ul>
                              {city.optionName.map((optionGroup) => {
                                // Determine filter type based on the optionGroup value
                                const filterType = optionGroup
                                  .toLowerCase()
                                  .includes("city")
                                  ? "city"
                                  : "day";
                                return (
                                  <li key={optionGroup}>
                                    <h6>{optionGroup} +</h6>
                                    <ul>
                                      {city.options
                                        .filter(
                                          (opt) => opt.type === filterType
                                        )
                                        .map((opt) => (
                                          <li key={opt.id}>
                                            <Link
                                              onClick={ClickHandler}
                                              href={`/city-tours/${city.title.toLowerCase()}/${opt.id}`}
                                              title=""
                                            >
                                              {opt.name}
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <Link href="/about" title="aboutUs">
                        About +
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* WhatsApp and MobileMenu */}
              <div className="col-xl-3 get-q">
                <div className="get-quote">
                  <Link
                    href={`https://wa.me/${"+94773741989"}?text=${encodeURIComponent(
                      "Hello, I would like to inquire about your services."
                    )}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      size="xl"
                      icon={faWhatsapp}
                      style={{ marginRight: "12px" }}
                      color="green"
                    />
                    W'app : +94 77 374 1989
                  </Link>
                </div>
              </div>
              <div className="col-md-2 col-sm-2 col-2">
                <MobileMenu onTaxiNavigate={handleTaxiNavigation} />
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};

export default connect(mapStateToProps, { removeFromCart })(Header);
