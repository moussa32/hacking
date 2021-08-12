import React, { useState } from "react";
import axios from "axios";
import { dvbaseUrl } from "../../api/Constants";

const ResetEmail = () => {
  const [credentials, setCredentials] = useState({ current_password: "", new_email: "" });
  const [isLoadding, setIsLoadding] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const token = localStorage.getItem("accessToken");

  const handleNewEmail = e => {
    e.preventDefault();

    if (credentials.new_email.length === 0 || credentials.current_password.length === 0) {
      setStatus({ type: "danger", message: "لا يمكنك ترك هذا الحقل فارغًا" });
    } else {
      setIsLoadding(true);
      axios
        .post(`${dvbaseUrl}/api/v1/auth/reset-email/`, credentials, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setIsLoadding(false);
          setStatus({ type: "success", message: `تم إرسال رابط التأكد من تغيير بريدك الالكتروني الحالي إلى ${credentials.new_email}` });
        })
        .catch(error => {
          setIsLoadding(false);
          if (error.response.status === 404) {
            setStatus({ type: "danger", message: "يوجد حساب مسجل بالفعل بهذا البريد الإلكتروني" });
          } else if (error.response.status === 403) {
            setStatus({ type: "danger", message: "هناك خطأ من جانب المستخدم" });
          }
        });
    }
  };

  return (
    <>
      <div className="row mx-2">
        <div className="col-md-12">
          <div className="alert alert-danger settings-alert" role="alert">
            <h4 className="alert-heading">تنبيه</h4>
            <p>في حالة تغييرك البريد الالكتروني سيتوقف العمل بالبريد القديم والحديث لمدة 24 ساعة تبدأ من تاريخ إثبات ملكية البريد الجديد.</p>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings" onSubmit={handleNewEmail}>
            <div className="form-group">
              <label htmlFor="password" className="mb-3">
                كلمة المرور الحاليه:
              </label>
              <input type="password" className="form-control custom-input border-0" id="current_password" onChange={e => setCredentials({ ...credentials, current_password: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="mb-3">
                البريد الالكتروني الجديد:
              </label>
              <input type="email" placeholder="example@gmail.com" className="form-control custom-input border-0" id="new_email" onChange={e => setCredentials({ ...credentials, new_email: e.target.value })} />
              <small className="form-text text-muted">سيصلك رابط تأكيد إلى بريدك الإلكتروني الحالي.</small>
            </div>
            <button type="submit" className="btn btn-settings d-block mx-auto settings-submit-button">
              تغيير البريد الالكتروني
            </button>
            {isLoadding && (
              <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
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

export default ResetEmail;
