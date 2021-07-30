import React from "react";
import {Link} from "react-router-dom";
import {FaCogs} from "react-icons/fa";

function LeftSideBar() {
  return (
    <div className="col-1 bg-black">
      <nav className="col dbsidebar left-dbsidebar">
        <ul className="nav flex-column vertical-nav left-vertical-nav">
          <li className="nav-item settings-button rounded bg-second">
            <Link to="/program/dashboard/settings">
              <FaCogs size="2rem" className="text-lightgreen" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LeftSideBar;
