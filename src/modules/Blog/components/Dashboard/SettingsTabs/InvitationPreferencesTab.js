import React, { useState } from "react";
import "./AuthenticationTab.css";

const InvitationPreferencesTab = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="row pb-4">
            <div className="col-md-12 mx-auto">
              <div className="card bg-second border-0 mx-4">
                <div className="card-body d-flex py-2">
                  <p className="m-0 mr-3 flex-fill option-text">أرغب في تلقي دعوات إلي برامج خاصة</p>
                  <div className="switch" onClick={() => setActive(!active)}>
                    <input type="checkbox" checked={active} onChange={event => setActive(event.currentTarget.checked)} />
                    <span className="slider"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4 mx-auto">
              <div className="card bg-second border-0 mx-4">
                <div className="card-body d-flex py-2">
                  <p className="m-0 mr-3 flex-fill option-text">إيقاف دعوة برنامج خاص</p>
                  <div className="switch" onClick={() => setActive(!active)}>
                    <input type="checkbox" checked={active} onChange={event => setActive(event.currentTarget.checked)} />
                    <span className="slider"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvitationPreferencesTab;
