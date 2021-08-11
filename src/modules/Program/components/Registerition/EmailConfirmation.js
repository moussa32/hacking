import React, { useState } from "react";
import axios from "axios";
import { EmailConfirmationImage } from "../../../../assets/index";

const EmailConfirmation = () => {
  const Email = localStorage.getItem("registerEmail");
  const token = localStorage.getItem("accessToken");
  const [status, setStatus] = useState({});
  const [isLoadding, setIsLoadding] = useState(false);

  const onReSendEmail = () => {
    setIsLoadding(true);
    axios
      .post(
        "https://bugbounty.pythonanywhere.com/api/v1/auth/hackers/resend-email/",
        { token: token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        localStorage.setItem("accessToken", res.data.access_token);
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم إعادة إرسال رابط التفعيل بنجاح برجاء التأكد من بريد الإلكتروني" });
      })
      .catch(error => {
        setIsLoadding(false);
        if (error.respone.status === 400) {
          setStatus({ type: "danger", message: "يجب ان يكون لديك حساب" });
        }
      });
  };

  return (
    <main className="component-wrapper">
      {Email ? (
        <div className="container home">
          <div className="jumbotron text-center bg-second">
            <p className="lead">
              لقد أرسلنا بريدًا إلكترونيًا إلى{" "}
              <a href={`mailto:${Email}`} target="_blank" rel="noreferrer" className="text-lightgreen">
                {Email}
              </a>
            </p>
            <p>يرجى التحقق من بريدك الإلكتروني والتحقق من حسابك, للمتابعة.</p>
            <img src={EmailConfirmationImage} className="d-block mx-auto py-3 email-confirmation-icon" alt="Email confirmation" />
            <small>لم تتلق البريد الإلكتروني؟</small>
            <small>
              <button className="text-lightgreen d-block mx-auto pt-3 bg-transparent border-0" onClick={onReSendEmail}>
                إعادة إرسال البريد الإلكتروني
              </button>
            </small>
            {isLoadding ? (
              <div className="spinner-border mt-3 d-block mx-auto text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className={`alert alert-${status.type} mt-3`} role="alert">
                {status.message}
              </div>
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

export default EmailConfirmation;
