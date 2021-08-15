import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { handleRemoveUserToken } from "../../../actions/index";
import { getHackerNavbar } from "../../../../../api/HackerNavbarApi";
import { MdEmail } from "react-icons/md";
import { BsBellFill, BsFillGearFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { dvbaseUrl } from "../../../../../api/Constants";
import { DefaultAvatar } from "../../../../../assets/index";

import { WhiteLogo } from "../../../../../assets/index";

const HackerNavbar = props => {
  const { currentPathname } = props;
  const [navbarInfo, setNavbarInfo] = useState(null);
  const [data, setData] = useState(null);
  const [loadded, setLoadded] = useState(null);
  const [activeTab, setActiveTab] = useState("main");
  const token = localStorage.getItem("accessToken");
  const history = useHistory();

  useEffect(() => {
    if (currentPathname.includes(`dashboard/activity`)) {
      return setActiveTab("activity");
    } else if (currentPathname === `/available-programs`) {
      return setActiveTab("available-programs");
    } else if (currentPathname === "/leaderboard") {
      setActiveTab(`dashboard/leaderboard`);
    } else {
      return setActiveTab("main");
    }
  }, [currentPathname]);

  useEffect(() => {
    getHackerNavbar(token).then(res => {
      setLoadded(true);
      setNavbarInfo(res.data);
    });
  }, []);

  let handleLogout = () => {
    handleRemoveUserToken("accessToken");
    handleRemoveUserToken("type");
    handleRemoveUserToken("refreshToken");
    handleRemoveUserToken("isAuthenticated");
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark blog-nav">
      {loadded ? (
        <>
          <Link className="navbar-brand" to="/">
            <img src={WhiteLogo} width={30} height={30} alt="logo" loading="lazy" />
          </Link>
          <button className="navbar-toggler navbar-user-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav mr-auto sub-hacker-list">
            <li className="nav-item nav-icon" id="messages">
              <Link className="nav-link disabled" to="/dashboard/leaderboard">
                <MdEmail className="text-lightgreen" size={"1.8rem"} />
              </Link>
            </li>
            <li className="nav-item nav-icon" id="alerts">
              <Link className="nav-link disabled" to="/dashboard/leaderboard">
                <BsBellFill className="text-lightgreen" size={"1.5rem"} />
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle d-sm-inline-block border-0 bg-transparent" id="hacker-profile" data-toggle="dropdown" aria-expanded="false">
                <img src={navbarInfo !== null && navbarInfo.hacker.avater !== null ? `${dvbaseUrl}/${navbarInfo.hacker.avater}` : `${DefaultAvatar}`} className="hacker-avatar img-fluid rounded-circle mr-1" alt={navbarInfo !== null && navbarInfo.username ? navbarInfo.username : "مخترق"} />
                <IoIosArrowDown className="text-lightgreen mr-2" size={"1.3rem"} />
              </button>
              <div className={`dropdown-menu text-right ml-3`}>
                <a className="dropdown-item hacker-options disabled" href="pages-profile.html">
                  <FaUserAlt className="ml-2" /> الصفحة الشخصية
                </a>
                <a className="dropdown-item hacker-options" href="/dashboard/settings">
                  <BsFillGearFill className="ml-2" /> الإعدادات
                </a>
                <button onClick={handleLogout} className="dropdown-item hacker-options border-0 bg-transparent" href="/#">
                  <FaSignOutAlt className="ml-2" />
                  تسجيل الخروج
                </button>
              </div>
            </li>
          </ul>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className={`nav-item ${activeTab === "activity" ? "active" : ""}`} id="activity">
                <Link className="nav-link disabled" to="/dashboard/activity">
                  النشاط <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "available-programs" ? "active" : ""}`} id="available-programs">
                <Link className="nav-link" to={`/available-programs`}>
                  البرامج المتاحة
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "main" ? "active" : ""}`} id="main">
                <Link className="nav-link" to="/dashboard">
                  لوحة التحكم
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "leaderboard" ? "active" : ""}`} id="leaderboard">
                <Link className="nav-link disabled" to="/dashboard/leaderboard">
                  لوحة القادة
                </Link>
              </li>
              <li className={`nav-item ${activeTab === "" ? "active" : ""}`} id="">
                <Link className="nav-link disabled" to="/">
                  التسليمات
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </nav>
  );
};

export default HackerNavbar;
