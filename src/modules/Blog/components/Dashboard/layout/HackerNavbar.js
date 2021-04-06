import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { HackerImage } from "../../../../../assets/index";




import { WhiteLogo } from "../../../../../assets/index";

const HackerNavbar = ({ currentPathname }) => {
    let { path } = useRouteMatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isDropDown, setIsDropDown] = useState(false);
    const [activeTab, setActiveTab] = useState("main");

    useEffect(() => {
        if (currentPathname.includes(`${path}/activity`)) {
            return setActiveTab("activity");
        } else if (currentPathname === `${path}/available-programs`) {
            return setActiveTab("available-programs");
        } else if (currentPathname === "/leaderboard") {
            setActiveTab(`${path}/leaderboard`);
        } else {
            return setActiveTab("main");
        }
    }, [currentPathname]);

    const toggle = () => setIsOpen(!isOpen);
    const toggleDropDown = () => setIsDropDown(!isDropDown);

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
                        className={`nav-item ${activeTab === "activity" ? "active" : ""}`}
                        id="activity"
                    >
                        <Link className="nav-link" to={`${path}/activity`}>
                            النشاط <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li
                        className={`nav-item ${activeTab === "available-programs" ? "active" : ""}`}
                        id="available-programs"
                    >
                        <Link className="nav-link" to={`${path}/available-programs`}>
                            البرامج المتاحة
            </Link>
                    </li>
                    <li
                        className={`nav-item ${activeTab === "main" ? "active" : ""}`}
                        id="main"
                    >
                        <Link className="nav-link" to={`${path}`}>
                            لوحة التحكم
            </Link>
                    </li>
                    <li
                        className={`nav-item ${activeTab === "leaderboard" ? "active" : ""}`}
                        id="leaderboard"
                    >
                        <Link className="nav-link" to={`${path}/leaderboard`}>
                            لوحة القادة
            </Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto sub-hacker-list">
                    <li className='nav-item nav-icon' id="messages">
                        <Link className="nav-link" to={`${path}/leaderboard`}>
                            <MdEmail className="text-lightgreen" size={'1.8rem'} />
                        </Link>
                    </li>
                    <li className='nav-item nav-icon' id="alerts">
                        <Link className="nav-link" to={`${path}/leaderboard`}>
                            <BsBellFill className="text-lightgreen" size={'1.5rem'} />
                        </Link>
                    </li>
                    <li className="nav-item dropdown" onClick={toggleDropDown}>
                        <button className="nav-link dropdown-toggle d-none d-sm-inline-block border-0 bg-0 bg-transparent" id="hacker-profile" data-toggle="dropdown" aria-expanded="false">
                            <img src={HackerImage} className="hacker-avatar img-fluid rounded-circle mr-1" alt="Chris Wood" />
                            <IoIosArrowDown className="text-lightgreen mr-2" size={'1.3rem'} />
                        </button>
                        <div className={`dropdown-menu ${isDropDown ? "show" : ""}`}>
                            <a className="dropdown-item" href="pages-profile.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user align-middle mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile</a>
                            <a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart align-middle mr-1"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg> Analytics</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="pages-settings.html">Settings &amp; Privacy</a>
                            <a className="dropdown-item" href="#">Help</a>
                            <a className="dropdown-item" href="#">تسجيل الخروج</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default HackerNavbar;
