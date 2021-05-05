import React, { useState } from 'react';
import './ProfileTab.css';
import { CountryDropdown } from 'react-country-region-selector';
import { updateUserProfile } from '../../../../../api/ProfileApi';
import { handleGetUserToken } from '../../../actions/index';


const ProfileTab = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    country: "",
    hacker: {
      avater: "",
      linkedin: "",
      github: "",
      twitter: "",
      skills: {
        id: 1,
        name: "dasda",
        rating: 4
      }
    }
  })

  const token = handleGetUserToken();

  const handleInput = (e) => {
    let event = e.target;

    if (event.name === "linkedin" || event.name === "github" || event.name === "twitter") {
      setProfile({ ...profile, hacker: { ...profile.hacker, [event.name]: event.value } });
    } else {
      setProfile({ ...profile, [event.name]: event.value });
    }
  }

  const handleCountryInput = (e) => {
    setProfile({ ...profile, country: e });
  }

  const avatarSelectedHandler = e => {

    let newAvatart = e.target.files[0];
    const formatImage = new FormData();
    formatImage.append('file', newAvatart, newAvatart.name);
    console.log(newAvatart);
    setProfile({ ...profile, hacker: { ...profile.hacker, avater: newAvatart } });
  }


  const newProfileSettings = (e) => {
    e.preventDefault();

    const sendNewData = updateUserProfile(token, profile);

    console.log(profile);
    console.log(sendNewData);
  }



  return (
    <>
      <div className="row">
        <div className="col-md-6 mx-auto mb-4">
          <img className="profile-image" src={profile.hacker.avater} />
          <input type="file" className="custom-file-input" onChange={avatarSelectedHandler} />
          <button className="btn btn-light d-block mx-auto">تغيير الصورة</button>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings" onSubmit={newProfileSettings}>
            <div className="form-group">
              <label for="firstName">الاسم الأول</label>
              <input type="text" className="form-control custom-input border-0" name="first_name" id="firstName" aria-describedby="firstNameHelp" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label for="lastName">الاسم الاخير</label>
              <input type="text" className="form-control custom-input border-0" name="last_name" id="lastName" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label for="country">الدولة</label>
              <CountryDropdown className="form-control custom-input country-input border-0" value={profile.country} name="country" onChange={handleCountryInput} />
            </div>
            <div className="form-group">
              <label for="linkedin">Linkedin</label>
              <input type="text" className="form-control custom-input border-0" name="linkedin" id="linkedin" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label for="github">Github</label>
              <input type="text" className="form-control custom-input border-0" name="github" id="github" onChange={handleInput} />
            </div>
            <div className="form-group">
              <label for="twitter">twitter</label>
              <input type="text" className="form-control custom-input border-0" id="twitter" name="twitter" onChange={handleInput} />
            </div>
            <div class="form-group">
              <label for="bio">مقدمة</label>
              <textarea class="form-control custom-input border-0" id="bio" rows="5" name="bio" onChange={handleInput}></textarea>
            </div>
            <button type="submit" className="btn btn-settings d-block mr-auto settings-submit-button">تعديل البيانات الشخصية</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfileTab;