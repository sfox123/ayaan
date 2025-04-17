import React, { useState } from "react";
import Logo from "/public/images/logo-2.png";
import Link from "next/link";
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import MobileMenu from "../../components/MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Header = (props) => {
  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { carts } = props;

  return (
    <div className="middle-header">
      <div className={`header-style-3 ${props.hClass}`}>
        <div className="container-fluid">
          <div className="header-content">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-4">
                <div className="logo">
                  <Link onClick={ClickHandler} href="/" title="">
                    <Image src={Logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-8 d-lg-block d-none">
                <nav>
                  <ul>
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
                            href="/destination/Colombo"
                            title=""
                          >
                            Colombo City
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/Ella"
                            title=""
                          >
                            Ella
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/Galle"
                            title=""
                          >
                            Galle
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/Jaffna"
                            title=""
                          >
                            Jaffna
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/Pollanaruwa"
                            title=""
                          >
                            Pollanaruwa
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            href="/destination/Sigiriya"
                            title=""
                          >
                            Sigiriya
                          </Link>
                        </li>
                      </ul>
                    </li>
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
                    <li>
                      <Link onClick={ClickHandler} href="/taxi" title="">
                        Taxi +
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/gallery" title="">
                        Gallery +
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/contact" title="">
                        Contact +
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
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
                <MobileMenu />
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
