import React, {useState, useEffect} from "react";
import {Link, useRouteMatch, useHistory} from "react-router-dom";
import axios from "axios";
import {MdEmail} from "react-icons/md";
import {BsBellFill, BsFillGearFill} from "react-icons/bs";
import {IoIosArrowDown} from "react-icons/io";
import {FaUserAlt, FaSignOutAlt} from "react-icons/fa";
import {DefaultAvatar} from "../../../../assets/index";
import {dvbaseUrl, dvApiUrl} from "../../../../api/Constants";

import {WhiteLogo} from "../../../../assets/index";

const Navbar = ({currentPathname, companyName, companyLogo}) => {
  let match = useRouteMatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("main");
  const [navbarInfo, setNavbarInfo] = useState({program: {}});

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
    axios
      .get(`${dvApiUrl}/programs/navbar/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setNavbarInfo(res.data);
      });
  }, []);

  let handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
                <Link className="nav-link" to="/program/dashboard/activity">
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
              <li className={`nav-item ${activeTab === "leaderboard" ? "active" : ""}`} id="leaderboard">
                <Link className="nav-link" to="/program/dashboard/leaderboard">
                  لوحة القادة
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "" ? "active" : ""}`} id="">
                <Link className="nav-link" to={`${match.path}/`}>
                  التسليمات
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto sub-hacker-list">
              <li className="nav-item nav-icon" id="messages">
                <Link className="nav-link" to={`${match.path}/leaderboard`}>
                  <MdEmail className="text-lightgreen" size={"1.8rem"} />
                </Link>
              </li>
              <li className="nav-item nav-icon" id="alerts">
                <Link className="nav-link" to={`${match.path}/leaderboard`}>
                  <BsBellFill className="text-lightgreen" size={"1.5rem"} />
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle d-none d-sm-inline-block border-0 bg-transparent" id="hacker-profile" data-toggle="dropdown" aria-expanded="false">
                  <img src={navbarInfo && navbarInfo.program !== null ? `${dvbaseUrl}/${navbarInfo.program.logo}` : DefaultAvatar} className="hacker-avatar img-fluid rounded-circle mr-1" alt={navbarInfo ? navbarInfo.program !== null : "User Image"} />
                  <IoIosArrowDown className="text-lightgreen mr-2" size={"1.3rem"} />
                </button>
                <div className={`dropdown-menu text-right ml-3`}>
                  <a className="dropdown-item hacker-options" href="pages-profile.html">
                    <FaUserAlt className="ml-2" /> الصفحة الشخصية
                  </a>
                  <a className="dropdown-item hacker-options" href="pages-profile.html">
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
