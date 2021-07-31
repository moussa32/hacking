import React, {useState, useEffect} from "react";
import {BiDollar} from "react-icons/bi";
import {getCompanyRewards} from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import {getNewTokens} from "../../../../../api/RefreshTokenApi";

const CompanyRewardsTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyRewards(token)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setStatus({type: "danger", message: "جاري تحديث جلستك"});
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="row pb-4">
        <div className="col-md-12 mb-3">
          <div className="card border border-0 bg-second">
            <div className="card-body pt-3 pb-0 align-items-center">
              <div className="row">
                <div className="col-md-4 mb-3 d-flex align-items-center">
                  <span className="badge badge-danger program-bountry-bars"></span>
                  <p className="align-self-center lead mb-0">ضروري</p>
                </div>
                <div className="col-md-8 mb-3">
                  <div className="inner-addon left-addon">
                    <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                    <input type="number" className="form-control custom-input bg-black border-0" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="card border border-0 bg-second">
            <div className="card-body pt-3 pb-0 align-items-center">
              <div className="row">
                <div className="col-md-4 mb-3 d-flex align-items-center">
                  <span className="badge badge-success program-bountry-bars"></span>
                  <p className="align-self-center lead mb-0">مرتفع</p>
                </div>
                <div className="col-md-8 mb-3">
                  <div className="inner-addon left-addon">
                    <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                    <input type="number" className="form-control custom-input bg-black border-0" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="card border border-0 bg-second">
            <div className="card-body pt-3 pb-0 align-items-center">
              <div className="row">
                <div className="col-md-4 mb-3 d-flex align-items-center">
                  <span className="badge badge-warning program-bountry-bars"></span>
                  <p className="align-self-center lead mb-0">منخفض</p>
                </div>
                <div className="col-md-8 mb-3">
                  <div className="inner-addon left-addon">
                    <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                    <input type="number" className="form-control custom-input bg-black border-0" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="card border border-0 bg-second">
            <div className="card-body pt-3 pb-0 align-items-center">
              <div className="row">
                <div className="col-md-4 mb-3 d-flex align-items-center">
                  <span className="badge badge-warning program-bountry-bars"></span>
                  <p className="align-self-center lead mb-0">متوسط</p>
                </div>
                <div className="col-md-8 mb-3">
                  <div className="inner-addon left-addon">
                    <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                    <input type="number" className="form-control custom-input bg-black border-0" required />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-lightgreen d-block w-50 mx-auto">
          اضافة المكافأت
        </button>
      </div>
    </div>
  );
};

export default CompanyRewardsTab;
