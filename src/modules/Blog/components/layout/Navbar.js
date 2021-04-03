import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { WhiteLogo } from "../../../../assets/index";

const Navbar = ({ currentPathname }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (currentPathname.includes("/blog")) {
      return setActiveTab("blog");
    } else if (currentPathname === "/about-us") {
      return setActiveTab("about-us");
    } else if (currentPathname === "/contact-us") {
      setActiveTab("contact-us");
    } else if (currentPathname === "/login") {
      setActiveTab("login");
    } else {
      return setActiveTab("home");
    }
  }, [currentPathname]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark blog-nav">
      <Link className="navbar-brand" to="/">
        <img src={WhiteLogo} width={30} height={30} alt="logo" loading="lazy" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNav"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <ul className="navbar-nav">
          <li
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            id="home"
          >
            <Link className="nav-link" to="/">
              الرئيسية <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li
            className={`nav-item ${activeTab === "blog" ? "active" : ""}`}
            id="blog"
          >
            <Link className="nav-link" to="/blog">
              المدونة
            </Link>
          </li>
          <li
            className={`nav-item ${activeTab === "about-us" ? "active" : ""}`}
            id="about-us"
          >
            <Link className="nav-link" to="/about-us">
              من نحن
            </Link>
          </li>
          <li
            className={`nav-item ${activeTab === "contact-us" ? "active" : ""}`}
            id="contact-us"
          >
            <Link className="nav-link" to="/contact-us">
              اتصل بنا
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${activeTab === "login" ? "active" : ""}`}
            id="login"
          >
            <Link className="nav-link" to="/login">
              تسجيل الدخول
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
