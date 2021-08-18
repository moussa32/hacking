import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { withRouter } from "react-router-dom";
import ActivitySearch from "./ActivityComponents/ActivitySearch.js";
import ActivityCard from "./ActivityComponents/ActivityCard";
import "./Activity.css";
import ActivityAd from "./ActivityComponents/ActivityAd";

const Activity = props => {
  const { search, setSearch } = useState("");
  const { status, setStatus } = useState({});

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <>
      <Navbar currentPathname={props.location.pathname} />
      <div className="component-wrapper">
        <div className="container-fluid available-margin home">
          <div className="row bg-second py-4">
            <div className="col-md-12">
              <h1 className="text-center">النشاط</h1>
            </div>
            <div className="col-md-8 mb-3">
              <div className="h-100">
                <ActivitySearch searchValue={search} handleSearchValue={setSearch} />
                <ActivityCard />
                <ActivityCard />
                <ActivityCard />
              </div>
            </div>
            <div className="col-md-4">
              <ActivityAd />
              <ActivityAd />
              <ActivityAd />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(Activity);
