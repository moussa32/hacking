import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { handleRemoveUserToken } from '../../../actions/index';
import { MdEmail } from "react-icons/md";
import { BsBellFill, BsFillGearFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserAlt, FaSignOutAlt, FaBuromobelexperte } from "react-icons/fa";
import { getHackerInfo } from '../../../../../api/DashboardApi';
import { getNewTokens } from '../../../../../api/RefreshTokenApi';
import { dvbaseUrl } from '../../../../../api/Constants';
import { handleGetUserToken } from '../../../actions/index';

import { WhiteLogo } from "../../../../../assets/index";

const HackerNavbar = ({ currentPathname }) => {
  let match = useRouteMatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isLoadded, setIsLoadded] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const [hackerInfo, setHackerInfo] = useState({});
  const token = handleGetUserToken('accessToken');
  const reFreshtoken = handleGetUserToken('refreshToken');
  const hackerInformation = getHackerInfo(token);

  useEffect(() => {
    if (currentPathname.includes(`${match.path}/activity`)) {
      return setActiveTab("activity");
    } else if (currentPathname === `${match.path}/available-programs`) {
      return setActiveTab("available-programs");
    } else if (currentPathname === "/leaderboard") {
      setActiveTab(`${match.path}/leaderboard`);
    } else {
      return setActiveTab("main");
    }
  }, [currentPathname]);

  useEffect(() => {
    hackerInformation
      .then(item => {
        setHackerInfo(item.data);
        setIsLoadded(true);
      }).catch((erorr) => {
        if (erorr.response.status == 401) {
          getNewTokens(reFreshtoken);
        }
      })
  }, [])

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropDown = () => setIsDropDown(!isDropDown);

  let handleLogout = () => {
    handleRemoveUserToken('accessToken');
    history.push("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark blog-nav">
      {isLoadded ? (
        <>
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
                className={`nav-item ${activeTab === "activity" ? "active" : ""}`}
                id="activity"
              >
                <Link className="nav-link" to={`${match.path}/activity`}>
                  النشاط <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item ${activeTab === "available-programs" ? "active" : ""}`}
                id="available-programs"
              >
                <Link className="nav-link" to={`${match.path}/available-programs`}>
                  البرامج المتاحة
            </Link>
              </li>
              <li
                className={`nav-item ${activeTab === "main" ? "active" : ""}`}
                id="main"
              >
                <Link className="nav-link" to={`${match.path}`}>
                  لوحة التحكم
            </Link>
              </li>
              <li
                className={`nav-item ${activeTab === "leaderboard" ? "active" : ""}`}
                id="leaderboard"
              >
                <Link className="nav-link" to={`${match.path}/leaderboard`}>
                  لوحة القادة
            </Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto sub-hacker-list">
              <li className='nav-item nav-icon' id="messages">
                <Link className="nav-link" to={`${match.path}/leaderboard`}>
                  <MdEmail className="text-lightgreen" size={'1.8rem'} />
                </Link>
              </li>
              <li className='nav-item nav-icon' id="alerts">
                <Link className="nav-link" to={`${match.path}/leaderboard`}>
                  <BsBellFill className="text-lightgreen" size={'1.5rem'} />
                </Link>
              </li>
              <li className="nav-item dropdown" onClick={toggleDropDown}>
                <button className="nav-link dropdown-toggle d-none d-sm-inline-block border-0 bg-transparent" id="hacker-profile" data-toggle="dropdown" aria-expanded="false">
                  <img src={`${dvbaseUrl}/${hackerInfo.hacker.avater}`} className="hacker-avatar img-fluid rounded-circle mr-1" alt="Chris Wood" />
                  <IoIosArrowDown className="text-lightgreen mr-2" size={'1.3rem'} />
                </button>
                <div className={`dropdown-menu ${isDropDown ? "show" : ""} text-right ml-3`}>
                  <a className="dropdown-item hacker-options" href="pages-profile.html"><FaUserAlt className="ml-2" /> الصفحة الشخصية</a>
                  <a className="dropdown-item hacker-options" href="pages-profile.html"><BsFillGearFill className="ml-2" /> الإعدادات</a>
                  <button onClick={handleLogout} className="dropdown-item hacker-options border-0 bg-transparent" href="#"><FaSignOutAlt className="ml-2" />تسجيل الخروج</button>
                </div>
              </li>
            </ul>
          </div>
        </>
      ) : ('')}
    </nav>
  );
};

export default HackerNavbar;
