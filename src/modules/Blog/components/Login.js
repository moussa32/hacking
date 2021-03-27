import React, {useState} from 'react';

const Login = () =>{
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h1>تسجيل الدخول</h1>
                    <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">إسم المستخدم</label>
                        <input type="text" className="form-control" id="emailInput" aria-describedby="emailHelp"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">كلمة المرور</label>
                        <input type="password" className="form-control" id="passwordInput"/>
                    </div>
                    <button type="submit" className="btn btn-primary">تسجيل الدخول</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;