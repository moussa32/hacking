import React from "react";

const Timeline = ({ commit, userName, time, src }) => {
  return (
    <div className="timeline-container left">
      <div className="timeline-content d-flex bg-second">
        {userName && <p className="mb-0 text-lightgreen ml-4">{userName}</p>}
        <p className="mb-0">{commit}</p>
        <p className="mb-0 mr-auto text-lightgreen">{time}</p>
      </div>
      <div className="timeline-pointer">
        <div className="timeline-leftline">
          {src && <img className="report-user-commit" src={src} />}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
