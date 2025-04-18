import React, { Component } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import Link from "next/link";

const menus = [
  {
    id: 1,
    title: "Destinations",
    link: "/destination",
    submenu: [
      { id: 11, title: "Kandy City", link: "/destination/kandy" },
      { id: 12, title: "Anuradhapura", link: "/destination/anuradhapura" },
      { id: 13, title: "Colombo City", link: "/destination/colombo" },
      { id: 14, title: "Ella", link: "/destination/ella" },
      { id: 15, title: "Galle", link: "/destination/galle" },
      { id: 16, title: "Jaffna", link: "/destination/jaffna" },
      { id: 17, title: "Pollanaruwa", link: "/destination/pollanaruwa" },
      { id: 18, title: "Sigiriya", link: "/destination/sigiriya" },
    ],
  },
  {
    id: 2,
    title: "Tours",
    link: "/tours",
    submenu: [
      { id: 21, title: "5 Days", link: "/tours/five" },
      { id: 22, title: "7 Days", link: "/tours/seven" },
      { id: 23, title: "9 Days", link: "/tours/nine" },
      { id: 24, title: "14 Days", link: "/tours/fourteen" },
    ],
  },
  {
    id: 3,
    title: "Taxi",
    link: "/taxi",
  },
  {
    id: 4,
    title: "Gallery",
    link: "/gallery",
  },
  {
    id: 5,
    title: "Contact",
    link: "/contact",
  },
];

export default class MobileMenu extends Component {
  state = {
    isMenuShow: false,
    isOpen: 0,
  };

  menuHandler = () => {
    this.setState({
      isMenuShow: !this.state.isMenuShow,
    });
  };

  setIsOpen = (id) => () => {
    this.setState({
      isOpen: id === this.state.isOpen ? 0 : id,
    });
  };

  ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  render() {
    const { isMenuShow, isOpen } = this.state;
    return (
      <div>
        <div className={`mobileMenu ${isMenuShow ? "show" : ""}`}>
          <div className="menu-close" onClick={this.menuHandler}>
            <i className="fi ti-close"></i>
          </div>
          <ul className="responsivemenu">
            {menus.map((item) => (
              <li key={item.id}>
                {item.submenu ? (
                  <>
                    <p onClick={this.setIsOpen(item.id)}>
                      {item.title}{" "}
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </p>
                    <Collapse isOpen={item.id === isOpen}>
                      <Card>
                        <CardBody>
                          <ul>
                            {item.submenu.map((submenu) => (
                              <li key={submenu.id}>
                                <Link
                                  onClick={this.ClickHandler}
                                  href={submenu.link}
                                >
                                  {submenu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </>
                ) : (
                  <Link onClick={this.ClickHandler} href={item.link}>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="showmenu" onClick={this.menuHandler}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}
