import React, { useState } from "react";
import { connect } from "react-redux";
import { postCompanyAds } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import "./CompanyAddNewAsset.css";

function CompanyAddNewAd({ author, program }) {
  const [newAd, setNewAd] = useState({
    author,
    program,
    title: "",
    body: "",
    is_active: true,
  });
  const [status, setStatus] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleSubmitNewAd = e => {
    e.preventDefault();
    setIsLoadding(true);

    postCompanyAds(token, newAd)
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم إضافة إعلان جديد" });
        console.log(res.data);
      })
      .catch(error => {
        setIsLoadding(false);
        setStatus(null);
        if (error.response.status === 400) {
          setStatus({ type: "danger", message: "لم يتم إدخال البيانات بشكل صحيح" });
        } else if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });

    console.log(newAd);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-11 mx-auto">
            <form className="mb-4" onSubmit={handleSubmitNewAd}>
              <div className="form-group rounded">
                <label htmlFor="assetType" className="col-form-label text-lightgreen">
                  العنوان:
                </label>
                <input type="text" className="form-control border-0 custom-input" placeholder="عنوان الإعلان" onChange={e => setNewAd({ ...newAd, title: e.target.value })} required />
              </div>
              <div className="form-group rounded">
                <label htmlFor="assetType" className="col-form-label text-lightgreen">
                  المحتوى:
                </label>
                <textarea value={newAd.body} onChange={e => setNewAd({ ...newAd, body: e.target.value })} className="form-control p-3 custom-input border-0" rows="6" required></textarea>
              </div>
              <label className="col-form-label text-lightgreen">الحالة:</label>
              <div className="form-check bg-second py-1">
                <input style={{ marginRight: " -1.25rem" }} className="form-check-input" type="radio" name="is_active" value="true" onChange={e => setNewAd({ ...newAd, is_active: true })} required />
                <label className="form-check-label">مفعل</label>
              </div>
              <div className="form-check bg-second py-1">
                <input style={{ marginRight: " -1.25rem" }} className="form-check-input custom-input" type="radio" name="is_active" value="false" onChange={e => setNewAd({ ...newAd, is_active: false })} required />
                <label className="form-check-label">غير مفعل</label>
              </div>
              <button type="submit" className="btn btn-lightgreen w-50 mx-auto d-block">
                إضافة
              </button>
            </form>
            {isLoadding ? (
              <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}
            {status ? (
              <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
                {status.message}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ program }) => {
  return {
    author: program.programInfo.admin.id,
    program: program.programInfo.id,
  };
};

export default connect(mapStateToProps)(CompanyAddNewAd);
