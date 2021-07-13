import React from 'react';
import { connect } from 'react-redux';

import { dvbaseUrl } from "../../../../../api/Constants";
import { GiRank3 } from 'react-icons/gi';


const HackerBadges = ({ badges }) => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">{badges.length === 0 ? ('') : (<GiRank3 className="section-icon mb-0" size={"3rem"} />)}الشعارات</h2>
          {badges.length === 0 ? (<><GiRank3 className="mt-4" size={"4rem"} /><p className="mt-4 lead mb-0">ليس لديك اي شعارات بعد</p></>) : (
            <div className="row section-container">{
              badges.map(badge => {
                return (
                  <div className="col-md-4 p-3 rounded">
                    <div className="card bg-transparent border-0">
                      <img className="card-img-top badge-img p-0 d-block mx-auto" src={`${dvbaseUrl}/${badge.image}`} alt="Card image cap" />
                      <div className="card-body p-2">
                        <h3 className="card-title badge-name my-3">{badge.name}</h3>
                        <p className="card-text badge-description">{badge.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </div>)}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ blogs }) => {
  return {
    badges: blogs.userInfo.hacker.badges,
  };
}

export default connect(mapStateToProps)(HackerBadges);