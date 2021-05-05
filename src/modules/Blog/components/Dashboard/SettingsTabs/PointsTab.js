import React from 'react';

const PointsTab = () => {
  return (
    <>
      <div className="row pb-4">
        <div className="col-md-12 mx-auto">
          <div className="card bg-second border-0 mx-4">
            <div className="card-body d-flex">
              <span className="badge badge-success text-dark d-block align-self-center">+100</span>
              <p className="m-0 mr-3 flex-fill">اسم المستخدم لانضمامك في موقعنا</p>
              <p className="text-lightgreen flex-fill m-0 text-left">منذ شهر</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row pb-4">
        <div className="col-md-12 mx-auto">
          <div className="card bg-second border-0 mx-4">
            <div className="card-body d-flex">
              <span className="badge badge-danger text-dark d-block align-self-center">-10</span>
              <p className="m-0 mr-3 flex-fill">اسم المستخدم لانضمامك في موقعنا</p>
              <p className="text-lightgreen flex-fill m-0 text-left">منذ يومين</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PointsTab;