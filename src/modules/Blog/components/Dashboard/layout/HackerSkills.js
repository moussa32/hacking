import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GiSkills } from "react-icons/gi";

const HackerSkills = ({ skills }) => {
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    let avaSkills = [];
    skills.map(skill => {
      if (skill.rating !== 0) {
        avaSkills.push(skill);
      }
      setAvailableSkills(avaSkills);
    });
  }, []);

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">{skills.length < 0 ? "" : <GiSkills className="section-icon mb-1 ml-2" size={"2rem"} />}المهارات</h2>
          <div className="section-container mt-4">
            {availableSkills.length > 0 ? (
              availableSkills.map((availableSkill, index) => {
                return (
                  <div key={index} className="col-md-12 skill-body py-4">
                    <div className="row align-items-center skill-container">
                      <div className="col-md-4">
                        <h4 className="hacker-skill-name m-0 text-left pl-2">{availableSkill.name}</h4>
                      </div>
                      <div className="col-md-8">
                        <div style={{ width: `${availableSkill.rating * 10}%` }} className="progress skill-progress">
                          <p className="skill-percent">{availableSkill.rating * 10}%</p>
                          <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <GiSkills className="mt-4" size={"4rem"} />
                <p className="mt-4 lead mb-0">أضف بعض المهارات</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ blogs }) => {
  return {
    skills: blogs.userInfo.hacker.skills,
  };
};

export default connect(mapStateToProps)(HackerSkills);
