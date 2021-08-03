import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactRating from "react-rating";
import { getHackerSkills, putHackerSkills } from "../../../../../api/HackerSettingsApi";
import "./SkillsTab.css";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";

const SkillsTab = () => {
  const [skills, setSkills] = useState([{ name: "html", rating: 2 }]);
  const [modifiedSkills, setModifiedSkills] = useState([]);
  const maxCount = 10;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getHackerSkills(token).then(res => {
      setSkills(res.data);
    });
  }, []);

  const handleRating = (newRating, skillName, skillID) => {
    setSkills(
      skills.map(skill => {
        return skill.name === skillName ? { ...skill, rating: newRating } : skill;
      })
    );
    setModifiedSkills([...modifiedSkills, { id: skillID, name: skillName, rating: newRating }]);
    putHackerSkills(token, modifiedSkills)
      .then(res => {})
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  };

  return (
    <div className="row">
      {skills.map(skill => {
        return (
          <div key={skill.id} className="col-md-10 mx-auto mb-4">
            <div className="card border-0 bg-second">
              <div className="card-body d-flex">
                <p className="my-auto">
                  {skill.rating}/{maxCount}
                </p>
                <div className="form-check form-check-inline">
                  <ReactRating fullSymbol={["rating"]} initialRating={skill.rating} step={2} stop={10} onChange={e => handleRating(e, skill.name, skill.id)} />
                </div>
                <div className="form-check form-check-inline mr-auto">
                  <label className="form-check-label mr-2 text-lightgreen lead mb-0">{skill.name}</label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps)(SkillsTab);
