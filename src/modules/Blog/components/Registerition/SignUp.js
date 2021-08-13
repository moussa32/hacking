import React, { useState } from "react";
import Logo from "../../../../assets/images/green-logo.svg";
import { CountryDropdown } from "react-country-region-selector";
import { sendUserInfo } from "../../../../api/SignUpApi";
import "./SignUp.css";

import ReCAPTCHA from "react-google-recaptcha";
import { BLOG_APP_CAPTCHA_KEY } from "../../../../shared/constants/constants";
import { Link, useHistory } from "react-router-dom";
import { handleSetUserToken } from "../../actions/index";

const SignUp = ({ setParentData }) => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    birthDate: "",
    country: "",
    password: "",
    rePassword: "",
    accept_rules: false,
  });
  const [status, setStatus] = useState({
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    genderError: "",
    birthDateError: "",
    countryError: "",
    passwordError: "",
    rePasswordError: "",
    accept_rulesError: "",
  });
  const history = useHistory();

  const onTyping = e => {
    e.persist();
    debugger;
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    console.log(signUpData);
  };

  const onSetCountry = e => {
    debugger;
    setSignUpData({ ...signUpData, country: e });
  };

  const handleCheck = e => {
    setSignUpData({ ...signUpData, accept_rules: e.target.checked });
  };

  const handleValidation = () => {
    let usernameError = "";
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let genderError = "";
    let birthDateError = "";
    let countryError = "";
    let passwordError = "";
    let rePasswordError = "";
    let accept_rulesError = "";

    if (!signUpData.firstName) {
      firstNameError = "مطلوب";
    }

    if (firstNameError) {
      setStatus({ firstNameError });
      return false;
    }

    if (!signUpData.lastName) {
      lastNameError = "مطلوب";
    }

    if (lastNameError) {
      setStatus({ lastNameError });
      return false;
    }

    if (!signUpData.username) {
      usernameError = "مطلوب";
    }

    if (usernameError) {
      setStatus({ usernameError });
      return false;
    }

    if (signUpData.username.length < 4) {
      usernameError = "يجب ان يكون اسم المستخدم أكثر من 4 أحرف";
    }

    if (usernameError) {
      setStatus({ usernameError });
      return false;
    }

    if (!signUpData.email) {
      emailError = "مطلوب";
    }

    if (emailError) {
      setStatus({ emailError });
      return false;
    }

    if (!signUpData.gender) {
      genderError = "مطلوب";
    }

    if (genderError) {
      setStatus({ genderError });
      return false;
    }

    if (!signUpData.birthDate) {
      birthDateError = "مطلوب";
    }

    if (birthDateError) {
      setStatus({ birthDateError });
      return false;
    }

    if (!signUpData.country) {
      countryError = "مطلوب";
    }

    if (countryError) {
      setStatus({ countryError });
      return false;
    }

    if (!signUpData.password) {
      passwordError = "مطلوب";
    }

    if (passwordError) {
      setStatus({ passwordError });
      return false;
    }

    if (!signUpData.rePassword) {
      rePasswordError = "مطلوب";
    }

    if (rePasswordError) {
      setStatus({ rePasswordError });
      return false;
    }

    if (!signUpData.accept_rules) {
      accept_rulesError = "مطلوب";
    }

    if (accept_rulesError) {
      setStatus({ accept_rulesError });
      return false;
    }

    if (signUpData.password.length < 8) {
      passwordError = "يجب ان تكون كلمة المرور أكثر من 8 أحرف";
    }

    if (passwordError) {
      setStatus({ passwordError });
      return false;
    }

    if (signUpData.password !== signUpData.rePassword) {
      rePasswordError = "يجب ان تكون كلمة المرور متطابقة";
    }

    if (rePasswordError) {
      setStatus({ rePasswordError });
      return false;
    }

    return true;
  };

  const Registration = e => {
    e.preventDefault();
    const isValid = handleValidation();
    console.log(isValid);

    if (isValid) {
      const dataToBeSent = {
        first_name: signUpData.firstName,
        last_name: signUpData.lastName,
        username: signUpData.username,
        email: signUpData.email,
        gender: signUpData.gender,
        birth_date: signUpData.birthDate,
        country: signUpData.country,
        password: signUpData.password,
        accept_rules: signUpData.accept_rules,
      };

      let sendData = sendUserInfo(dataToBeSent);

      sendData
        .then(res => {
          console.log(res.data);

          /*Send submited data to Home Component to handle it in next step*/
          setParentData(res.data);

          handleSetUserToken("refreshToken", res.data.tokens.refresh_token);
          handleSetUserToken("type", res.data.hacker_data.role);
          handleSetUserToken("accessToken", res.data.tokens.access_token);

          /*Redirect to next step*/
          history.push("/email-confirmation");
        })
        .catch(function (error) {
          const errorArray = error.response.data;
          if (error.response.status === 400) {
            console.log(errorArray);
            if (error.response.data.username) {
              setStatus({ usernameError: error.response.data.username });
            } else if (error.response.data.email) {
              setStatus({ emailError: error.response.data.email });
            } else if (error.response.status === 500) {
              setStatus({ type: "danger", message: "هناك مشكلة في الخادم في الوقت الحالي برجاء المحاولة في وقت لاحق" });
            }
            for (const [key, value] of Object.entries(errorArray)) {
              setStatus({ ...status, key: value });
              console.log(status);
            }
          }
        });
      return sendData;
    }
  };

  return (
    <main className="component-wrapper sign-up-wrapper">
      <div className="container-fluid home pt-4">
        <div className="row">
          <div className="col-md-6 signup-form-section bg-black">
            <h2 className="py-2 text-center">إنشاء حساب جديد</h2>
            <form onSubmit={Registration}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="firstName">الاسم الأول</label>
                  <input type="text" className="form-control custom-input" value={signUpData.firstName} name="firstName" id="firstName" onChange={onTyping} />
                  {status.firstNameError ? (
                    <div class="mt-2 alert alert-danger custom-danger-alert" role="alert">
                      {status.firstNameError}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <label for="secondName">الاسم الأخير</label>
                  <input type="text" className="form-control custom-input" name="lastName" id="lastName" onChange={onTyping} />
                  {status.lastNameError ? (
                    <div class="mt-2 alert alert-danger custom-danger-alert" role="alert">
                      {status.lastNameError}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group">
                <label for="username">اسم المستخدم</label>
                <input type="text" className="form-control custom-input" name="username" id="username" onChange={onTyping} />
                {status.usernameError ? (
                  <div class="mt-2 alert alert-danger" role="alert">
                    {status.usernameError}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label for="email">البريد الالكتروني</label>
                <input type="email" className="form-control custom-input" name="email" id="email" onChange={onTyping} />
                {status.emailError ? (
                  <div class="mt-2 alert alert-danger" role="alert">
                    {status.emailError}
                  </div>
                ) : null}
              </div>
              <fieldset className="form-group row">
                <legend className="col-form-label col-sm-2 float-sm-left pt-0">الجنس</legend>
                <div className="col-sm-10 d-flex justify-content-md-end">
                  <div className="form-check">
                    <label className="form-check-label mr-4" for="femaleGender">
                      أنثى
                    </label>
                    <input className="form-check-input custom-input" type="radio" name="gender" id="femaleChose" value="female" onChange={onTyping} />
                  </div>
                  <div className="form-check">
                    <label className="form-check-label mr-4" for="maleChose">
                      ذكر
                    </label>
                    <input className="form-check-input custom-input" type="radio" name="gender" id="maleChose" value="male" onChange={onTyping} />
                  </div>
                </div>
              </fieldset>
              {status.genderError ? (
                <div class="mt-2 alert alert-danger" role="alert">
                  {status.genderError}
                </div>
              ) : null}
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label for="inputCity">تاريخ الميلاد</label>
                </div>
                <div className="form-group col-md-7">
                  <input type="date" placeholder="تاريخ الميلاد" name="birthDate" className="form-control custom-input birthdate-input" id="dat" onChange={onTyping} />
                </div>
                {status.birthDateError ? (
                  <div class="mt-2 alert alert-danger w-100 text-center" role="alert">
                    {status.birthDateError}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label for="exampleFormControlSelect1">الدولة</label>
                <CountryDropdown value={signUpData.country} className="form-control custom-input country-input" name="country" onChange={onSetCountry} />
                {status.countryError ? (
                  <div class="mt-2 alert alert-danger" role="alert">
                    {status.countryError}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label for="password">كلمة المرور</label>
                <input type="password" className="form-control custom-input" name="password" id="password" onChange={onTyping} />
                {status.passwordError ? (
                  <div class="mt-2 alert alert-danger" role="alert">
                    {status.passwordError}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label for="re-password">تأكيد كلمة المرور</label>
                <input type="password" className="form-control custom-input" id="re-password" name="rePassword" onChange={onTyping} />
                {status.rePasswordError ? (
                  <div class="mt-2 alert alert-danger" role="alert">
                    {status.rePasswordError}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label className="suggestion-password text-lightgreen">اقتراحات لكلمة مرور قوية</label>
                <ul>
                  <li className="sugesstion-password-item">
                    <small>مزيج من الأحرف الكبيرة والصغيرة والأرقام والأحرف الخاصة</small>
                  </li>
                  <li className="sugesstion-password-item">
                    <small>
                      <span className="ml-1">8</span> خانات على الأقل
                    </small>
                  </li>
                  <li className="sugesstion-password-item">
                    <small>مزيج من الكلمات العشوائية</small>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <input className="form-check-input signup-checkbox bg-dark" name="accept_rules" type="checkbox" id="gridCheck1" onChange={e => handleCheck(e)} />
                <label className="form-check-label signup-checkbox-label" for="gridCheck1">
                  موافق على{" "}
                  <Link to="/terms-of-use" className="text-lightgreen">
                    اتفاقية المستخدم
                  </Link>{" "}
                  و{" "}
                  <Link to="/privacy-policy" className="text-lightgreen">
                    شروط الاستخدام
                  </Link>
                </label>
              </div>
              {status.accept_rulesError ? (
                <div class="mt-2 alert alert-danger text-center" role="alert">
                  {status.accept_rulesError}
                </div>
              ) : null}
              <div className="form-row w-100">
                <ReCAPTCHA theme="dark" className="blog-recaptcha mr-1" sitekey={BLOG_APP_CAPTCHA_KEY} />
              </div>
              <button type="submit" className="btn btn-lightgreen mx-auto d-block btn-lg text-white my-4">
                إنشاء حساب
              </button>
              {status.errorServer ? (
                <div class="alert alert-danger mt-4 text-center" role="alert">
                  {status.errorServer}
                </div>
              ) : (
                ""
              )}
              <small className="text-center my-3 d-block">
                هل لديك حساب؟{" "}
                <Link to="/login" className="text-lightgreen">
                  تسجيل الدخول
                </Link>
              </small>
            </form>
          </div>
          <div className="col-md-6 align-items-center signup-left-side">
            <img src={Logo} alt="" className="signup-logo d-block mx-auto" />
            <div className="signup-info jumbotron jumbotron-fluid text-center">
              <h2>العالم يحتاج لك</h2>
              <p className="lead">هناك الكثير من الشركات تتعرض للأختراق كل دقيقة ونحن نهدف للحد من هذه الظاهرة ولذلك نحتاج إلى مساعدتك لنمكن هذه الشركات من اكتشاف الثغرات الموجودة في أنظمتها مبكرا لحمايتها من الإختراقات السوداء المتكررة ..</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
