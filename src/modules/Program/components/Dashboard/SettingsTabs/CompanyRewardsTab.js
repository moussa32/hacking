import React, { useState, useEffect } from "react";
import { BiDollar } from "react-icons/bi";
import { handleLevelToName } from "../../../../../shared/utils/handleLevelName";
import { handleBadgeColor } from "../../../../../shared/utils/handleBadgeColor";
import { getCompanyRewards, putCompanyRewards } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";

const CompanyRewardsTab = () => {
  const [rewards, setRewards] = useState([
    { id: 0, level: 2, amount: 0, program: 9 },
    { id: 1, level: 3, amount: 0, program: 9 },
    { id: 2, level: 4, amount: 0, program: 9 },
    { id: 3, level: 5, amount: 0, program: 9 },
  ]);
  const [status, setStatus] = useState(null);
  const [isNewRewards, setIsNewRewards] = useState(false);
  const [isLoadding, setIsLoadding] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyRewards(token)
      .then(res => {
        setRewards(res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  }, []);

  const updateRewardAmount = (rewardID, rewardLevel, rewardAmount) => {
    setRewards(
      rewards.map(reward => {
        return reward.level === rewardLevel ? { ...reward, id: rewardID, amount: rewardAmount } : reward;
      })
    );
  };

  // let hasZero = Object.keys(rewards).some(reward => !rewards[reward])

  const checkRewards = reward => {
    return reward.amount <= 0;
  };

  let hasZero = rewards.some(checkRewards);

  const handleSubmitForm = e => {
    e.preventDefault();
    setIsLoadding(true);
    setStatus(null);

    if (hasZero) {
      setIsLoadding(false);
      setStatus({ type: "danger", message: "لا يمكنك وضع اي مكافأة بدون قيمة" });
    } else {
      putCompanyRewards(token, rewards).then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم وضع البيانات بنجاح" });
      });
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
          {rewards.map(reward => {
            return (
              <div key={reward.id} className="col-md-12 mb-3">
                <div className="card border-0 bg-second">
                  <div className="card-body pt-3 pb-0 align-items-center">
                    <div className="row">
                      <div className="col-md-4 mb-3 d-flex align-items-center">
                        <span className={`badge badge-${handleBadgeColor(handleLevelToName(reward.level))} program-bountry-bars`}></span>
                        <p className="align-self-center lead mb-0">{handleLevelToName(reward.level)}</p>
                      </div>
                      <div className="col-md-8 mb-3">
                        <div className="inner-addon left-addon">
                          <BiDollar className="text-lightgreen glyphicon" size={"1.4rem"} />
                          <input
                            type="number"
                            className="form-control custom-input bg-black border-0"
                            onChange={e => {
                              updateRewardAmount(reward.id, reward.level, parseInt(e.target.value));
                            }}
                            value={reward.amount}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
