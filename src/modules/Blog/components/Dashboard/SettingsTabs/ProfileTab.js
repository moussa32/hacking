import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { dvbaseUrl } from "../../../../../api/Constants";
import { CountryDropdown } from "react-country-region-selector";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import { DefaultAvatar } from "../../../../../assets";
import { handleGetUserToken } from "../../../actions/index";
import { putHackerAvatar, putHackerInfo } from "../../../../../api/HackerSettingsApi";
import "./ProfileTab.css";

const ProfileTab = ({ avater }) => {
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    country: "",
    hacker: {
      linkedin: "",
      github: "",
      twitter: "",
      skills: {
        id: 1,
        name: "html",
        rating: 0,
      },
    },
  });

  useEffect(() => {
    setAvatar(avater);
  }, []);
  const token = handleGetUserToken("accessToken");

  const handleInput = e => {
    let event = e.target;

    if (event.name === "linkedin" || event.name === "github" || event.name === "twitter") {
      setProfile({ ...profile, hacker: { ...profile.hacker, [event.name]: event.value } });
    } else {
      setProfile({ ...profile, [event.name]: event.value });
    }
  };

  const handleCountryInput = e => {
    setProfile({ ...profile, country: e });
  };

  const avatarSelectedHandler = e => {
    let newAvatart = e.target.files[0];
    const formatImage = new FormData();
    formatImage.append("avater", newAvatart);

    return putHackerAvatar(token, formatImage)
      .then(res => {
        console.log(res.data);
        setAvatar(res.data.avater);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  };

  const newProfileSettings = e => {
    e.preventDefault();
    setIsLoadding(true);

    putHackerInfo(token, profile)
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم تعديل البيانات بنجاح" });
        console.log(res.data);
      })
      .catch(error => {
        setIsLoadding(false);
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "لقد انتهت جلستك." });
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });

    console.log(profile);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 mx-auto mb-4">
          <img className="profile-image" src={avatar !== null ? `${dvbaseUrl}${avatar}` : DefaultAvatar} />
          <div className="custom-file">
            <input type="file" className="custom-file-input profile-image-input" id="customFile" onChange={avatarSelectedHandler} />
            <label className="custom-file-label profile-image-label border-0 bg-transparent rounded" htmlFor="customFile">
              تغيير الصورة
            </label>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings" onSubmit={newProfileSettings}>
            <div className="form-group">
              <label htmlFor="firstName">الاسم الأول</label>
              <input type="text" className="form-control custom-input border-0" name="first_name" id="firstName" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">الاسم الاخير</label>
              <input type="text" className="form-control custom-input border-0" name="last_name" id="lastName" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="country">الدولة</label>
              <CountryDropdown className="form-control custom-input country-input border-0" value={profile.country} name="country" onChange={handleCountryInput} />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">Linkedin</label>
              <input type="text" className="form-control custom-input border-0" name="linkedin" id="linkedin" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="github">Github</label>
              <input type="text" className="form-control custom-input border-0" name="github" id="github" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="twitter">twitter</label>
              <input type="text" className="form-control custom-input border-0" id="twitter" name="twitter" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="bio">مقدمة</label>
              <textarea className="form-control custom-input border-0" id="bio" rows="5" name="bio" onChange={handleInput}></textarea>
            </div>

            <div className="jumbotron jumbotron-fluid bg-second py-4 mb-1">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row pb-4">
                      <div className="col-md-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-settings d-block mr-auto settings-submit-button">
              تعديل البيانات الشخصية
            </button>
            {isLoadding && (
              <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
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

const mapStateToProps = ({ blogs }) => {
  console.log(blogs.userInfo);
  return {
    avater: blogs.userInfo.hacker.avater,
  };
};

export default connect(mapStateToProps)(ProfileTab);
