import React from 'react';

import { VscLocation } from "react-icons/vsc";
import { DefaultAvatar } from '../../../../../assets/index';


import { dvbaseUrl } from "../../../../../api/Constants";


const ProgramInfo = ({ userInfo }) => {

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <img src={userInfo.logo ? (`${dvbaseUrl}/${userInfo.logo}`) : (`${DefaultAvatar}`)} className="rounded-circle hacker-image rounded mx-auto d-block mb-3" alt={userInfo.company_name} />
              <h2 className="hackerName text-white my-4">{userInfo.company_name}</h2>
              <p className="hackerLocation text-white lead">{userInfo.location ? <VscLocation /> : null}</p>
              <p className="hackerBio text-white lead">{userInfo.summery}</p>
              <div className="row mx-auto">
                <div className="col-md-12">
                  {userInfo.url ? <a href={userInfo.url}>{userInfo.url}</a> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgramInfo;