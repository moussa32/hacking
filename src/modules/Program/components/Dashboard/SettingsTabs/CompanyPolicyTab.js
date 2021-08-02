import React, { useState, useEffect } from "react";
import { getCompanyPolicy, putCompanyPolicy } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./CompanyPoliceTab.css";

function CompanyPolicyTab() {
  const [policy, setPolicy] = useState({ policy: "" });
  const [isLoadding, setIsLoadding] = useState(false);
  const [status, setStatus] = useState(null);
  const [value, setValue] = useState("**Hello world!!!**");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyPolicy(token)
      .then(res => {
        setPolicy({ policy: res.data.policy });
      })
      .catch(error => {
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "جاري تحديث جلستك" });
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  }, []);

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const handlePutCompanyPolicy = () => {
    setIsLoadding(true);
    setStatus(null);

    putCompanyPolicy(token, policy)
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم تحديث سياسات البرنامج بنجاح." });
      })
      .catch(error => {
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "جاري تحديث جلستك" });
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  };

  return (
    <>
      <h3 className="text-lightgreen p-4">تفاصيل</h3>
      <div className="row">
        <div className="col-md-11 mx-auto">
          <div className="form-group">
            <textarea value={policy.policy} onChange={e => setPolicy({ policy: e.target.value })} className="form-control p-3 custom-input border-0" id="summary" rows="6" name="summary"></textarea>
          </div>
          <button className="btn btn-lightgreen w-50 btn-block mx-auto my-4" onClick={handlePutCompanyPolicy}>
            اضافة
          </button>
          {isLoadding ? (
            <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
          {status && (
            <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
              {status.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CompanyPolicyTab;
