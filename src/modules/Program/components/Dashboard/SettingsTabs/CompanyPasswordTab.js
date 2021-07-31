import React, {useState} from "react";
import axios from "axios";
import {dvbaseUrl} from "../../../../../api/Constants";

const CompanyPasswordTab = () => {
  const [status, setStatus] = useState({type: "", message: ""});

  const handleNewPassword = (e) => {
    e.preventDefault();
    const userEmail = e.target[0].value;

    if (userEmail.length === 0) {
      setStatus({type: "danger", message: "لا يمكنك إعادة تعيين كلمة المرور بدون إدخال بريدك الالكتروني"});
    } else {
      axios
        .post(`${dvbaseUrl}/api/v2/auth/users/reset_password/`, {
          email: userEmail,
        })
        .then(
          (response) => {
            console.log(response);
            if (response.status === 204) {
              setStatus({type: "success", message: `تم إرسال رابط تغيير كلمة المرور إلى بريدك الالكتروني ${userEmail}`});
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings" onSubmit={handleNewPassword}>
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input type="email" placeholder="example@gmail.com" className="form-control custom-input border-0" id="email" aria-describedby="emailHelp" />
              <small className="form-text text-muted">برجاء كتابة البريد الإلكتروني المستخدم للإرسال رابط إعادة التعيين</small>
            </div>
            <button type="submit" className="btn btn-settings d-block mx-auto settings-submit-button">
              تغيير كلمة المرور
            </button>
            {status && (
              <div className={`mt-4 alert alert-${status.type}`} role="alert">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyPasswordTab;
