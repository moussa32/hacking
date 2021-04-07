import React from 'react';

import { Patient } from "../../../../../assets/index";
import { Greybeard } from "../../../../../assets/index";
import { Streaker } from "../../../../../assets/index";
import { Insecticide } from "../../../../../assets/index";


const HackerBadges = () => {
  return (
    <>
      <div class="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div class="container px-4">
          <h2 className="section-title text-right">الشعارات</h2>
          <div class="row section-container">
            <div className="col-md-3 p-3 rounded">
              <div className="card bg-transparent border-0">
                <img className="card-img-top badge-img p-4 bg-white d-block mx-auto" src={Insecticide} alt="Card image cap" />
                <div className="card-body p-2">
                  <h3 className="card-title badge-name my-3">Insecticide</h3>
                  <p className="card-text badge-description">Fity reports closed as resolved</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 p-3 rounded">
              <div className="card bg-transparent border-0">
                <img className="card-img-top badge-img p-4 bg-white d-block mx-auto" src={Patient} alt="Card image cap" />
                <div className="card-body p-2">
                  <h3 className="card-title badge-name my-3">Streaker</h3>
                  <p className="card-text badge-description">Ten reports in a row were closed as resolved</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 p-3 rounded">
              <div className="card bg-transparent border-0">
                <img className="card-img-top badge-img p-4 bg-white d-block mx-auto" src={Greybeard} alt="Card image cap" />
                <div className="card-body p-2">
                  <h3 className="card-title badge-name my-3">Greybeard</h3>
                  <p className="card-text badge-description">Submitied valid reports 3 months in a row</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 p-3 rounded">
              <div className="card bg-transparent border-0">
                <img className="card-img-top badge-img p-4 bg-white d-block mx-auto" src={Streaker} alt="Card image cap" />
                <div className="card-body p-2">
                  <h3 className="card-title badge-name my-3">Insecticide</h3>
                  <p className="card-text badge-description">Fity reports closed as resolved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerBadges;