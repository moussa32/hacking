import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { WhiteLogo } from "../../../../../assets/index";

const HackerNavbar = ({ currentPathname }) => {
    let { path } = useRouteMatch();

    const [isOpen, setIsOpen] = useState(false);
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
                <ul className="navbar-nav mr-auto">
                </ul>
            </div>
        </nav>
    );
};

export default HackerNavbar;
