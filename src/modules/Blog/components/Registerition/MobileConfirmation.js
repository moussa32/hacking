import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./MobileConfirmation.css";
import ar from "react-phone-input-2/lang/ar.json";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { dvApiUrl } from "../../../../api/Constants";
import { handleGetUserToken, handleSetUserToken } from "../../actions/index";

const MobileConfirmation = () => {
  const history = useHistory();
  const token = handleGetUserToken("accessToken");
  const reFreshtoken = handleGetUserToken("refreshToken");

  const [phoneNumber, setPhoneNumber] = useState({ phone_number: "" });
  const [status, setStatus] = useState({
    error: "",
    success: "",
  });

  const handlePhoneNumber = e => {
    setPhoneNumber({ phone_number: `+${e}` });
  };

  const sendPhoneNumber = () => {
    axios
      .post(`${dvApiUrl}/auth/hackers/verify-phone/`, phoneNumber, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setStatus({ ...status });
        setStatus({ success: "تم إرسال الكود بنجاح برجاء التحقق من هاتفك" });
        handleSetUserToken("phoneNumber", phoneNumber.phone_number);
        setTimeout(() => {
          history.push("/sms-confirmation");
        }, 1000);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          if (error.response.status === 500) {
            setStatus({ error: "هناك مشكلة في الخادم فى الوقت الحالي" });
          } else if (error.response.status === 406) {
            setStatus({ error: "الرقم غير صالح" });
          } else if (error.response.status === 400) {
            setStatus({ error: "هذا الرقم مسجل بالفعل" });
          } else if (error.response.status === 401) {
            setStatus({ error: "لقد انتهت جلستك برجاء إعادة تحميل الصفحة" });

            axios
              .post(
                `${dvApiUrl}/auth/hackers/refresh/`,
                { refresh: reFreshtoken },
                {
                  headers: {
                    Authorization: `Bearer ${reFreshtoken}`,
                  },
                }
              )
              .then(res => {
                handleSetUserToken("accessToken", res.data.access);
                handleSetUserToken("refreshToken", res.data.refresh);
              })
              .catch(function (error) {
                if (error.response.status === 401) {
                  setStatus({ error: error.response.data.detail });
                }
              });
          }
        }
      });
  };

  return (
    <main className="component-wrapper">
      <div className="container home">
        <div className="jumbotron text-center py-4 bg-second">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-black">
              <li className="breadcrumb-item py-1">
                <FaCheckCircle className="check-progress ml-2" size={"1.5em"} /> التحقق من البريد الالكتروني
              </li>
            </ol>
          </nav>
          <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
            <label className="d-block text-right box-title">التحقق من رقم الهاتف</label>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <PhoneInput
                    country={"kw"}
                    name="phone_number"
                    localization={ar}
                    enableSearch={true}
                    excludeCountries={"il"}
                    onChange={e => {
                      handlePhoneNumber(e);
                    }}
                  />
                  {status.error ? (
                    <div className="alert alert-danger mt-4 text-center" role="alert">
                      {status.error}
                    </div>
                  ) : (
                    ""
                  )}
                  {status.success ? (
                    <div className="alert alert-success mt-4 text-center" role="alert">
                      {status.success}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <button onClick={sendPhoneNumber} className="btn btn-lightgreen my-4 d-block mx-auto">
                التحقق
              </button>
              <small className="d-block">ستصلك رسالة SMS برمز التحقق الخاص بك</small>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MobileConfirmation;
