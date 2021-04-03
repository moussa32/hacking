import React, { useState } from 'react';
import Logo from '../../../../assets/images/green-logo.svg';

import ReCAPTCHA from 'react-google-recaptcha';
import { BLOG_APP_CAPTCHA_KEY } from '../../../../shared/constants/constants';
import { Link } from "react-router-dom";


const SignUp = () => {
    return (
        <main className="component-wrapper">
            <div className="container home">
                <div className="row">
                    <div className="col-md-6 signup-form-section">
                        <h2 className="py-2 text-center">إنشاء حساب جديد</h2>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="firstName">الاسم الأول</label>
                                    <input type="text" className="form-control custom-input" id="firstName" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="secondName">الاسم الثاني</label>
                                    <input type="text" className="form-control custom-input" id="secondName" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="email">البريد الإلكتروني</label>
                                <input type="email" className="form-control custom-input" id="email" required />
                            </div>
                            <fieldset className="form-group row">
                                <legend className="col-form-label col-sm-2 float-sm-left pt-0">الجنس</legend>
                                <div className="col-sm-10 d-flex justify-content-md-end">
                                    <div className="form-check">
                                        <label className="form-check-label mr-4" for="femaleGender">
                                            أنثى
                                    </label>
                                        <input className="form-check-input custom-input" type="radio" name="female" id="femaleChose" value="female" />
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label mr-4" for="maleChose">
                                            ذكر
                                    </label>
                                        <input className="form-check-input custom-input" type="radio" name="male" id="maleChose" value="male" />
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label for="inputCity">تاريخ الميلاد</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <input type="number" min="1" max="31" placeholder="يوم" className="form-control custom-input" id="inputCity" required />
                                </div>
                                <div className="form-group col-md-2">
                                    <input type="number" min="1" max="12" placeholder="شهر" className="form-control custom-input" id="inputZip" required />
                                </div>
                                <div className="form-group col-md-3">
                                    <input type="number" min="1921" placeholder="سنة" className="form-control custom-input" id="inputZip" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">الدولة</label>
                                <select className="form-control custom-input" id="exampleFormControlSelect1">
                                    <option></option>
                                    <option className="text-white">مصر</option>
                                    <option className="text-white">العراق</option>
                                    <option className="text-white">سوريا</option>
                                    <option className="text-white">فلسطين</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="password">كلمة المرور</label>
                                <input type="password" className="form-control custom-input" id="password" required />
                            </div>
                            <div className="form-group">
                                <label for="re-password">تأكيد كلمة المرور</label>
                                <input type="password" className="form-control custom-input" id="re-password" required />
                            </div>
                            <div className="form-group">
                                <label className="suggestion-password">اقتراحات لكلمة مرور قوية</label>
                                <ul>
                                    <li className="sugesstion-password-item"><small>مزيج من الأحرف الكبيرة والصغيرة والأرقام والأحرف الخاصة</small></li>
                                    <li className="sugesstion-password-item"><small>أحرف على الأقل أو أكثر من 8</small></li>
                                    <li className="sugesstion-password-item"><small>مزيج من الكلمات العشوائية</small></li>
                                </ul>
                            </div>
                            <div className="form-group">
                                <input className="form-check-input signup-checkbox bg-dark" type="checkbox" id="gridCheck1" />
                                <label className="form-check-label signup-checkbox-label" for="gridCheck1">
                                    موافق على <Link to='/terms-of-use' className="text-lightgreen">اتفاقية المستخدم</Link> و<Link to='/privacy-policy' className="text-lightgreen">شروط الاستخدام</Link>
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
                            <small className="text-center my-3 d-block">هل لديك حساب؟ <Link to='/login' className="text-lightgreen">تسجيل الدخول</Link></small>
                        </form>
                    </div>
                    <div className="col-md-6 align-items-center signup-left-side pt-4">
                        <img src={Logo} alt="" className="signup-logo" />
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