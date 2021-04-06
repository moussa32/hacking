import React from 'react';

import { VscLocation } from "react-icons/vsc";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

import { HackerImage } from "../../../../../assets/index";


const HackerInfo = () => {
  return (
    <>
      <div class="jumbotron jumbotron-fluid bg-black rounded">
        <div class="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <img src={HackerImage} class="rounded-circle hacker-image rounded mx-auto d-block mb-3" alt="..." />
              <h2 className="hackerName text-white my-4">هاكر</h2>
              <p className="hackerLocation text-white lead"><VscLocation /> مصر</p>
              <p className="hackerBio text-white lead">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              <div className="row mx-auto">
                <div className="col-md-12">
                  <a href="#" className="text-lightgreen hacker-social-icons"><FaTwitterSquare size='2.5rem' /></a>
                  <a href="#" className="text-lightgreen hacker-social-icons"><FaLinkedin size='2.5rem' /></a>
                  <a href="#" className="text-lightgreen hacker-social-icons"><FaFacebookSquare size='2.5rem' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerInfo;