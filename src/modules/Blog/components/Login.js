import React, {useState} from 'react';
import Logo from '../../../assets/images/green-logo.svg';

const Login = () =>{
    return(
        <main class="login-component">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <img className="login-logo d-block mx-auto" src={Logo} alt="Logo"/>
                        <h2 className="text-center py-2">تسجيل الدخول</h2>
                        <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">إسم المستخدم</label>
                            <input type="text" className="form-control" id="emailInput" aria-describedby="emailHelp"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">كلمة المرور</label>
                            <input type="password" className="form-control" id="passwordInput"/>
                        </div>
                        <div class="form-group py-1">
                            <a className="login-link" href="#">نسيت كلمة المرور</a>
                        </div>
                        <button type="submit" className="btn login-button mx-auto d-block btn-lg text-white">تسجيل الدخول</button>
                        <p className="text-center py-3">إنشاء حساب جديد؟ <a href="#" className="login-link">إنشاء</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;