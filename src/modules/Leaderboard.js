import React, { useEffect, useState } from "react";
import Footer from "./Program/components/layout/Footer";
import Navbar from "./Blog/components/layout/Navbar";
import HackerNavbar from "./Blog/components/Dashboard/layout/HackerNavbar";
import ProgramNavbar from "./Program/components/layout/Navbar";
import "./Leaderboard.css";

const Leaderboard = props => {
  const token = localStorage.getItem("accessToken");
  const choseNavbar = () => {
    if (localStorage.getItem("type") === "hacker") {
      return <HackerNavbar currentPathname={props.location.pathname} />;
    } else if (localStorage.getItem("type") === "program") {
      return <ProgramNavbar currentPathname={props.location.pathname} />;
    }
  };

  return (
    <>
      {token ? choseNavbar() : <Navbar currentPathname={props.location.pathname} />}
      <div className="component-wrapper h-100">
        <div className="container-fluid home available-margin">
          <div className="container bg-second p-4">
            <div className="row mb-4">
              <div className="col-md-10 bg-black mx-auto p-2 rounded">
                <button className="btn btn-lightgreen mx-auto d-block px-4">الكل</button>
              </div>
            </div>
            <div className="leaderboard-title bg-black d-flex p-3 mb-4 rounded">
              <p className="text-lightgreen lead mr-3">الرتبة</p>
              <p className="text-lightgreen lead mr-3">الباحث</p>
              <p className="text-lightgreen lead">مجموع النقاط</p>
            </div>
            <div className="leaderboard-card py-2 px-3 rounded">
              <div className="leaderboard-user-id lead">1</div>
              <div className="leaderboard-user lead">
                <img src="https://sectigostore.com/blog/wp-content/uploads/2020/12/hacker-motivation.jpg" alt="d" />
                دينا
              </div>
              <div className="leaderboard-user-points text-warning lead">12500</div>
            </div>
            <div className="leaderboard-card mt-2 py-2 px-3 rounded">
              <div className="leaderboard-user-id lead">2</div>
              <div className="leaderboard-user lead">
                <img src="https://sectigostore.com/blog/wp-content/uploads/2020/12/hacker-motivation.jpg" alt="d" />
                أحمد
              </div>
              <div className="leaderboard-user-points text-warning lead">11500</div>
            </div>
            <div className="leaderboard-card mt-2 py-2 px-3 rounded">
              <div className="leaderboard-user-id lead">3</div>
              <div className="leaderboard-user lead">
                <img src="https://sectigostore.com/blog/wp-content/uploads/2020/12/hacker-motivation.jpg" alt="d" />
                عمرو
              </div>
              <div className="leaderboard-user-points text-warning lead">0</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboard;
