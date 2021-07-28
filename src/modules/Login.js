import React, {useState} from "react";
import {WhiteLogo} from "../assets/index";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {handleSetUserToken, handleGetUserToken} from "./Blog/actions/index";
import {dvApiUrl} from "../api/Constants";

const Login = () => {
  const [isLoadding, setIsLoadding] = useState(false);
  const [status, setStatus] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    formIsValid: false,
  });
  const [userType, setUserType] = useState({
    type: "program",
  });
  let history = useHistory();
  const redirectTimeOut = 3000;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoadding(true);

    if (!credentials.username || !credentials.password) {
      setStatus({type: "danger", message: "برجاء عدم ترك اي حقل فارغ"});
      return "";
    } else {
      setStatus({type: "", message: ""});

      axios
        .post(`${dvApiUrl}/auth/hackers/login/`, credentials)
        .then((res) => {
          handleSetUserToken("accessToken", res.data.access);
          handleSetUserToken("refreshToken", res.data.refresh);
          setStatus({type: "success", message: "تم تسجيل الدخول بنجاح جاري تحويلك"});
          setIsLoadding(false);

          if (userType.type === "user") {
            setTimeout(() => {
              history.push("/dashboard");
            }, redirectTimeOut);
          } else {
            setTimeout(() => {
              history.push("program/dashboard");
            }, redirectTimeOut);
          }
        })
        .catch(function (error) {
          setIsLoadding(false);
          if (error.response) {
            if (error.response.status === 401) {
              setStatus({type: "danger", message: "برجاء التأكد من اسم أو كلمة المرور"});
            } else if (error.response.status === 404) {
              setStatus({type: "danger", message: "تحقق من البيانات المدخلة"});
            } else if (error.response.status === 429) {
              setStatus({type: "danger", message: " لقد سجلت بيانات الدخول بشكل خاطئ العديد من المرات أنتظر دقيقة"});
            }
          }
        });
    }
  };

  const handleUserLoginInputs = (e) => {
    const username = e.target.name;
    const password = e.target.value;
    setCredentials({...credentials, [username]: password});
  };

  return (
    <main className="component-wrapper login-wrapper">
      <div className="container home">
        <div className="row">
          <div className="col-md-6 mx-auto p-4 bg-black rounded">
            <img className="login-logo d-block mx-auto" src={WhiteLogo} alt="Logo" />
            <h3 className="text-center py-4">تسجيل الدخول</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="usernameOrEmail">إسم المستخدم</label>
                <input type="text" name="username" value={credentials.username} onChange={(e) => handleUserLoginInputs(e)} className="form-control custom-input" id="usernameOrEmail" aria-describedby="emailHelp" required />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">كلمة المرور</label>
                <input name="password" type="password" value={credentials.password} onChange={(e) => handleUserLoginInputs(e)} className="form-control custom-input" id="passwordInput" required />
              </div>
              <div className="form-group py-1">
                <Link className="text-lightgreen" to="/forget-password">
                  نسيت كلمة المرور
                </Link>
              </div>
              <button type="submit" className="btn btn-lightgreen mx-auto d-block btn-lg">
                تسجيل الدخول
              </button>
              {isLoadding ? (
                <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null}
              {status ? (
                <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
                  {status.message}
                </div>
              ) : (
                ""
              )}
              <p className="text-center py-3">
                إنشاء حساب جديد؟{" "}
                <Link to="/sign-up" className="text-lightgreen">
                  إنشاء
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
