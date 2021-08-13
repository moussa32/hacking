import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResendEmailConfirmation } from "../../../../api/ResendEmailConfirmation";
import { handleSetUserToken, handleGetUserToken } from "../../actions";
import { useHistory } from "react-router-dom";
import { dvApiUrl } from "../../../../api/Constants";

const EmailVerify = () => {
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isLoadding, setIsLoadding] = useState(false);
  const [isTokenNotVaild, setIsTokenNotVaild] = useState(false);
  {
    /*Manage routing in ture conditions*/
  }
  const history = useHistory();
  const location = window.location.href;

  {
    /* Function that get access token from email url then store it in localstorage*/
  }
  const verifyUserToken = () => {
    const tokenFromURL = location.split("=")[2];

    handleSetUserToken("accessToken", tokenFromURL);
  };

  const onReSendEmail = () => {
    ResendEmailConfirmation(localStorage.getItem("accessToken")).then(res => {
      setIsLoadding(true);
      setStatus({ type: "success", message: "تم إعادة إرسال رمز جديد إلى بريدك الإلكتروني بنجاح" });
    });
  };

  useEffect(() => {
    verifyUserToken();
    setIsLoadding(true);

    const getUnAuth = handleGetUserToken("accessToken");
    const isPhoneNumberFromURL = location.split("=")[1].split("&")[0].toLowerCase();

    axios
      .get(`${dvApiUrl}/auth/verify-email/?token=${getUnAuth}`, {
        headers: {
          Authorization: `Bearer ${getUnAuth}`,
        },
      })
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم تفعيل بريدك الإلكتروني بنجاح جاري تحويلك" });
        if (isPhoneNumberFromURL === "true") {
          setTimeout(() => {
            history.push("/dashboard");
          }, 4000);
        } else {
          setTimeout(() => {
            history.push("/mobile-confirmation");
          }, 4000);
        }
      })
      .catch(function (error) {
        setIsLoadding(false);
        if (error.response) {
          if (error.response.status === 400) {
            setStatus({ type: "success", message: "لا يوجد بريد إلكتروني مرتبط بهذا الرمز" });

            setTimeout(() => {
              history.push("/email-confirmation");
            }, 3000);
          } else if (error.response.status === 401) {
            setStatus({ type: "danger", message: "لقد انتهت فترة الرمز برجاء طلب رمز اخر" });
            setIsTokenNotVaild(true);
          }
        }
      });
  }, []);

  return (
    <main class="component-wrapper">
      <div className="container home">
        <div className="jumbotron text-center py-4 bg-second">
          <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
            <label className="d-block text-right box-title">التحقق من البريد الإلكتروني</label>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  {isLoadding && (
                    <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  {status && (
                    <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
                      {status.message}
                    </div>
                  )}
                  {isTokenNotVaild && (
                    <small>
                      <button className="text-lightgreen d-block mx-auto pt-3 bg-transparent border-0" onClick={onReSendEmail}>
                        إعادة إرسال البريد الالكتروني
                      </button>
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmailVerify;
