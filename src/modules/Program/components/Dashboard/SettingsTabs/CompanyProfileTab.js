import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { DefaultAvatar } from "../../../../../assets";
import { putCompanyInfo, getCompanyInfo, getCompanyLogo, putCompanyLogo } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { dvbaseUrl } from "../../../../../api/Constants";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import "./CompanyProfileTab.css";

const CompanyProfileTab = ({ companyLogo, companyName, companyUrl, companySummary }) => {
  const [profile, setProfile] = useState({
    company_name: "",
    url: "",
    summery: "",
  });
  const [status, setStatus] = useState(null);
  const [logo, setLogo] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyInfo(token).then(res => {
      const companyInfo = res.data;
      setProfile({ ...profile, company_name: companyInfo.company_name, url: companyInfo.url, summery: companyInfo.summery });
    });
    getCompanyLogo(token).then(res => {
      const companyLogo = res.data;
      if (companyLogo.logo !== null) {
        setLogo(`${companyLogo.logo}`);
      }
    });
  }, []);

  const handleInput = e => {
    let event = e.target;
    setProfile({ ...profile, [event.name]: event.value });
  };

  const avatarSelectedHandler = e => {
    let newAvatart = e.target.files[0];
    const formatImage = new FormData();
    formatImage.append("logo", newAvatart);

    return putCompanyLogo(token, formatImage).then(res => setLogo(res.data.logo));
  };

  const newProfileSettings = e => {
    e.preventDefault();
    setStatus(null);
    setIsLoadding(true);

    putCompanyInfo(token, profile)
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم تحديث بيانات الشركة بنجاح." });
      })
      .catch(error => {
        setIsLoadding(false);
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "جاري تحديث جلستك" });
          getNewTokens(localStorage.getItem("reFreshtoken"));
        } else if (error.response.status === 400) {
          setStatus({ type: "danger", message: "لا يمكن ترك أحد الحقول فارغه" });
        }
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 mx-auto mb-4">
          <img className="profile-image" src={logo !== null ? `${dvbaseUrl}${logo}` : DefaultAvatar} />
          <div className="custom-file">
            <input type="file" className="custom-file-input profile-image-input" id="customFile" onChange={avatarSelectedHandler} />
            <label className="custom-file-label profile-image-label" htmlFor="customFile">
              تغيير الصورة
            </label>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings" onSubmit={newProfileSettings}>
            <div className="form-group">
              <label htmlFor="company_name">اسم الشركة</label>
              <input type="text" value={profile.company_name} className="form-control custom-input border-0" name="company_name" id="company_name" onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label htmlFor="company_url">رابط الشركة</label>
              <input type="url" value={profile.url} className="form-control custom-input border-0" name="url" id="company_url" onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label htmlFor="summary">مقدمة</label>
              <textarea value={profile.summery} className="form-control p-3 custom-input border-0" id="summary" rows="6" name="summery" onChange={handleInput} required></textarea>
            </div>
            <button type="submit" className="btn btn-lightgreen d-block w-50 mx-auto">
              تعديل
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
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ program }) => {
  return {
    companyName: program.programInfo.company_name,
    companyLogo: program.programInfo.logo,
    companyUrl: program.programInfo.url,
    companySummary: program.programInfo.summery,
  };
};

export default connect(mapStateToProps)(CompanyProfileTab);
