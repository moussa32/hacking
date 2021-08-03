import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../../../shared/components/FormFields/Input";
import { dvApiUrl } from "../../../../api/Constants";

import Logo from "../../../../assets/images/green-logo.svg";

import { CountryDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import ar from "react-phone-input-2/lang/ar.json";

import axios from "axios";

const SignupProgram = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    program: {
      company_name: "",
      url: "",
    },
  });
  const [status, setStatus] = useState({});
  const [isLoadding, setIsLoadding] = useState(false);
  const history = useHistory();

  const onTyping = e => {
    e.persist();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    let usernameError = "";
    let emailError = "";
    let countryError = "";
    let phoneNumberError = "";
    let passwordError = "";
    let companyNameError = "";
    let companyURLError = "";
    let accept_rulesError = "";

    if (!formData.username) {
      usernameError = "هذا الحقل مطلوب";
    }

    if (usernameError) {
      setStatus({ usernameError });
      return false;
    }

    if (!formData.email) {
      emailError = "هذا الحقل مطلوب";
    }

    if (emailError) {
      setStatus({ emailError });
      return false;
    }

    if (!formData.country) {
      countryError = "هذا الحقل مطلوب";
    }

    if (countryError) {
      setStatus({ countryError });
      return false;
    }

    if (!formData.phoneNumber) {
      phoneNumberError = "هذا الحقل مطلوب";
    }

    if (phoneNumberError) {
      setStatus({ phoneNumberError });
      return false;
    }

    if (!formData.password) {
      passwordError = "هذا الحقل مطلوب";
    }

    if (passwordError) {
      setStatus({ passwordError });
      return false;
    }

    if (formData.password.length < 8) {
      passwordError = "يجب ان تكون كلمة المرور أكبر من 8 أحرف";
    }

    if (passwordError) {
      setStatus({ passwordError });
      return false;
    }

    if (!formData.program.company_name) {
      companyNameError = "هذا الحقل مطلوب";
    }

    if (companyNameError) {
      setStatus({ companyNameError });
      return false;
    }

    if (!formData.program.url) {
      companyURLError = "هذا الحقل مطلوب";
    }

    if (companyURLError) {
      setStatus({ companyURLError });
      return false;
    }

    if (!formData.accept_rules) {
      accept_rulesError = "يجب الموافقه على الشروط لتسطيع فتح برنامج معانا";
    }

    if (accept_rulesError) {
      setStatus({ accept_rulesError });
      return false;
    }
    setStatus({});
    return true;
  };

  const handleSignupProgram = e => {
    e.preventDefault();

    const isValid = handleValidation();

    if (isValid) {
      setIsLoadding(true);

      axios
        .post(`${dvApiUrl}/auth/programs/signup/`, formData)
        .then(programData => {
          console.log(programData);
          localStorage.setItem("accessToken", programData.data.access_token);
          localStorage.setItem("refreshToken", programData.data.refresh_token);
          localStorage.setItem("type", "program");
          localStorage.setItem("registerEmail", programData.data.email);
          setIsLoadding(false);
          setStatus({ created: "تم تسجيل البرنامج بنجاح جاري تحويلك" });
          setTimeout(() => {
            history.push("/program/email-confirmation");
          }, 2000);
        })
        .catch(function (error) {
          setIsLoadding(false);
          if (error.response.data.username) {
            setStatus({ usernameError: error.response.data.username });
          } else if (error.response.data.email) {
            setStatus({ emailError: error.response.data.email });
          }
        });
    }
  };

  return (
    <main className="sign-up-wrapper">
      <div className="container-fluid home">
        <div className="row">
          <div className="col-md-6 signup-form-section bg-black">
            <h3 className="py-2 text-center mb-3">إنشاء حساب</h3>
            <h4 className="my-4 text-lightgreen">معلومات شخصية</h4>
            <form onSubmit={handleSignupProgram}>
              <Input inputClassNames="custom-input" type="text" id="username" label="اسم المستخدم" value={formData.username} onChange={onTyping} />
              {status.usernameError ? (
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.usernameError}
                </div>
              ) : null}
              <Input inputClassNames="custom-input" type="email" id="email" label="البريد الالكتروني" value={formData.email} onChange={onTyping} />
              {status.emailError ? (
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.emailError}
                </div>
              ) : null}
              <div className="form-group">
                <label htmlFor="rcrs-country" className="d-block">
                  الدولة
                </label>
                <CountryDropdown value={formData.country} id="rcrs-country" className="form-control custom-input country-input" defaultOptionLabel={""} onChange={val => setFormData({ ...formData, country: val })} />
              </div>
              {status.countryError ? (
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.countryError}
                </div>
              ) : null}
              <div className="form-group">
                <label htmlFor="" className="d-block">
                  رقم الهاتف
                </label>
                <PhoneInput country={"kw"} name="phone_number" localization={ar} enableSearch={true} inputClass={"w-100"} containerStyle={{ borderRadius: "5px", border: "1px #ddd solid" }} onChange={number => setFormData({ ...formData, phoneNumber: number })} />
              </div>
              {status.phoneNumberError ? (
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.phoneNumberError}
                </div>
              ) : null}
              <Input inputClassNames="custom-input" type="password" id="password" label="كلمة المرور" value={formData.password} onChange={onTyping} />
              {status.passwordError ? (
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.passwordError}
                </div>
              ) : null}
              <div className="form-group">
                <label className="suggestion-password text-lightgreen">اقتراحات لكلمة مرور قوية</label>
                <ul>
                  <li className="sugesstion-password-item">
                    <small>مزيج من الأحرف الكبيرة والصغيرة والأرقام والأحرف الخاصة</small>
                  </li>
                  <li className="sugesstion-password-item">
                    <small>أحرف على الأقل أو أكثر من 8</small>
                  </li>
                  <li className="sugesstion-password-item">
                    <small>مزيج من الكلمات العشوائية</small>
                  </li>
                </ul>
              </div>
              <h4 className="my-4 text-lightgreen">معلومات عن الشركة</h4>
              <Input inputClassNames="custom-input" type="text" id="company_name" label="اسم الشركة" value={formData.program.company_name} onChange={companyName => setFormData({ ...formData, program: { ...formData.program, company_name: companyName.target.value } })} />
              {status.companyNameError ? (
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.companyNameError}
                </div>
              ) : null}
              <Input inputClassNames="custom-input" type="url" id="companyUrl" label="الرابط الخاص بالشركة" value={formData.program.url} onChange={url => setFormData({ ...formData, program: { ...formData.program, url: url.target.value } })} />
              {status.companyURLError ? (
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.companyURLError}
                </div>
              ) : null}
              <div className="form-group">
                <input className="form-check-input signup-checkbox bg-dark" name="accept_rules" type="checkbox" id="accept_rules" onChange={rule => setFormData({ ...formData, accept_rules: rule.target.checked })} />
                <label className="form-check-label signup-checkbox-label" htmlFor="accept_rules">
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
                <div className="mt-2 alert alert-danger custom-danger-alert" role="alert">
                  {status.accept_rulesError}
                </div>
              ) : null}
              <button type="submit" className="btn btn-lightgreen mx-auto d-block btn-lg text-white my-4">
                إنشاء حساب
              </button>
            </form>
            {isLoadding ? (
              <div className="spinner-border d-block mx-auto text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}
            {status.created ? (
              <div className="mt-2 alert alert-success custom-danger-alert" role="alert">
                {status.created}
              </div>
            ) : null}
          </div>
          <div className="col-md-6 align-items-center signup-left-side m-0">
            <img src={Logo} alt="Hacking Technology" className="signup-logo d-block mx-auto" />
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

export default SignupProgram;
