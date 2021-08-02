import React, { useState, useEffect } from "react";
import { BiDollar } from "react-icons/bi";
import { getCompanyRewards, setCompanyRewards, putCompanyRewards } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";

const CompanyRewardsTab = () => {
  const [rewards, setRewards] = useState([
    { level: 2, amount: 0, program: 9 },
    { level: 3, amount: 0, program: 9 },
    { level: 4, amount: 0, program: 9 },
    { level: 5, amount: 0, program: 9 },
  ]);
  const [status, setStatus] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyRewards(token)
      .then(res => {
        console.log(res.data);
        if (res.data.length > 0) {
          setRewards(res.data);
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  }, []);

  const updateRewardAmount = (index, newData) => {
    let newRewards = [...rewards];
    newRewards[index].amount = newData;
    setRewards(newRewards);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    setIsLoadding(true);
    setStatus(null);

    let isNewRewards = true;

    for (let i in rewards) {
      if (rewards[i].amount <= 0) {
        isNewRewards = false;
      } else {
        isNewRewards = true;
      }
    }

    if (isNewRewards) {
      setCompanyRewards(token, rewards).then(res => {
        const updatedRewards = res.data;
        setRewards({ ...rewards, updatedRewards });
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم وضع البيانات" });
      });
    } else {
      setIsLoadding(false);
      setStatus({ type: "danger", message: "لا يمكنك ان تتضع احدى المكافأت بصفر او جميعهم" });
      // putCompanyRewards(token, rewards).then(res => {
      //   const updatedRewards = res.data;
      //   setRewards({ ...rewards, updatedRewards });
      //   setIsLoadding(false);
      //   setStatus({ type: "success", message: "تم تحديث البيانات" });
      // });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitForm}>
        <div className="row pb-4">
          <div className="col-md-12 mb-3">
            <div className="card border-0 bg-second">
              <div className="card-body pt-3 pb-0 align-items-center">
                <div className="row flex-nowrap">
                  <div className="col-md-6 mb-3 d-flex align-items-center">
                    <p className="align-self-center text-lightgreen lead mb-0">الاسم</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="align-self-center text-lightgreen text-left lead mb-0">المكافأة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <div className="card border-0 bg-second">
              <div className="card-body pt-3 pb-0 align-items-center">
                <div className="row">
                  <div className="col-md-4 mb-3 d-flex align-items-center">
                    <span className="badge badge-danger program-bountry-bars"></span>
                    <p className="align-self-center lead mb-0">ضروري</p>
                  </div>
                  <div className="col-md-8 mb-3">
                    <div className="inner-addon left-addon">
                      <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                      <input
                        type="number"
                        className="form-control custom-input bg-black border-0"
                        onChange={e => {
                          updateRewardAmount(3, e.target.value);
                        }}
                        value={rewards[3].amount}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <div className="card border-0 bg-second">
              <div className="card-body pt-3 pb-0 align-items-center">
                <div className="row">
                  <div className="col-md-4 mb-3 d-flex align-items-center">
                    <span className="badge badge-success program-bountry-bars"></span>
                    <p className="align-self-center lead mb-0">مرتفع</p>
                  </div>
                  <div className="col-md-8 mb-3">
                    <div className="inner-addon left-addon">
                      <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                      <input
                        type="number"
                        className="form-control custom-input bg-black border-0"
                        value={rewards[2].amount}
                        onChange={e => {
                          updateRewardAmount(2, e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <div className="card border-0 bg-second">
              <div className="card-body pt-3 pb-0 align-items-center">
                <div className="row">
                  <div className="col-md-4 mb-3 d-flex align-items-center">
                    <span className="badge badge-warning program-bountry-bars"></span>
                    <p className="align-self-center lead mb-0">منخفض</p>
                  </div>
                  <div className="col-md-8 mb-3">
                    <div className="inner-addon left-addon">
                      <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                      <input
                        type="number"
                        className="form-control custom-input bg-black border-0"
                        value={rewards[0].amount}
                        onChange={e => {
                          updateRewardAmount(0, e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <div className="card border-0 bg-second">
              <div className="card-body pt-3 pb-0 align-items-center">
                <div className="row">
                  <div className="col-md-4 mb-3 d-flex align-items-center">
                    <span className="badge badge-warning program-bountry-bars"></span>
                    <p className="align-self-center lead mb-0">متوسط</p>
                  </div>
                  <div className="col-md-8 mb-3">
                    <div className="inner-addon left-addon">
                      <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                      <input
                        type="number"
                        className="form-control custom-input bg-black border-0"
                        value={rewards[1].amount}
                        onChange={e => {
                          updateRewardAmount(1, e.target.value);
                        }}
                        required
                      />
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
        {isLoadding ? (
          <div className="spinner-border d-block mx-auto text-success mt-4 mb-3" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
        {status ? (
          <div className="row pb-4">
            <div className={`alert alert-${status.type} mt-2 w-100 mx-4 text-center`} role="alert">
              {status.message}
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default CompanyRewardsTab;
