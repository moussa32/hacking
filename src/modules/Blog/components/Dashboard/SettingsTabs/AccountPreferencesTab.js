import React from 'react';
import "./AccountPreferencesTab.css";

const AccountPreferencesTab = () => {
  return (
    <>
      <div className="row mx-2">
        <h4 class="mr-3 mb-3">أظهر الارباح</h4>
        <div className="col-md-12">
          <div className="jumbotron jumbotron-fluid bg-second py-4 mb-1">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-check mb-3">
                    <input className="custom-checkbox" type="checkbox" value="Show" id="show-profit" />
                    <span class="checkmark"></span>
                    <label className="form-check-label" for="show-profit">
                      أظهر
                  </label>
                  </div>
                  <div className="form-check">
                    <input className="custom-checkbox" type="checkbox" value="hide" id="hide-profit" />
                    <span class="checkmark"></span>
                    <label className="form-check-label" for="hide-profit">
                      أخفي
                  </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <h4 class="mr-3 my-3">المظهر:</h4>
        <div className="col-md-12">
          <div className="jumbotron jumbotron-fluid bg-second py-4 mb-4">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-check mb-3">
                    <input className="custom-checkbox" type="checkbox" value="light" id="theme-light" />
                    <span class="checkmark"></span>
                    <label className="form-check-label" for="theme-light">
                      أبيض
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="custom-checkbox" type="checkbox" value="dark" id="theme-dark" />
                    <span class="checkmark"></span>
                    <label className="form-check-label" for="theme-dark">
                      غامق
                  </label>
                  </div>
                  <div className="form-check">
                    <input className="custom-checkbox" type="checkbox" value="auto" id="theme-auto" />
                    <span class="checkmark"></span>
                    <label className="form-check-label" for="theme-auto">
                      تلقائي
                  </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPreferencesTab;