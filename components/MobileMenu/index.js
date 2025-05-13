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
  {
    id: 6,
    title: "City Tours",
    link: "/city-tours",
  },
];

export default class MobileMenu extends Component {
  state = {
    isMenuShow: false,
    openIds: [], // holds IDs of open items; can be numbers or strings (e.g., city title or "cityTitle-optionGroup")
  };

  menuHandler = () => {
    this.setState({
      isMenuShow: !this.state.isMenuShow,
    });
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
    // Optionally, close the menu on navigation
    this.setState({ isMenuShow: false });
  };

  // Render regular menu items recursively
  renderMenu = (items) => {
    const { openIds } = this.state;
    return (
      <ul>
        {items.map((item) => {
          if (item.title === "City Tours") {
            // Render dynamic City Tours submenu
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
          } else if (item.submenu) {
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
          } else {
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

  // Render City Tours dynamically using cities from the API
  renderCityTours = () => {
    const { openIds } = this.state;
    return (
      <ul>
        {cities.map((city) => {
          const isCityOpen = openIds.includes(city.title);
          return (
            <li key={city.title}>
              <p onClick={() => this.toggleOpen(city.title)}>
                {city.title} +
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </p>
              <Collapse isOpen={isCityOpen}>
                <Card>
                  <CardBody>
                    <ul>
                      {city.optionName.map((optionGroup) => {
                        // Determine filter type based on the optionGroup value
                        const filterType = optionGroup
                          .toLowerCase()
                          .includes("city")
                          ? "city"
                          : "day";
                        // Create a unique key for the group toggle (e.g., "Kandy City-Tour")
                        const groupKey = `${city.title}-${optionGroup}`;
                        const isGroupOpen = openIds.includes(groupKey);
                        return (
                          <li key={optionGroup}>
                            <p onClick={() => this.toggleOpen(groupKey)}>
                              {optionGroup} +
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
