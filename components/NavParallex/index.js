import React, { useEffect, useState } from "react";
import About from "../about";
import Heading from "../Heading";
import Link from "next/link";
import Image from "next/image";

const NavParallex = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const nav = document.querySelector(".nav-parallex");

    // Manage navbar background on scroll
    const handleNavBackground = () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleNavBackground);

    // ...other event listeners for hamburger, close button, etc.

    // Cleanup all listeners
    return () => {
      window.removeEventListener("scroll", handleNavBackground);
      // Remove your other event listeners here
    };
  }, []);
  useEffect(() => {
    // Get elements for parallax effect
    const text = document.getElementById("text");
    const hill1 = document.getElementById("parallex-bg-1");
    const hill2 = document.getElementById("parallex-bg-2");
    const hill3 = document.getElementById("parallex-bg-3");
    const hill4 = document.getElementById("parallex-bg-4");
    const hill5 = document.getElementById("parallex-bg-5");

    // Get navbar elements
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-navbar");

    // Create and add a close button if it doesn't already exist
    let closeButton = document.querySelector(".close-btn");
    if (!closeButton) {
      closeButton = document.createElement("button");
      closeButton.textContent = "×";
      closeButton.classList.add("close-btn");
      navMenu.prepend(closeButton);
    }

    // Open menu on hamburger click
    const openMenu = (e) => {
      e.stopPropagation();
      navMenu.classList.add("open");
      setIsSidebarOpen(true);
    };
    hamburger.addEventListener("click", openMenu);

    // Close menu on close button click
    const closeMenu = (e) => {
      e.stopPropagation();
      navMenu.classList.remove("open");
      setIsSidebarOpen(false);
    };
    closeButton.addEventListener("click", closeMenu);

    // Close menu on clicking outside
    const handleOutsideClick = (event) => {
      if (
        !navMenu.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        navMenu.classList.remove("open");
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    // Parallax scrolling effect
    const handleScroll = () => {
      let value = window.scrollY;
      if (text) {
        text.style.marginTop = value * 2.5 + "px";
        text.style.opacity = value > 300 ? "0" : "1";
        text.style.transition = "opacity 0.5s ease";
      }
      if (hill1) {
        hill1.style.top = value * -1.5 + "px";
        hill1.style.left = value * 1.5 + "px";
      }
      if (hill2) {
        hill2.style.top = value * -1.5 + "px";
        hill2.style.left = value * -1.5 + "px";
      }
      if (hill3) {
        hill3.style.top = value * 1 + "px";
        hill3.style.opacity = value > 300 ? "0" : "1";
        hill3.style.transition = "opacity 0.5s ease";
      }
      if (hill4) {
        hill4.style.left = value * -1.5 + "px";
      }
      if (hill5) {
        hill5.style.left = value * 1.5 + "px";
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners when component unmounts
    return () => {
      hamburger.removeEventListener("click", openMenu);
      closeButton.removeEventListener("click", closeMenu);
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="nav-parallex">
        <div className="nav-logo">
          <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
        </div>
        <button
          className="hamburger"
          onClick={(e) => {
            e.stopPropagation();
            setIsSidebarOpen(true);
            document.querySelector(".nav-navbar").classList.add("open");
          }}
        >
          ☰
        </button>
        <ul className={`nav-navbar ${isSidebarOpen ? "open" : ""}`}>
          <li className="nav-item">
            <Link href="#home" className="active">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link href="#destinations" className="dropdown-toggle">
              Destinations
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="/destination/kandy">Kandy City</Link>
              </li>
              <li>
                <Link href="/destination/anuradhapura">Anuradhapura</Link>
              </li>
              <li>
                <Link href="/destination/colombo">Colombo City</Link>
              </li>
              <li>
                <Link href="/destination/ella">Ella</Link>
              </li>
              <li>
                <Link href="/destination/galle">Galle</Link>
              </li>
              <li>
                <Link href="/destination/jaffna">Jaffna</Link>
              </li>
              <li>
                <Link href="/destination/pollanaruwa">Pollanaruwa</Link>
              </li>
              <li>
                <Link href="/destination/sigiriya">Sigiriya</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <Link href="#tours" className="dropdown-toggle">
              Tours
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link href="/tours/five">5 Days</Link>
              </li>
              <li>
                <Link href="/tours/seven">7 Days</Link>
              </li>
              <li>
                <Link href="/tours/nine">9 Days</Link>
              </li>
              <li>
                <Link href="/tours/fourteen">14 Days</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link href="/taxi">Taxi</Link>
          </li>
          <li className="nav-item">
            <Link href="/gallery">Gallery</Link>
          </li>
          <li className="nav-item">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <section className="parallex-section">
        <img
          src="/images/parallex/1.png"
          alt="Parallex Background one"
          id="parallex-bg-1"
        />
        <img
          src="/images/parallex/2.png"
          alt="Parallex Background two"
          id="parallex-bg-2"
        />
        <img
          src="/images/parallex/3.png"
          alt="Parallex Background three"
          id="parallex-bg-3"
        />
        <img
          src="/images/parallex/4.png"
          alt="Parallex Background four"
          id="parallex-bg-4"
        />
        <img
          src="/images/parallex/5.png"
          alt="Parallex Background five"
          id="parallex-bg-5"
        />
        <h2 className="slide-title" id="text">
          Ayaan Tours
        </h2>
      </section>
      <section className="parallex-section-2">
        <Heading color="#000" text="destinations" size="lg" />
        <About />
      </section>
    </>
  );
};

export default NavParallex;
