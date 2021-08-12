import React, { useState, useEffect } from "react";
import { dvbaseUrl } from "../../../../../api/Constants";
import { CountryDropdown } from "react-country-region-selector";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import { DefaultAvatar } from "../../../../../assets";
import { handleGetUserToken } from "../../../actions/index";
import { FaUpload } from "react-icons/fa";
import { getHackerAvatar, putHackerAvatar, putHackerInfo, getHackerInfo } from "../../../../../api/HackerSettingsApi";
import "./ProfileTab.css";

const ProfileTab = () => {
  const [avatar, setAvatar] = useState("");
  const [status, setStatus] = useState("");
  const [newLogo, setNewLogo] = useState(null);
  const [newLogoStatus, setNewLogoStatus] = useState({ isLoadding: false });
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
  const [modifiedProfile, setModifiedProfile] = useState({});

  useEffect(() => {
    getHackerInfo(token)
      .then(res => {
        const hackerInfo = res.data;
        setProfile(hackerInfo);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
    getHackerAvatar(token)
      .then(res => {
        setAvatar(res.data.avater);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  }, []);
  const token = handleGetUserToken("accessToken");

  const handleInput = e => {
    let event = e.target;

    if (event.name === "linkedin" || event.name === "github" || event.name === "twitter") {
      setModifiedProfile({ ...modifiedProfile, hacker: { ...modifiedProfile.hacker, [event.name]: event.value } });
      setProfile({ ...profile, hacker: { ...profile.hacker, [event.name]: event.value } });
    } else {
      setModifiedProfile({ ...modifiedProfile, [event.name]: event.value });
      setProfile({ ...profile, [event.name]: event.value });
    }
  };

  const handleCountryInput = e => {
    setProfile({ ...profile, country: e });
    setModifiedProfile({ ...modifiedProfile, country: e });
  };

  const avatarSelectedHandler = e => {
    let newAvatart = e.target.files[0];
    const formatImage = new FormData();
    formatImage.append("avater", newAvatart);

    setNewLogo(formatImage);
  };

  const avatarUploaderHandler = () => {
    if (!newLogo || newLogo === "undefind") {
      setNewLogoStatus({ isLoadding: false, type: "danger", message: "يجب عليك تحديد صورة أولًا" });
    } else {
      setNewLogoStatus({ isLoadding: true });
      return putHackerAvatar(token, newLogo)
        .then(res => {
          console.log(res.data.avater);
          setAvatar(res.data.avater);
          setNewLogo(null);
          setNewLogoStatus({ isLoadding: false, type: "success", message: "تم تحديث صورتك بنجاح" });
        })
        .catch(error => {
          if (error.response.status === 401) {
            getNewTokens(localStorage.getItem("refreshToken"));
          }
        });
    }
  };

  const newProfileSettings = e => {
    e.preventDefault();
    setIsLoadding(true);

    putHackerInfo(token, modifiedProfile)
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم تعديل البيانات بنجاح" });
      })
      .catch(error => {
        setIsLoadding(false);
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "لقد انتهت جلستك." });
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 mx-auto mb-4">
          <img className="profile-image" src={avatar !== null ? `${dvbaseUrl}${avatar}` : DefaultAvatar} />
          <div className="custom-file mb-2">
            <input type="file" className="custom-file-input profile-image-input" id="customFile" onChange={avatarSelectedHandler} />
            <label className="custom-file-label select-profile-image-label profile-image-label" htmlFor="customFile">
              اختر الصورة
            </label>
          </div>
          <button className="btn btn-lightgreen mx-auto px-4  w-100" onClick={avatarUploaderHandler}>
            <FaUpload size={"1.5rem"} />
          </button>
          {newLogoStatus.isLoadding ? (
            <>
              <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="جاري رفع الصورة"></p>
            </>
          ) : (
            <div className={`alert alert-${newLogoStatus.type} mt-4 text-center`} role="alert">
              {newLogoStatus.message}
            </div>
          )}
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings" onSubmit={newProfileSettings}>
            <div className="form-group">
              <label htmlFor="firstName">الاسم الأول</label>
              <input type="text" value={profile.first_name} className="form-control custom-input border-0" name="first_name" id="firstName" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">الاسم الأخير</label>
              <input type="text" value={profile.last_name} className="form-control custom-input border-0" name="last_name" id="lastName" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="country">الدولة</label>
              <CountryDropdown value={profile.country} className="form-control custom-input country-input border-0" value={profile.country} name="country" onChange={handleCountryInput} />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input type="text" value={profile.hacker.linkedin} className="form-control custom-input border-0" name="linkedin" id="linkedin" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="github">Github</label>
              <input type="text" value={profile.hacker.github} className="form-control custom-input border-0" name="github" id="github" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="twitter">twitter</label>
              <input type="text" value={profile.hacker.twitter} className="form-control custom-input border-0" id="twitter" name="twitter" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="bio">نبذه تعريفية</label>
              <textarea value={profile.bio} className="p-3 form-control custom-input border-0" id="bio" rows="5" name="bio" onChange={handleInput}></textarea>
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

export default ProfileTab;
