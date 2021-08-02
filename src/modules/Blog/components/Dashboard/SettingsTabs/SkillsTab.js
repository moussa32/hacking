import React, { useState } from "react";
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { BsCircleFill } from "react-icons/bs";

const SkillsTab = () => {
  const [skills, setSkills] = useState([{ name: "html", rating: 2 }]);

  const handleRating = newRating => {
    setSkills(state => [...skills, { name: "html", rating: newRating }]);
    console.log(newRating);
    console.log(skills);
  };

  return (
    <div className="row">
      {skills.map(skill => {
        return (
          <div className="col-md-10 mx-auto mb-4">
            <div className="card border-0 bg-second">
              <div className="card-body d-flex">
                <p className="my-auto">{skill.rating}/10</p>
                <div className="form-check form-check-inline">
                  <ReactStars value={skill.rating} count={10} size={24} isHalf={true} emptyIcon={<BsCircleFill className="mx-2" />} filledIcon={<BsCircleFill className="mx-2" />} activeColor="#08cc96" color={"white"} onChange={handleRating} />
                </div>
                <div className="form-check form-check-inline mr-auto">
                  <label className="form-check-label mr-2 text-lightgreen">{skill.name}</label>
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
