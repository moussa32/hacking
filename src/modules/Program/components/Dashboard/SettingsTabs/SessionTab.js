import React from 'react';
import "./SessionTab.css";
import { RiComputerLine } from 'react-icons/ri';

const SessionTab = () => {
  return (
    <>
      <div className="row mx-2">
        <div className="col-md-12">
          <div className="card bg-second mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <RiComputerLine className="text-lightgreen m-auto d-block h-100" size={"9rem"} />
              </div>
              <div className="col-md-8">
                <div className="card-body text-left">
                  <p className="card-text session-info"><span className="session-title text-lightgreen">Ip address :</span> 154.141.147.244</p>
                  <p className="card-text session-info"><span className="session-title text-lightgreen">User Agent :</span> Chrome on Windows 10</p>
                  <p className="card-text session-info"><span className="session-title text-lightgreen">Location :</span> Egypt</p>
                  <p className="card-text session-info"><span className="session-title text-lightgreen">Signed in :</span> March 17th,2021 at 2:49:27 pm (20 mins ago)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionTab;