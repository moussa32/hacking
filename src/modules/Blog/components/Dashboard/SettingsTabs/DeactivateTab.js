import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const DeactivateTab = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings">
            <div className="form-group">
              <label for="currentPassword">كلمة المرور</label>
              <div class="input-group mb-3">
                <input type={showPassword ? "text" : "password"} class="form-control custom-input border-0" aria-label="Current password" aria-describedby="currentPassword" />
                <div class="input-group-append position-relative">
                  {showPassword ? (<FaEyeSlash size={"1.5rem"} className="text-muted settings-show-password" onClick={handleShowPassword} />) : (<FaEye size={"1.5rem"} className="text-muted settings-show-password" onClick={handleShowPassword} />)}
                </div>
              </div>
              <small className="form-text text-muted">برجاء كتابة كلمة المرور الحالية حتى تستيطع تعطيل الحساب</small>
            </div>
            <button type="submit" className="btn btn-settings d-block mr-auto settings-submit-button">تعطيل الحساب</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeactivateTab;