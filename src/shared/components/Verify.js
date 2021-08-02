import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { dvApiUrl } from "../../api/Constants";

const Verify = () => {
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isLoadding, setIsLoadding] = useState(true);

  {
    /*Manage routing in ture conditions*/
  }
  const history = useHistory();

  {
    /* Function that get access token from email url then store it in localstorage*/
  }
  const verifyUserToken = () => {
    const location = window.location.href;
    const tokenFromURL = location.split("=")[1];

    if (tokenFromURL) {
      localStorage.setItem("accessToken", tokenFromURL);
    } else {
      setStatus({ type: "danger", message: "لم يتم التعرف على الرمز" });
    }
  };

  useEffect(() => {
    verifyUserToken();

    const getUnAuth = localStorage.getItem("accessToken");

    axios
      .get(`${dvApiUrl}/auth/verify-email/?token=${getUnAuth}`, {
        headers: {
          Authorization: `Bearer ${getUnAuth}`,
        },
      })
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم تفعيل بريدك الإلكتروني بنجاح جاري تحويلك" });

        localStorage.removeItem("registerEmail");
        setTimeout(() => {
          history.push("/program/dashboard");
        }, 5000);
      })
      .catch(function (error) {
        setIsLoadding(false);
        if (error.response) {
          if (error.response.status === 400) {
            setStatus({ type: "danger", message: "لا يوجد بريد إلكتروني مرتبط بهذا الرمز" });
            setTimeout(() => {
              history.push("/program/email-confirmation");
            }, 5000);
          } else if (error.response.status === 404) {
            setStatus({ type: "danger", message: "هناك خطأ في الخادم" });
          } else if (error.response.status === 401) {
            setStatus({ type: "danger", message: "لقد انتهت فترة الرمز برجاء طلب رمز اخر" });
          }
        }
      });
  }, []);

  return (
    <main className="component-wrapper">
      <div className="container home">
        <div className="jumbotron text-center py-4 bg-second">
          <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
            <label className="d-block text-right box-title">التحقق من البريد الإلكتروني</label>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Verify;
