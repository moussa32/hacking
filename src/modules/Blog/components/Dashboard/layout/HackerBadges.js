import React from 'react';

import { dvbaseUrl } from "../../../../../api/Constants";



const HackerBadges = ({ userInfo }) => {
  return (
    <>
      <div class="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div class="container px-4">
          <h2 className="section-title text-right">الشعارات</h2>
          <div class="row section-container">
            {userInfo.hacker.badges.map(badge => {
              return (
                <div className="col-md-3 p-3 rounded">
                  <div className="card bg-transparent border-0">
                    <img className="card-img-top badge-img p-4 bg-white d-block mx-auto" src={`${dvbaseUrl}/${badge.image}`} alt="Card image cap" />
                    <div className="card-body p-2">
                      <h3 className="card-title badge-name my-3">{badge.name}</h3>
                      <p className="card-text badge-description">{badge.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerBadges;