import React from 'react';

const HackerSkills = ({ userSkills }) => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">المهارات</h2>
          <div className="section-container mt-4">
            {userSkills.map(skill => {
              return (
                <div className="col-md-12 skill-body py-4">
                  <div className="row align-items-center skill-container">
                    <div className="col-md-4">
                      <h4 className="hacker-skill-name m-0 text-left pl-2">{skill.name}</h4>
                    </div>
                    <div className="col-md-8">
                      <div style={{ width: `${skill.rating * 10}%` }} className="progress skill-progress">
                        <p className="skill-percent">${skill.rating * 10}%</p>
                        <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                      </div>
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

export default HackerSkills;