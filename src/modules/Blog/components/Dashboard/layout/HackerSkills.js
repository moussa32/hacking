import React from 'react';
import { fake_skills_data } from '../../../../../shared/constants/fakedata';


const HackerSkills = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">المهارات</h2>
          <div className="section-container mt-4">
            <div className="col-md-12 skill-body py-4">
              <div className="row align-items-center skill-container">
                <div className="col-md-4">
                  <h4 className="hacker-skill-name m-0 text-left pl-2">CSS</h4>
                </div>
                <div className="col-md-8">
                  <div style={{ width: '70%' }} className="progress skill-progress">
                    <p className="skill-percent">70%</p>
                    <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 skill-body py-4">
              <div className="row align-items-center skill-container">
                <div className="col-md-4">
                  <h4 className="hacker-skill-name m-0 text-left pl-2">Html</h4>
                </div>
                <div className="col-md-8">
                  <div style={{ width: '100%' }} className="progress skill-progress">
                    <p className="skill-percent">100%</p>
                    <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 skill-body py-4">
              <div className="row align-items-center skill-container">
                <div className="col-md-4">
                  <h4 className="hacker-skill-name m-0 text-left pl-2">Javascript</h4>
                </div>
                <div className="col-md-8">
                  <div style={{ width: '50%' }} className="progress skill-progress">
                    <p className="skill-percent">50%</p>
                    <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 skill-body py-4">
              <div className="row align-items-center skill-container">
                <div className="col-md-4">
                  <h4 className="hacker-skill-name m-0 text-left pl-2">VueJs</h4>
                </div>
                <div className="col-md-8">
                  <div style={{ width: '60%' }} className="progress skill-progress">
                    <p className="skill-percent">60%</p>
                    <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerSkills;