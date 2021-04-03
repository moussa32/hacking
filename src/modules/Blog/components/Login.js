import React, { useState } from 'react';
import Logo from '../../../assets/images/green-logo.svg';
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <main class="component-wrapper">
            <div className="container home">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <img className="login-logo d-block mx-auto" src={Logo} alt="Logo" />
                        <h2 className="text-center py-2">تسجيل الدخول</h2>
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">إسم المستخدم</label>
                                <input type="text" className="form-control custom-input" id="emailInput" aria-describedby="emailHelp" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">كلمة المرور</label>
                                <input type="password" className="form-control custom-input" id="passwordInput" />
                            </div>
                            <div class="form-group py-1">
                                <a className="text-lightgreen" href="#">نسيت كلمة المرور</a>
                            </div>
                            <button type="submit" className="btn btn-lightgreen mx-auto d-block btn-lg">تسجيل الدخول</button>
                            <p className="text-center py-3">إنشاء حساب جديد؟ <Link to="/sign-up" className="text-lightgreen">إنشاء</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;