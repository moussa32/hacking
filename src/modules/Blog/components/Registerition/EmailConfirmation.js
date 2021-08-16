import React, { useState } from "react";
import { EmailConfirmationImage } from "../../../../assets/index";
import { ResendEmailConfirmation } from "../../../../api/ResendEmailConfirmation";
import { handleGetUserToken, handleSetUserToken } from "../../actions";

const Confirmation = () => {
  const hackerEmail = localStorage.getItem("registerEmail");
  const token = handleGetUserToken("accessToken");
  const [status, setStatus] = useState({});

  const onReSendEmail = () => {
    ResendEmailConfirmation(token)
      .then(res => {
        handleSetUserToken("accessToken", res.data.access_token);
        localStorage.removeItem("registerEmail");
        setStatus({ success: "تم إعادة إرسال رابط التفعيل بنجاح برجاء التأكد من بريد الإلكتروني" });
      })
      .catch(error => {
        if (error.respone.status === 400) {
          setStatus({ error: "يجب ان يكون لديك حساب" });
        }
      });
  };

  return (
    <main className="component-wrapper">
      {hackerEmail ? (
        <div className="container home">
          <div className="jumbotron text-center bg-second">
            <p className="lead">
              لقد أرسلنا بريدًا الكترونيًا إلى{" "}
              <a href={`mailto:${hackerEmail}`} target="_blank" rel="noreferrer" className="text-lightgreen">
                {hackerEmail}
              </a>
            </p>
            <p>يرجى التحقق من بريدك الالكتروني والتحقق من حسابك للمتابعة.</p>
            <img src={EmailConfirmationImage} className="d-block mx-auto py-3 email-confirmation-icon" />
            <small>هل تلقيت البريد الالكتروني؟</small>
            <small>
              <button className="text-lightgreen d-block mx-auto pt-3 bg-transparent border-0" onClick={onReSendEmail}>
                إعادة إرسال البريد الالكتروني
              </button>
            </small>
            {status.success ? (
              <div className="alert alert-success mt-3" role="alert">
                {status.success}
              </div>
            ) : (
              ""
            )}
            {status.error ? (
              <div className="alert alert-danger mt-3" role="alert">
                {status.error}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="container home">
          <div className="jumbotron text-center bg-second">
            <p className="lead">لا يوجد بريد إلكتروني حاليا برجاء إنشاء حساب جديد او تسجيل الدخول في حالة تم تفعيل حسابك</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Confirmation;
