import React, { useState } from 'react';
import { connect } from "react-redux";
import './ProfileTab.css';
import { CountryDropdown } from 'react-country-region-selector';
import { updateUserProfile } from '../../../../../api/ProfileApi';
import { handleGetUserToken } from '../../../actions/index';
import ReactStars from "react-rating-stars-component";
import { BsCircleFill } from 'react-icons/bs';


const ProfileTab = ({ avatar }) => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    country: "",
    hacker: {
      avater: "https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg",
      linkedin: "",
      github: "",
      twitter: "",
      skills: {
        id: 1,
        name: "html",
        rating: 0
      }
    }
  })

  const token = handleGetUserToken("accessToken");

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

  const handleRating = (newRating) => {
    setProfile({
      ...profile, hacker: {
        ...profile.hacker, skills: {
          ...profile.hacker.skills, rating: newRating
        }
      }
    });
    console.log(newRating);
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
              <label htmlFor="firstName">الاسم الأول</label>
              <input type="text" className="form-control custom-input border-0" name="first_name" id="firstName" aria-describedby="firstNameHelp" onChange={handleInput} />
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
            <h3 className="my-4">المهارات:</h3>
            <div className="jumbotron jumbotron-fluid bg-second py-4 mb-1">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row pb-4">
                      <div className="col-md-12">
                        <div className="card bg-black border-0 mx-4">
                          <div className="card-body d-flex">
                            <p className="my-auto">{profile.hacker.skills.rating}/5</p>
                            <div className="form-check form-check-inline">
                              <ReactStars
                                count={5}
                                size={24}
                                isHalf={false}
                                emptyIcon={<BsCircleFill className="mx-2" />}
                                filledIcon={<BsCircleFill className="mx-2" />}
                                activeColor="#08cc96"
                                color={'white'}
                                onChange={handleRating}
                              />
                            </div>
                            <div className="form-check form-check-inline mr-auto">
                              <label className="form-check-label mr-2 text-lightgreen">HTML</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-settings d-block mr-auto settings-submit-button">تعديل البيانات الشخصية</button>
          </form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ blogs }) => {
  console.log(blogs.userInfo);
  return {
    avater: blogs.userInfo.hacker
  };
}

export default connect(mapStateToProps)(ProfileTab);