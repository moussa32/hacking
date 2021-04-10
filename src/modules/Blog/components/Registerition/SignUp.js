import React, { useState, useEffect } from 'react';
import Logo from '../../../../assets/images/green-logo.svg';
import { CountryDropdown, CountryRegionData } from 'react-country-region-selector';
import { postNewUser } from '../../../../api/SignUpApi';

import ReCAPTCHA from 'react-google-recaptcha';
import { BLOG_APP_CAPTCHA_KEY } from '../../../../shared/constants/constants';
import { Link, useHistory } from "react-router-dom";


const SignUp = ({ setParentData }) => {
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    gender: '',
    birthDate: '',
    country: '',
    password: '',
    repassword: '',
    accept_rules: false,
    usernameError: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    genderError: '',
    birthDateError: '',
    countryError: '',
    passwordError: '',
    rePasswordError: '',
    errorServer: ''
  });
  const history = useHistory();
  console.log(signUpData);

  const onTyping = (e) => {
    e.persist();
    debugger;
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  const onSetCountry = (e) => {
    debugger;
    setSignUpData({ ...signUpData, 'country': e });
  }

  const handleCheck = (e) => {
    setSignUpData({ ...signUpData, 'accept_rules': e.target.checked });
  }

  const handleValidation = () => {
    let usernameError = '';
    let firstNameError = '';
    let lastNameError = '';
    let emailError = '';
    let genderError = '';
    let birthDateError = '';
    let countryError = '';
    let passwordError = '';
    let rePasswordError = '';
    let containSpace = /\s/;

    if (!signUpData.username) {
      usernameError = 'برجاء إدخال اسم المستخدم';
    } else {
      usernameError = ''
      setSignUpData({ ...signUpData, usernameError });
    }

    if (containSpace.test(signUpData.username)) {
      usernameError = 'برجاء إدخال اسم مستخدم لا يحتوى على مسافات';
    } else {
      usernameError = ''
      setSignUpData({ ...signUpData, usernameError });
    }

    if (usernameError) {
      setSignUpData({ ...signUpData, usernameError });
      return false;
    }

    if (!signUpData.email.includes('@')) {
      emailError = 'بريد الكتروني غير صحيح';
    } else {
      usernameError = ''
      setSignUpData({ ...signUpData, emailError });
    }

    if (emailError) {
      setSignUpData({ ...signUpData, emailError });
      return false;
    }

    if (!signUpData.gender) {
      genderError = 'برجاء اختيار الجنس';
    } else {
      genderError = ''
      setSignUpData({ ...signUpData, genderError });
    }

    if (genderError) {
      setSignUpData({ ...signUpData, genderError });
      return false;
    }

    if (!signUpData.birthDate) {
      birthDateError = 'برجاء اختيار تاريخ الميلاد';
    } else {
      genderError = ''
      setSignUpData({ ...signUpData, birthDateError });
    }

    if (birthDateError) {
      setSignUpData({ ...signUpData, birthDateError });
      return false;
    }

    if (!signUpData.country) {
      countryError = 'برجاء اختيار الدولة';
    } else {
      genderError = ''
      setSignUpData({ ...signUpData, countryError });
    }

    if (countryError) {
      setSignUpData({ ...signUpData, countryError });
      return false;
    }

    if (!signUpData.password) {
      passwordError = 'برجاء إدخال كلمة المرور';
    } else {
      passwordError = ''
      setSignUpData({ ...signUpData, passwordError });
    }

    if (signUpData.password.length < 8) {
      passwordError = 'برجاء كتابة كلمة مرور اكبر من 8 احرف';
    } else {
      passwordError = '';
      setSignUpData({ ...signUpData, passwordError });
    }

    if (passwordError) {
      setSignUpData({ ...signUpData, passwordError });
      return false;
    }

    if (!signUpData.rePassword) {
      rePasswordError = 'برجاء إدخال تأكيد كلمة المرور';
    } else {
      rePasswordError = '';
      setSignUpData({ ...signUpData, rePasswordError });
    }

    if (rePasswordError) {
      setSignUpData({ ...signUpData, rePasswordError });
      return false;
    }

    if (signUpData.password !== signUpData.rePassword) {
      rePasswordError = 'كلمة المرور مختلفة برجاء التأكد من ان الكلمتين متطابقتين';
    } else {
      rePasswordError = ''
      setSignUpData({ ...signUpData, rePasswordError });
    }

    if (rePasswordError) {
      setSignUpData({ ...signUpData, rePasswordError });
      return false;
    }

    return true;
  }

  const Registration = (e) => {
    e.preventDefault();
    const isValid = handleValidation();

    if (isValid) {
      const fields = {
        "username": signUpData.username,
        "password": signUpData.password,
        "email": signUpData.email,
        "gender": signUpData.gender,
        "country": signUpData.country,
        "first_name": signUpData.firstName,
        "last_name": signUpData.lastName,
        "birth_date": signUpData.birthDate,
        "accept_rules": signUpData.accept_rules
      }

      let sendData = postNewUser(fields);

      sendData.then((res) => {
        console.log(res.data);
        setParentData(res.data);
        history.push("/email-confirmation");
      }).catch(function (error) {
        if (error.response) {
          setSignUpData({ ...signUpData, errorServer: error.response.data[0] });
          console.log(error.response);
        }
      });
      return sendData;
    }
  }

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
                  <input type="text" className="form-control custom-input" value={signUpData.firstName} name="firstName" id="firstName" required onChange={onTyping} />
                  {signUpData.firstNameError ? (<div class="alert alert-danger" role="alert">
                    {signUpData.firstNameError}
                  </div>) : null}
                </div>
                <div className="form-group col-md-6">
                  <label for="secondName">الاسم الثاني</label>
                  <input type="text" className="form-control custom-input" name="lastName" id="lastName" required onChange={onTyping} />
                  {signUpData.lastNameError ? (<div class="alert alert-danger" role="alert">
                    {signUpData.lastNameError}
                  </div>) : null}
                </div>
              </div>
              <div className="form-group">
                <label for="username">اسم المستخدم</label>
                <input type="text" className="form-control custom-input" name="username" id="username" required onChange={onTyping} />
                {signUpData.usernameError ? (<div class="alert alert-danger" role="alert">
                  {signUpData.usernameError}
                </div>) : null}
              </div>
              <div className="form-group">
                <label for="email">البريد الإلكتروني</label>
                <input type="email" className="form-control custom-input" name="email" id="email" required onChange={onTyping} />
                {signUpData.emailError ? (<div class="alert alert-danger" role="alert">
                  {signUpData.emailError}
                </div>) : null}
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
                  {signUpData.genderError ? (<div class="alert alert-danger" role="alert">
                    {signUpData.genderError}
                  </div>) : null}
                </div>
              </fieldset>
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label for="inputCity">تاريخ الميلاد</label>
                </div>
                <div className="form-group col-md-7">
                  <input type="date" placeholder="تاريخ الميلاد" name="birthDate" className="form-control custom-input birthdate-input" id="dat" required onChange={onTyping} />
                  {signUpData.birthDateError ? (<div class="alert alert-danger" role="alert">
                    {signUpData.birthDateError}
                  </div>) : null}
                </div>
              </div>
              <div className="form-group">
                <label for="exampleFormControlSelect1">الدولة</label>
                <CountryDropdown value={signUpData.country} className="form-control custom-input country-input" name="country" onChange={onSetCountry} />
                {signUpData.countryError ? (<div class="alert alert-danger" role="alert">
                  {signUpData.countryError}
                </div>) : null}
              </div>
              <div className="form-group">
                <label for="password">كلمة المرور</label>
                <input type="password" className="form-control custom-input" name="password" id="password" required onChange={onTyping} />
                {signUpData.passwordError ? (<div class="alert alert-danger" role="alert">
                  {signUpData.passwordError}
                </div>) : null}
              </div>
              <div className="form-group">
                <label for="re-password">تأكيد كلمة المرور</label>
                <input type="password" className="form-control custom-input" id="re-password" name="rePassword" required onChange={onTyping} />
                {signUpData.rePasswordError ? (<div class="alert alert-danger" role="alert">
                  {signUpData.rePasswordError}
                </div>) : null}
              </div>
              <div className="form-group">
                <label className="suggestion-password text-lightgreen">اقتراحات لكلمة مرور قوية</label>
                <ul>
                  <li className="sugesstion-password-item"><small>مزيج من الأحرف الكبيرة والصغيرة والأرقام والأحرف الخاصة</small></li>
                  <li className="sugesstion-password-item"><small>أحرف على الأقل أو أكثر من 8</small></li>
                  <li className="sugesstion-password-item"><small>مزيج من الكلمات العشوائية</small></li>
                </ul>
              </div>
              <div className="form-group">
                <input className="form-check-input signup-checkbox bg-dark" name="accept_rules" type="checkbox" id="gridCheck1" required onChange={e => handleCheck(e)} />
                <label className="form-check-label signup-checkbox-label" for="gridCheck1">
                  موافق على <Link to='/terms-of-use' className="text-lightgreen">اتفاقية المستخدم</Link> و <Link to='/privacy-policy' className="text-lightgreen">شروط الاستخدام</Link>
                </label>
              </div>
              <div className="form-row w-100">
                <ReCAPTCHA
                  theme="dark"
                  className="blog-recaptcha mr-1"
                  sitekey={BLOG_APP_CAPTCHA_KEY}
                />
              </div>
              <button type="submit" className="btn btn-lightgreen mx-auto d-block btn-lg text-white my-4">إنشاء حساب</button>
              {signUpData.errorServer ? (<div class="alert alert-danger mt-4 text-center" role="alert">
                {signUpData.errorServer}
              </div>) : ''}
              <small className="text-center my-3 d-block">هل لديك حساب؟ <Link to='/login' className="text-lightgreen">تسجيل الدخول</Link></small>
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
}

export default SignUp;