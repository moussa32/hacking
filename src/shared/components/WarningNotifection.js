import React from "react";

const WarningNotifection = props => {
  const { isTitle = false, title = "", message = "" } = props;
  return (
    <div className="jumbotron jumbotron-fluid bg-danger">
      <div className="container text-center">
        {isTitle && <h1>{title}</h1>}
        <p className="mt-3 lead">{message}</p>
      </div>
    </div>
  );
};

export default WarningNotifection;
