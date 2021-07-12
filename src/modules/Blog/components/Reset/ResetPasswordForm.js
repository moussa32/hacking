import React, { useState } from "react";
import { AiFillSafetyCertificate } from 'react-icons/ai';
import axios from "axios";
import { dvbaseUrl } from "../../../../api/Constants";
import { handleRemoveUserToken } from "../../actions/index";
import { useHistory } from "react-router-dom";

const ResetPasswordForm = ({ uid, token }) => {
  const [status, setStatus] = useState({ type: '', message: '' });
  const history = useHistory();


  const handleResetPasswordForm = (e) => {
    e.preventDefault();
    const firstInput = e.target[0].value;
    const secondInput = e.target[1].value;

    if (firstInput.length === 0 || secondInput.length === 0) {
      setStatus({ type: "danger", message: "لا يمكنك ترك احد الحقول خاليه" });
    } else if (firstInput !== secondInput) {
      setStatus({ type: "danger", message: "يجب ان تكون كلمة المرور متطابقة" });
    } else if (firstInput.length < 8) {
      setStatus({ type: "danger", message: "يجب ان لا تقل كلمة المرور عن 8 أحرف" });
    }
    else {
      axios.post(`${dvbaseUrl}/api/v2/auth/users/reset_password_confirm/`, {
        "uid": uid,
        "token": token,
        "new_password": firstInput
      }).then(() => {
        setStatus({ type: "success", message: "تم تغيير كلمة المرور بنجاح برجاء الانتظار جاري تحويلك" });

        handleRemoveUserToken("accessToken");
        handleRemoveUserToken("refreshToken");

        setTimeout(() => {
          history.push("/login");
        }, 2000);

      }).catch(function (error) {
        if (error.response.data.token) {
          setStatus({ type: "danger", message: error.response.data.token });
        } else if (error.response.data.new_password[0]) {
          setStatus({ type: "danger", message: error.response.data.new_password[0] });
        }
      })
    }

  }

  return (
    <div className="row">
      <div className="col-md-8 mx-auto bg-second rounded">
        <form className="p-4" onSubmit={handleResetPasswordForm}>
          <div className="form-group">
            <label htmlFor="newPassword"><AiFillSafetyCertificate className="text-lightgreen" size={"1.5rem"} /> كلمة المرور الجديده:</label>
            <input
              type="password"
              placeholder="كلمة المرور"
              className="form-control custom-input"
              id="newPassword"
              aria-describedby="passwordHelp"
            />
            <small id="passwordHelp" className="form-text text-muted">برجاء اختيار كلمة مرور قوية لضمان حمايتك</small>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="rePassword"><AiFillSafetyCertificate className="text-lightgreen" size={"1.5rem"} /> إعادة كتابة كلمة المرور الجديده</label>
            <input
              type="password"
              placeholder="كلمة المرور"
              className="form-control custom-input"
              id="rePassword"
            />
          </div>
          <button type="submit" className="btn btn-lightgreen w-50 mx-auto d-block mt-4">تغيير</button>
        </form>
        {status && <div className={`alert alert-${status.type}`} role="alert">
          {status.message}
        </div>}
      </div>
    </div>
  )
}

export default ResetPasswordForm;