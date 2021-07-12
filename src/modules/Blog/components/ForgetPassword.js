import React, { useState } from 'react';
import axios from 'axios';
import { dvbaseUrl } from "../../../api/Constants";

const PasswordTab = () => {
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleNewPassword = (e) => {
    e.preventDefault();
    const userEmail = e.target[0].value;
    console.log(userEmail);

    if (userEmail.length === 0) {
      setStatus({ type: "danger", message: "لا يمكنك إعادة تعيين كلمة المرور بدون إدخال بريدك الالكتروني" });
    }
    else {
      axios.post(`${dvbaseUrl}/api/v2/auth/users/reset_password/`, {
        "email": userEmail
      }).then((response) => {
        if (response.status === 204) {
          setStatus({ type: "success", message: `تم إرسال رابط إعادة تعيين كلمة المرور الي بريدك الالكتروني ${userEmail}` });
        }
      }).catch(function (error) {
        setStatus({ type: "danger", message: "هناك خطاء ما" });
      })
    }

  }

  return (
    <div className="container home">
      <div className="row mx-2">
        <div className="col-md-8 mx-auto">
          <form className="profile-settings" onSubmit={handleNewPassword}>
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input type="email" placeholder="example@gmail.com" className="form-control custom-input border-0" id="email" aria-describedby="emailHelp" />
              <small className="form-text text-muted">برجاء كتابة البريد الإلكتروني المستخدم للإرسال رابط إعادة تعيين كلمة المرور</small>
            </div>
            <button type="submit" className="btn btn-settings d-block mx-auto settings-submit-button">إرسال</button>
            {status && <div className={`mt-4 alert alert-${status.type} text-center`} role="alert">
              {status.message}
            </div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordTab;