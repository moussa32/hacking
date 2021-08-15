import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Blog/components/layout/Navbar";
import { dvApiUrl } from "../api/Constants";
import { GreenLogo } from "../assets/index";
import { FaUserAlt, FaKey } from "react-icons/fa";

const Login = props => {
  const [isLoadding, setIsLoadding] = useState(false);
  const [status, setStatus] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    formIsValid: false,
  });

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      if (localStorage.getItem("type") === "hacker") {
        window.location.pathname = "/dashboard";
      } else if (localStorage.getItem("type") === "program") {
        window.location.pathname = "/program/dashboard";
      }
    }
  }, []);

  let history = useHistory();
  const redirectTimeOut = 3000;

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoadding(true);

    if (!credentials.username || !credentials.password) {
      setIsLoadding(false);
      setStatus({ type: "danger", message: "برجاء عدم ترك اي حقل فارغ" });
      return "";
    } else {
      setStatus({});
      axios
        .post(`${dvApiUrl}/auth/hackers/login/`, credentials)
        .then(res => {
          setIsLoadding(false);
          setStatus({ type: "success", message: "تم تسجيل الدخول بنجاح جاري تحويلك" });
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
          localStorage.setItem("isAuthenticated", "true");

          const userType = res.data.type;
          localStorage.setItem("type", userType);

          if (userType === "hacker") {
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
              setStatus({ type: "danger", message: "برجاء التأكد من اسم أو كلمة المرور" });
            } else if (error.response.status === 404) {
              setStatus({ type: "danger", message: "تحقق من البيانات المدخلة" });
            } else if (error.response.status === 429) {
              setStatus({ type: "danger", message: " لقد سجلت بيانات الدخول بشكل خاطئ العديد من المرات أنتظر دقيقة" });
            } else if (error.response.status === 500) {
              setStatus({ type: "danger", message: "هناك مشكلة في الخادم برجاء تسجيل الدخول في وقت لاحق" });
            }
          }
        });
    }
  };

  const handleUserLoginInputs = e => {
    const username = e.target.name;
    const password = e.target.value;
    setCredentials({ ...credentials, [username]: password });
  };

  return (
    <>
      <Navbar currentPathname={props.location.pathname} />
      <main className="component-wrapper login-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto p-4 login-form-wrapper rounded">
              <img className="login-logo d-block mx-auto" src={GreenLogo} alt="Logo" />
              <h3 className="text-center py-4">تسجيل الدخول</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="usernameOrEmail">اسم المستخدم</label>
                  <div className="input-group mb-3">
                    <div className="input-group-append position-relative">
                      <FaUserAlt size={"1.1rem"} className="text-muted login-username-icon" />
                    </div>
                    <input type="text" name="username" placeholder="اسم المستخدم او البريد الالكتروني" value={credentials.username} onChange={e => handleUserLoginInputs(e)} className="form-control custom-input input-with-icon" id="usernameOrEmail" aria-describedby="emailHelp" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">كلمة المرور</label>
                  <div className="input-group mb-3">
                    <div className="input-group-append position-relative">
                      <FaKey size={"1.1rem"} className="text-muted login-username-icon" />
                    </div>
                    <input name="password" type="password" placeholder="كلمة المرور" value={credentials.password} onChange={e => handleUserLoginInputs(e)} className="form-control custom-input input-with-icon" id="passwordInput" required />
                  </div>
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
                  <Link to="/signup" className="text-lightgreen">
                    إنشاء حساب جديد؟
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
