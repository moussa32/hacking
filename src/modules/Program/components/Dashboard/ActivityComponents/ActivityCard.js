import React from "react";
import { DefaultAvatar } from "../../../../../assets";

const ActivityCard = () => {
  return (
    <div className="bg-black activity-card mt-3 rounded p-3 ">
      <img className="activity-logo-image" src={DefaultAvatar} title="Lofod" alt="logo" />
      <div className="activity-card-body">
        <h5 className="text-lightgreen">But I must explain to you how all this mistaken</h5>
        <div className="d-flex activity-card-body-info">
          <p className="mb-0">
            من <span className="text-lightgreen">دينا</span> إلى <span className="text-lightgreen">Toyota</span>
          </p>
          <div>
            <div class="d-flex flex-row align-items-center">
              <span class="badge badge-danger py-2 px-2"></span>
              <p class="mb-0 mr-2">عالي</p>
            </div>
            <div class="d-flex flex-row align-items-center">
              <span class="badge badge-success py-2 px-2"></span>
              <p class="mb-0 mr-2">محلول</p>
            </div>
          </div>
        </div>
      </div>
      <div className="activity-card-info">
        <p className="lead text-warning">21$</p>
        <p className="text-muted mb-0">تم الكشف عنها قبل يومين</p>
      </div>
    </div>
  );
};

export default ActivityCard;
