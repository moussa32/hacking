import React, { useState, useEffect } from "react";
import ReactRating from "react-rating";
import { getHackerSkills, putHackerSkills } from "../../../../../api/HackerSettingsApi";
import "./SkillsTab.css";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";

const SkillsTab = () => {
  const [skills, setSkills] = useState([{ name: "html", rating: 2 }]);
  const [modifiedSkills, setModifiedSkills] = useState([]);
  const [isLoadding, setIsLoadding] = useState(false);
  const [status, setStatus] = useState(null);
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
  };

  const handleChangeSkills = () => {
    setIsLoadding(true);
    setStatus(null);
    if (modifiedSkills.length > 0) {
      putHackerSkills(token, modifiedSkills)
        .then(res => {
          setIsLoadding(false);
          setStatus({ type: "success", message: "تم تحديث مهارتك بنجاح" });
        })
        .catch(error => {
          setIsLoadding(false);
          if (error.response.status === 401) {
            getNewTokens(localStorage.getItem("refreshToken"));
          }
        });
    } else {
      setIsLoadding(false);
      setStatus({ type: "danger", message: "لم يتم تعديل او تغيير اي مهارة بعد" });
    }
  };

  return (
    <div className="row">
      {skills.map(skill => {
        return (
          <div key={skill.id} className="col-md-11 mx-auto mb-4">
            <div className="card border-0 bg-second">
              <div className="card-body skill-card d-flex flex-wrap-reverse">
                <div className="d-flex align-items-center flex-wrap">
                  <p className="mx-2 my-auto lead">
                    {skill.rating}/{maxCount}
                  </p>
                  <ReactRating fullSymbol={["rating"]} initialRating={skill.rating} step={2} stop={10} onChange={e => handleRating(e, skill.name, skill.id)} />
                  <button className="btn btn-danger mr-2" onClick={e => handleRating(0, skill.name, skill.id)}>
                    تفريغ
                  </button>
                </div>
                <div className="skill-name">
                  <label className="pr-0 mr-2 text-lightgreen lead mb-0">{skill.name}</label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="col-md-12">
        <button className="btn btn-lightgreen mx-auto px-4 py-2 d-block" onClick={handleChangeSkills}>
          تحديث المهارات
        </button>
      </div>
      <div className="col-md-8 mx-auto">
        {isLoadding ? (
          <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
        {status ? (
          <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
            {status.message}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SkillsTab;
