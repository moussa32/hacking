import React from 'react';

import { VscLocation } from "react-icons/vsc";
import { FaGithub, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { DefaultAvatar } from '../../../../../assets/index';


import { dvbaseUrl } from "../../../../../api/Constants";


const HackerInfo = ({ userInfo }) => {
  return (
    <>
      <div class="jumbotron jumbotron-fluid bg-black rounded">
        <div class="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <img src={userInfo.hacker.avater ? (`${dvbaseUrl}/${userInfo.hacker.avater}`) : (`${DefaultAvatar}`)} class="rounded-circle hacker-image rounded mx-auto d-block mb-3" alt={userInfo.first_name} />
              <h2 className="hackerName text-white my-4">{userInfo.first_name}</h2>
              <p className="hackerLocation text-white lead"><VscLocation /> {userInfo.country}</p>
              <p className="hackerBio text-white lead">{userInfo.bio}</p>
              <div className="row mx-auto">
                <div className="col-md-12">
                  {userInfo.hacker.twitter ? (<a href={userInfo.hacker.twitter} className="text-lightgreen hacker-social-icons"><FaTwitterSquare size='2.5rem' /></a>) : ''}
                  {userInfo.hacker.linkedin ? (<a href={userInfo.hacker.linkedin} className="text-lightgreen hacker-social-icons"><FaLinkedin size='2.5rem' /></a>) : ''}
                  {userInfo.hacker.github ? (<a href={userInfo.hacker.github} className="text-lightgreen hacker-social-icons"><FaGithub size='2.5rem' /></a>) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerInfo;