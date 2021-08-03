import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { BsBellFill, BsFillGearFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { DefaultAvatar } from "../../../../assets/index";
import { dvbaseUrl } from "../../../../api/Constants";
import { getProgramNavbar } from "../../../../api/ProgramAPI/ProgramNavbarApi";

import { WhiteLogo } from "../../../../assets/index";
import { getNewTokens } from "../../../../api/RefreshTokenApi";

const Navbar = ({ currentPathname }) => {
  let match = useRouteMatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("main");
  const [navbarInfo, setNavbarInfo] = useState({ program: {} });

  useEffect(() => {
    if (currentPathname.includes("/program/dashboard/activity")) {
      return setActiveTab("activity");
    } else if (currentPathname === "/available-programs") {
      return setActiveTab("available-programs");
    } else if (currentPathname === "/program/dashboard/leaderboard") {
      setActiveTab("leaderboard");
    } else {
      return setActiveTab("main");
    }
  }, [currentPathname]);

  useEffect(() => {
    getProgramNavbar(localStorage.getItem("accessToken"))
      .then(res => {
        setNavbarInfo(res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        } else if (error.response.status === 403) {
          setNavbarInfo(null);
        }
      });
  }, []);

  let handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("type");
    history.push("/login");
  };

  return (
    <>
      {navbarInfo ? (
        <nav className="navbar navbar-expand-lg navbar-dark blog-nav">
          <Link className="navbar-brand" to="/">
            <img src={WhiteLogo} width={30} height={30} alt="logo" loading="lazy" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className={`nav-item ${activeTab === "activity" ? "active" : ""}`} id="activity">
                <Link className="nav-link disabled" to="/program/dashboard/activity">
                  النشاط <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "available-programs" ? "active" : ""}`} id="available-programs">
                <Link className="nav-link" to="/available-programs">
                  البرامج المتاحة
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "main" ? "active" : ""}`} id="main">
                <Link className="nav-link" to="/program/dashboard">
                  لوحة التحكم
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "leaderboard" ? "active" : ""}`} id="leaderboard" disabled>
                <Link className="nav-link disabled" to="/program/dashboard/leaderboard">
                  لوحة القادة
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "" ? "active" : ""}`} id="deliverables" disabled>
                <Link className="nav-link disabled" to={`${match.path}/`}>
                  التسليمات
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto sub-hacker-list">
              <li className="nav-item nav-icon" id="messages">
                <Link className="nav-link disabled" to={`${match.path}/leaderboard`}>
                  <MdEmail className="text-lightgreen" size={"1.8rem"} />
                </Link>
              </li>
              <li className="nav-item nav-icon" id="alerts">
                <Link className="nav-link disabled" to={`${match.path}/leaderboard`}>
                  <BsBellFill className="text-lightgreen" size={"1.5rem"} />
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle d-none d-sm-inline-block border-0 bg-transparent" id="hacker-profile" data-toggle="dropdown" aria-expanded="false">
                  <img src={navbarInfo.program && navbarInfo.program.logo !== null ? `${dvbaseUrl}/${navbarInfo.program.logo}` : DefaultAvatar} className="hacker-avatar img-fluid rounded-circle mr-1" alt={navbarInfo && navbarInfo.program !== null ? navbarInfo.program.username : "User image"} />
                  <IoIosArrowDown className="text-lightgreen mr-2" size={"1.3rem"} />
                </button>
                <div className={`dropdown-menu text-right ml-3`}>
                  <a className="dropdown-item hacker-options disabled" href="pages-profile.html">
                    <FaUserAlt className="ml-2" /> الصفحة الشخصية
                  </a>
                  <a className="dropdown-item hacker-options" href={`/program/dashboard/settings`}>
                    <BsFillGearFill className="ml-2" /> الإعدادات
                  </a>
                  <button onClick={handleLogout} className="dropdown-item hacker-options border-0 bg-transparent" href="#">
                    <FaSignOutAlt className="ml-2" />
                    تسجيل الخروج
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
