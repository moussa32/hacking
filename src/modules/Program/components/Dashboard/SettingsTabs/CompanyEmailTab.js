import React, {useState} from "react";
import axios from "axios";
import {dvbaseUrl} from "../../../../../api/Constants";

const CompanyEmailTab = () => {
  const [status, setStatus] = useState({type: "", message: ""});

  const handleNewEmail = (e) => {
    e.preventDefault();
    const userEmail = e.target[0].value;
    console.log(userEmail);

    if (userEmail.length === 0) {
      setStatus({type: "danger", message: "لا يمكنك ترك هذا الحقل فارغًا"});
    } else {
      axios
        .post(`${dvbaseUrl}/api/v2/auth/users/reset_username/`, {
          email: userEmail,
        })
        .then((response) => {
          console.log(response);
          setStatus({type: "success", message: `تم إرسال رابط التأكد من تغيير بريدك الالكتروني الحالي إلى ${userEmail}`});
        });
    }
  };

  return (
    <>
      <div className="row mx-2">
        <div className="col-md-12">
          <div className="alert alert-danger settings-alert" role="alert">
            <h4 className="alert-heading">تنبيه</h4>
            <p>في حالة تغييرك البريد الالكتروني سيتوقف العمل بالبريد القديم والحديث لمدة 24 ساعة تبدا من تاريخ اثبات ملكية البريد الجديد.</p>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings" onSubmit={handleNewEmail}>
            <div className="form-group">
              <label htmlFor="email" className="mb-3">
                البريد الإلكتروني الجديد:
              </label>
              <input type="email" placeholder="example@gmail.com" className="form-control custom-input border-0" id="email" aria-describedby="emailHelp" />
              <small className="form-text text-muted">سيصلك رابط تأكيد إلى بريدك الإلكتروني الحالي.</small>
            </div>
            <button type="submit" className="btn btn-settings d-block mx-auto settings-submit-button">
              تغيير البريد الإلكتروني
            </button>
            {status && (
              <div className={`mt-4 alert alert-${status.type} text-center`} role="alert">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyEmailTab;
