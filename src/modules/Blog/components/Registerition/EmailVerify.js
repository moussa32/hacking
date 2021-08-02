import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSetUserToken, handleGetUserToken } from "../../actions";
import { useHistory } from "react-router-dom";
import { dvApiUrl } from "../../../../api/Constants";

const EmailVerify = () => {
  const [valid, setValid] = useState({
    token: "",
    error: "",
    success: "",
    isValid: false,
    isLoadding: true,
  });
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

  useEffect(() => {
    verifyUserToken();

    const getUnAuth = handleGetUserToken("accessToken");
    const isPhoneNumberFromURL = location.split("=")[1].split("&")[0].toLowerCase();

    axios
      .get(`${dvApiUrl}/auth/verify-email/?token=${getUnAuth}`, {
        headers: {
          Authorization: `Bearer ${getUnAuth}`,
        },
      })
      .then(res => {
        setValid({ ...valid, error: "", success: "تم تفعيل بريدك الإلكتروني بنجاح جاري تحويلك" });
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
        if (error.response) {
          if (error.response.status === 400) {
            setValid({ ...valid, error: "لا يوجد بريد إلكتروني مرتبط بهذا الرمز" });

            setTimeout(() => {
              history.push("/email-confirmation");
            }, 3000);
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
                  {valid.error ? (
                    <div class="alert alert-danger mt-4 text-center" role="alert">
                      {valid.error}
                    </div>
                  ) : (
                    ""
                  )}
                  {valid.success ? (
                    <div class="alert alert-success mt-4 text-center" role="alert">
                      {valid.success}
                    </div>
                  ) : (
                    ""
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
