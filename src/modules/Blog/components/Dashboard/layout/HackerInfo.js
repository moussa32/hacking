import React from "react";
import { connect } from "react-redux";

import { VscLocation } from "react-icons/vsc";
import { FaGithub, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { DefaultAvatar } from "../../../../../assets/index";

import { dvbaseUrl } from "../../../../../api/Constants";

const HackerInfo = props => {
  const { avatar, userName, country, bio, userTwitter, userLinkedin, userGithub } = props;
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <img src={avatar ? `${dvbaseUrl}/${avatar}` : `${DefaultAvatar}`} className="rounded-circle hacker-image rounded mx-auto d-block mb-3" alt={userName} />
              <h2 className="hackerName text-white my-4">{userName}</h2>
              <p className="hackerLocation text-white lead">
                <VscLocation /> {country}
              </p>
              <p className="hackerBio text-white lead">{bio}</p>
              <div className="row mx-auto">
                <div className="col-md-12">
                  {userTwitter ? (
                    <a href={userTwitter} className="text-lightgreen hacker-social-icons">
                      <FaTwitterSquare size="2.5rem" />
                    </a>
                  ) : (
                    ""
                  )}
                  {userLinkedin ? (
                    <a href={userLinkedin} className="text-lightgreen hacker-social-icons">
                      <FaLinkedin size="2.5rem" />
                    </a>
                  ) : (
                    ""
                  )}
                  {userGithub ? (
                    <a href={userGithub} className="text-lightgreen hacker-social-icons">
                      <FaGithub size="2.5rem" />
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ blogs }) => {
  console.log(blogs.userInfo);
  return {
    avatar: blogs.userInfo.hacker.avater,
    userName: blogs.userInfo.first_name,
    country: blogs.userInfo.country,
    bio: blogs.userInfo.bio,
    userTwitter: blogs.userInfo.hacker.twitter,
    userLinkedin: blogs.userInfo.hacker.linkedin,
    userGithub: blogs.userInfo.hacker.github,
  };
};

export default connect(mapStateToProps)(HackerInfo);
