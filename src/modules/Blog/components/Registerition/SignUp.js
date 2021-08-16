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
  const [status, setStatus] = useState({});
  const history = useHistory();

  const onTyping = e => {
    e.persist();
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const onSetCountry = e => {
    setSignUpData({ ...signUpData, country: e });
  };

  const handleCheck = e => {
    setSignUpData({ ...signUpData, accept_rules: e.target.checked });
  };

  const formValidation = () => {
    const formErrors = {
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
      emailError: "",
      genderError: "",
      birthDateError: "",
      countryError: "",
      passwordError: "",
      rePasswordError: "",
      accept_rulesError: false,
    };
    const stringPattern = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let isValid = true;

    if (!signUpData.firstName) {
      formErrors.firstNameError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (stringPattern.test(signUpData.firstName)) {
      formErrors.firstNameError = "لا يمكن أن يحتوي الاسم على مسافات أو أحرف خاصة";
      isValid = false;
    }

    if (!signUpData.lastName) {
      formErrors.lastNameError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (stringPattern.test(signUpData.lastName)) {
      formErrors.lastNameError = "لا يمكن أن يحتوي الاسم على مسافات أو أحرف خاصة";
      isValid = false;
    }

    if (!signUpData.username) {
      formErrors.usernameError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (signUpData.username.length < 4) {
      formErrors.usernameError = "يجب أن لا يقل اسم المستخدم عن 4 أحرف";
      isValid = false;
    }

    if (stringPattern.test(signUpData.username)) {
      formErrors.usernameError = "لا يمكن ان تستخدم اسم مستخدم يحتوي على مسافات او أحرف خاصة";
      isValid = false;
    }

    if (!signUpData.email) {
      formErrors.emailError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (!emailPattern.test(String(signUpData.email).toLowerCase())) {
      formErrors.emailError = "يجب كتابة بريد إلكتروني صالح مسموح بـ (0 إلى 9) ومن (a - Z) و (. أو _)";
      isValid = false;
    }

    if (!signUpData.gender) {
      formErrors.genderError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (!signUpData.birthDate) {
      formErrors.birthDateError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (!signUpData.country) {
      formErrors.countryError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (!signUpData.password) {
      formErrors.passwordError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (signUpData.password.length < 8) {
      formErrors.passwordError = "يجب أن لا تقل كلمة المرور عن 8 خانات";
      isValid = false;
    }

    if (!signUpData.rePassword) {
      formErrors.rePasswordError = "هذا الحقل مطلوب";
      isValid = false;
    }

    if (signUpData.password !== signUpData.rePassword) {
      formErrors.passwordError = "يجب أن تكون كلمة المرور متطابقة";
      formErrors.rePasswordError = "يجب أن تكون كلمة المرور متطابقة";
      isValid = false;
    }

    if (!signUpData.accept_rules) {
      formErrors.accept_rulesError = "يجب الموافقة على اتفاقية المستخدم وشروط الإستخدام لكي تستطيع التسجيل معانا";
      isValid = false;
    }

    setStatus(formErrors);
    return isValid;
  };

  const Registration = e => {
    e.preventDefault();
    const isValid = formValidation();

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
          /*Send submited data to Home Component to handle it in next step*/
          setParentData(res.data);

          handleSetUserToken("refreshToken", res.data.tokens.refresh_token);
          handleSetUserToken("type", res.data.hacker_data.role);
          handleSetUserToken("accessToken", res.data.tokens.access_token);
          handleSetUserToken("registerEmail", dataToBeSent.email);

          /*Redirect to next step*/
          history.push("/email-confirmation");
        })
        .catch(function (error) {
          const errorArray = error.response.data;
          if (error.response.status === 400) {
            if (errorArray.username) {
              setStatus({ usernameError: "الاسم المستخدم هذا مسجل مسبقًا" });
            } else if (errorArray.email) {
              setStatus({ emailError: "هذا البريد الإلكتروني مسجل من قبل" });
            } else if (error.response.status === 500) {
              setStatus({ type: "danger", message: "هناك مشكلة في الخادم في الوقت الحالي برجاء المحاولة في وقت لاحق" });
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
                  <label htmlFor="firstName">الاسم الأول</label>
                  <input
                    type="text"
                    className={`form-control ${status.firstNameError ? "is-invalid" : ""} custom-input`}
                    value={signUpData.firstName}
                    name="firstName"
                    id="firstName"
                    onChange={e => {
                      onTyping(e);
                      setStatus({ ...status, firstNameError: "" });
                    }}
                  />
                  {status.firstNameError ? <div className="invalid-feedback d-block mr-2">{status.firstNameError}</div> : null}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="secondName">الاسم الأخير</label>
                  <input
                    type="text"
                    className={`form-control ${status.lastNameError ? "is-invalid" : ""} custom-input`}
                    name="lastName"
                    id="lastName"
                    onChange={e => {
                      onTyping(e);
                      setStatus({ ...status, lastNameError: "" });
                    }}
                  />
                  {status.lastNameError ? <div className="invalid-feedback d-block mr-2">{status.lastNameError}</div> : null}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="username">اسم المستخدم</label>
                <input
                  type="text"
                  className={`form-control ${status.usernameError ? "is-invalid" : ""} custom-input`}
                  name="username"
                  id="username"
                  onChange={e => {
                    onTyping(e);
                    setStatus({ ...status, usernameError: "" });
                  }}
                />
                {status.usernameError ? <div className="invalid-feedback d-block mr-2">{status.usernameError}</div> : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">البريد الالكتروني</label>
                <input
                  type="text"
                  className={`form-control ${status.emailError ? "is-invalid" : ""} custom-input`}
                  name="email"
                  id="email"
                  onChange={e => {
                    onTyping(e);
                    setStatus({ ...status, emailError: "" });
                  }}
                />
                {status.emailError ? <div className="invalid-feedback d-block mr-2">{status.emailError}</div> : null}
              </div>
              <fieldset className="form-group row">
                <legend className="col-form-label col-sm-2 float-sm-left pt-0">الجنس</legend>
                <div className="col-sm-10 d-flex justify-content-end">
                  <div className="form-check d-flex align-items-center justify-content-end">
                    <label className={`form-check-label ${status.genderError ? "signup-error" : ""} ml-4`} htmlFor="femaleGender">
                      أنثى
                    </label>
                    <input
                      className="form-check-input signup-radio-button custom-input"
                      type="radio"
                      name="gender"
                      id="femaleChose"
                      value="female"
                      onChange={e => {
                        onTyping(e);
                        setStatus({ ...status, genderError: "" });
                      }}
                    />
                  </div>
                  <div className="form-check d-flex align-items-center justify-content-end">
                    <label className={`form-check-label ${status.genderError ? "signup-error" : ""} ml-4`} htmlFor="maleChose">
                      ذكر
                    </label>
                    <input
                      className="form-check-input signup-radio-button custom-input"
                      type="radio"
                      name="gender"
                      id="maleChose"
                      value="male"
                      onChange={e => {
                        onTyping(e);
                        setStatus({ ...status, genderError: "" });
                      }}
                    />
                  </div>
                  {status.genderError ? <div className="invalid-feedback d-block mr-3">{status.genderError}</div> : null}
                </div>
              </fieldset>
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label htmlFor="birthDate">تاريخ الميلاد</label>
                </div>
                <div className="form-group col-md-7">
                  <input
                    type="date"
                    placeholder="تاريخ الميلاد"
                    name="birthDate"
                    className={`form-control ${status.birthDateError ? "is-invalid" : ""} custom-input birthdate-input`}
                    id="birthDate"
                    onChange={e => {
                      onTyping(e);
                      setStatus({ ...status, birthDateError: "" });
                    }}
                  />
                  {status.birthDateError ? <div className="invalid-feedback d-block mr-2">{status.birthDateError}</div> : null}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="country">الدولة</label>
                <CountryDropdown
                  blacklist={["IL"]}
                  value={signUpData.country}
                  className={`form-control ${status.countryError ? "is-invalid" : ""} custom-input country-input`}
                  name="country"
                  onChange={e => {
                    onSetCountry(e);
                    setStatus({ ...status, countryError: "" });
                  }}
                />
                {status.countryError ? <div className="invalid-feedback d-block mr-2">{status.countryError}</div> : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">كلمة المرور</label>
                <input
                  type="password"
                  className={`form-control ${status.passwordError ? "is-invalid" : ""} custom-input country-input`}
                  name="password"
                  id="password"
                  onChange={e => {
                    onTyping(e);
                    setStatus({ ...status, passwordError: "" });
                  }}
                />
                {status.passwordError ? <div className="invalid-feedback d-block mr-2">{status.passwordError}</div> : null}
              </div>
              <div className="form-group">
                <label htmlFor="re-password">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  className={`form-control ${status.rePasswordError ? "is-invalid" : ""} custom-input country-input`}
                  id="re-password"
                  name="rePassword"
                  onChange={e => {
                    onTyping(e);
                    setStatus({ ...status, rePasswordError: "" });
                  }}
                />
                {status.rePasswordError ? <div className="invalid-feedback d-block mr-2">{status.rePasswordError}</div> : null}
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
                <input
                  className={`${status.accept_rulesError ? "signup-error" : ""} form-check-input signup-checkbox`}
                  name="accept_rules"
                  type="checkbox"
                  onChange={e => {
                    handleCheck(e);
                    setStatus({ ...status, accept_rulesError: "" });
                  }}
                />
                <label className={`${status.accept_rulesError ? "signup-error" : ""} form-check-label signup-checkbox-label`}>
                  موافق على{" "}
                  <Link to="/terms-of-use" className="text-lightgreen">
                    اتفاقية المستخدم
                  </Link>{" "}
                  و{" "}
                  <Link to="/privacy-policy" className="text-lightgreen">
                    شروط الاستخدام
                  </Link>
                </label>
                {status.accept_rulesError ? <div className="invalid-feedback d-block mr-2">{status.accept_rulesError}</div> : null}
              </div>
              {/* <div className="form-row w-100">
                <ReCAPTCHA theme="dark" className="blog-recaptcha mr-1" sitekey={BLOG_APP_CAPTCHA_KEY} />
              </div> */}
              <button type="submit" className="btn btn-lightgreen mx-auto d-block btn-lg text-white my-4">
                إنشاء حساب
              </button>
              {status.errorServer ? (
                <div className="alert alert-danger mt-4 text-center" role="alert">
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
