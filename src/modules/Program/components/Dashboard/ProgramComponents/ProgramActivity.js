import React, {useState, useEffect} from "react";
import {getProgramActivity} from "../../../../../api/ProgramAPI/ProgramActivity";
import {dvbaseUrl} from "../../../../../api/Constants";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import ar from "javascript-time-ago/locale/ar";
import {FiActivity} from "react-icons/fi";

const ProgramActivity = () => {
  const [activity, setActivity] = useState([]);
  const [isData, setIsData] = useState(false);
  const token = localStorage.getItem("accessToken");

  TimeAgo.addLocale(ar);

  const timeAgo = new TimeAgo("ar");

  useEffect(() => {
    getProgramActivity(token).then((res) => {
      setIsData(true);
      setActivity(res.data);
    });
  }, []);

  const checkUserLevel = (level) => {
    if (level === "منخفض") {
      return (
        <div className="report-status d-flex align-items-center">
          <span className="badge badge-pill badge-warning report-alert" style={{background: "#16a085"}}></span>
          <span>{level}</span>
        </div>
      );
    } else if (level === "متوسط") {
      return (
        <div className="report-status d-flex align-items-center">
          <span className="badge badge-pill badge-warning report-alert" style={{background: "#d35400"}}></span>
          <span>{level}</span>
        </div>
      );
    } else if (level === "عالي") {
      return (
        <div className="report-status d-flex align-items-center">
          <span className="badge badge-pill badge-warning report-alert" style={{background: "#c0392b"}}></span>
          <span>{level}</span>
        </div>
      );
    } else if (level === "ضروري") {
      return (
        <div className="report-status d-flex align-items-center">
          <span className="badge badge-pill badge-danger report-alert" style={{background: "#8e44ad"}}></span>
          <span>{level}</span>
        </div>
      );
    }
  };

  return (
    <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
      <div className="container">
        <h2 className="section-title text-right">{isData ? <FiActivity className="section-icon ml-3 mb-2" size={"2rem"} /> : ""}النشاط</h2>
        {isData ? (
          <div className="section-container bg-second m-4 rounded vulcontainer">
            <h3 className="text-lightgreen text-right">اسم الشركة</h3>
            <div className="row">
              {activity.map((report) => {
                return (
                  <div className="col-md-12 mt-4 report-container" key={report.id}>
                    <div className="row py-2">
                      <div className="col-md-8">
                        <div className="company-info">
                          <img className="report-company-logo" src={`${dvbaseUrl}/${report.reported_to.logo}`} alt={report.reported_to.name} />
                          {report.title}
                        </div>
                        <div className="report-info d-flex mt-3">
                          {report.close_state ? (
                            <div className="report-status d-flex align-items-center">
                              <span className="badge badge-pill badge-primary report-alert"></span>
                              <span>مفتوح</span>
                            </div>
                          ) : (
                            <div className="report-status d-flex align-items-center">
                              <span className="badge badge-pill badge-success report-alert"></span>
                              <span>محلول</span>
                            </div>
                          )}
                          {checkUserLevel(report.level.name)}
                        </div>
                      </div>
                      <div className="col-md-4 my-auto pl-0">
                        <p className="sovle-date">
                          تم الكشف عنها <ReactTimeAgo date={Date.parse(report.closed_at)} locale="ar-AR" />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <FiActivity size={"3rem"} />
            <p className="mt-4 lead mb-0">لم تقم باي نشاط بعد</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramActivity;
