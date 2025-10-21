import React, { Component } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import Link from "next/link";
import cities from "../../api/city";

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
    link: "/#taxi-booking",
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
  {
    id: 6,
    title: "City Tours",
    link: "#",
  },
  {
    id: 7,
    title: "About Us",
    link: "/about",
  },
];

export default class MobileMenu extends Component {
  state = {
    isMenuShow: false,
    openIds: [], // holds IDs (or titles/groupKeys) of open items
  };

  menuHandler = () => {
    this.setState({ isMenuShow: !this.state.isMenuShow });
  };

  toggleOpen = (id) => {
    this.setState((prevState) => {
      const { openIds } = prevState;
      return {
        openIds: openIds.includes(id)
          ? openIds.filter((item) => item !== id)
          : [...openIds, id],
      };
    });
  };

  ClickHandler = () => {
    window.scrollTo(10, 0);
    this.setState({ isMenuShow: false });
  };

  handleTaxiLinkClick = (e, link) => {
    e.preventDefault();

    this.setState({ isMenuShow: false }, () => {
      if (this.props.onTaxiNavigate) {
        this.props.onTaxiNavigate();
      } else if (typeof window !== "undefined") {
        window.location.href = link;
      }
    });
  };

  /**
   * Renders a list of menu items.
   * If an item is "Taxi", it scrolls/navigates to the booking section.
   * If an item has a submenu, it toggles Collapse.
   * If an item is "City Tours", it renders the dynamic city tours submenu.
   */
  renderMenu = (items) => {
    const { openIds } = this.state;

    return (
      <ul>
        {items.map((item) => {
          // 1) City Tours parent branch
          if (item.title === "City Tours") {
            return (
              <li key={item.id}>
                <p onClick={() => this.toggleOpen(item.id)}>
                  {item.title}{" "}
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </p>
                <Collapse isOpen={openIds.includes(item.id)}>
                  <Card>
                    <CardBody>{this.renderCityTours()}</CardBody>
                  </Card>
                </Collapse>
              </li>
            );
          }
          // 2) Any item with a static submenu (like Destinations, Tours)
          else if (item.submenu) {
            return (
              <li key={item.id}>
                <p onClick={() => this.toggleOpen(item.id)}>
                  {item.title}{" "}
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </p>
                <Collapse isOpen={openIds.includes(item.id)}>
                  <Card>
                    <CardBody>{this.renderMenu(item.submenu)}</CardBody>
                  </Card>
                </Collapse>
              </li>
            );
          }
          // 3) The Taxi item: trigger smooth scroll/navigation
          else if (item.title === "Taxi") {
            return (
              <li key={item.id}>
                <Link
                  style={{ backgroundColor: "orange" }}
                  href={item.link}
                  onClick={(e) => this.handleTaxiLinkClick(e, item.link)}
                >
                  {item.title}
                </Link>
              </li>
            );
          }
          // 4) All other leaf‐node items: just a normal Link + ClickHandler to scroll & close menu
          else {
            return (
              <li key={item.id}>
                <Link onClick={this.ClickHandler} href={item.link}>
                  {item.title}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    );
  };

  /**
   * Renders the dynamic "City Tours" submenu based on the `cities` API import.
   * Each city title toggles its own Collapse. Then each option group toggles nested Collapse,
   * and finally filters the city.options array by either "city" or "day" before rendering Links.
   */
  renderCityTours = () => {
    const { openIds } = this.state;
    return (
      <ul>
        {cities.map((city) => {
          const isCityOpen = openIds.includes(city.title);
          return (
            <li key={city.title}>
              <p onClick={() => this.toggleOpen(city.title)}>
                {city.title}{" "}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </p>
              <Collapse isOpen={isCityOpen}>
                <Card>
                  <CardBody>
                    <ul>
                      {city.optionName.map((optionGroup) => {
                        // Determine filterType based on presence of "city" in the optionGroup string
                        const filterType = optionGroup
                          .toLowerCase()
                          .includes("city")
                          ? "city"
                          : "day";
                        // Use a composite key for toggling this group
                        const groupKey = `${city.title}-${optionGroup}`;
                        const isGroupOpen = openIds.includes(groupKey);

                        return (
                          <li key={optionGroup}>
                            <p onClick={() => this.toggleOpen(groupKey)}>
                              {optionGroup}{" "}
                              <i
                                className="fa fa-angle-right"
                                aria-hidden="true"
                              ></i>
                            </p>
                            <Collapse isOpen={isGroupOpen}>
                              <Card>
                                <CardBody>
                                  <ul>
                                    {city.options
                                      .filter((opt) => opt.type === filterType)
                                      .map((opt) => (
                                        <li key={opt.id}>
                                          <Link
                                            onClick={this.ClickHandler}
                                            href={`/city-tours/${city.title.toLowerCase()}/${opt.id}`}
                                          >
                                            {opt.name}
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                </CardBody>
                              </Card>
                            </Collapse>
                          </li>
                        );
                      })}
                    </ul>
                  </CardBody>
                </Card>
              </Collapse>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { isMenuShow } = this.state;
    return (
      <div>
        <div className={`mobileMenu ${isMenuShow ? "show" : ""}`}>
          <div className="menu-close" onClick={this.menuHandler}>
            <i className="fi ti-close"></i>
          </div>
          <div className="responsivemenu">{this.renderMenu(menus)}</div>
        </div>
        <div className="showmenu" onClick={this.menuHandler}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}
