import React from 'react';
import './HackerActivity.css';


const HackerActivity = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">النشاط</h2>
          <div className="section-container bg-second m-4 rounded vulcontainer">
            <h3 className="text-lightgreen text-right">اسم الشركة</h3>
            <div className="row">
              <div className="col-md-12 mt-4 report-container">
                <div className="row py-2">
                  <div className="col-md-8">
                    <div className="company-info">
                      <img class="report-company-logo" src="https://gfx4arab.com/wp-content/uploads/2020/07/olx-group-1.svg" />OLX
                    </div>
                    <div className="report-info d-flex mt-3">
                      <div className="report-status d-flex align-items-center">
                        <span className="badge badge-pill badge-danger report-alert"></span>
                        <span>عالي</span>
                      </div>
                      <div className="report-status d-flex align-items-center">
                        <span className="badge badge-pill badge-success report-alert"></span>
                        <span>محلول</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 my-auto pl-0">
                    <p className="sovle-date">
                      تم الكشف عنها قبل يومين
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-4 report-container">
                <div className="row py-2">
                  <div className="col-md-8">
                    <div className="company-info">
                      <img class="report-company-logo" src="https://www.futurelab.net/sites/default/files/toyota-logo.jpg" />Toyota
                    </div>
                    <div className="report-info d-flex mt-3">
                      <div className="report-status d-flex align-items-center">
                        <span className="badge badge-pill badge-warning report-alert"></span>
                        <span>منخفض</span>
                      </div>
                      <div className="report-status d-flex align-items-center">
                        <span className="badge badge-pill badge-primary report-alert"></span>
                        <span>مزيد من المعلومات</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 my-auto pl-0">
                    <p className="sovle-date">
                      تم الكشف عنها قبل يومين
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerActivity;