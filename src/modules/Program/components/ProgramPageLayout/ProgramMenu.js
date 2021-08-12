import React from "react";

const ProgramMenu = () => {
  return (
    <div className="row p-4 bg-black mt-2">
      <div className="col-md-12">
        <ul className="nav nav-tabs custom-nav-tabs px-0 d-flex flex-column flex-md-row justify-content-between pb-4" id="programTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link program-nav-link text-lightgreen active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
              الرئيسية
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link program-nav-link text-lightgreen" id="rewards-tab" data-toggle="tab" href="#rewards" role="tab" aria-controls="rewards" aria-selected="false">
              المكافأت
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link program-nav-link text-lightgreen" id="programActivity-tab" data-toggle="tab" href="#programActivity" role="tab" aria-controls="programActivity" aria-selected="false">
              النشاط
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link program-nav-link text-lightgreen" id="ads-tab" data-toggle="tab" href="#ads" role="tab" aria-controls="ads" aria-selected="false">
              الإعلانات
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link program-nav-link text-lightgreen" id="thanksBoard-tab" data-toggle="tab" href="#thanksBoard" role="tab" aria-controls="thanksBoard" aria-selected="false">
              لوحة الشكر
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link program-nav-link text-lightgreen" id="admins-tab" data-toggle="tab" href="#admins" role="tab" aria-controls="admins" aria-selected="false">
              المشرفون
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProgramMenu;
