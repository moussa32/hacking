import React, { useState } from 'react';
import { WhiteLogo } from '../../../assets/index';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleSetUserToken, handleGetUserToken } from '../actions/index';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const token = handleGetUserToken();

    const handleSubmit = e => {
        e.preventDefault();

        const credentials = JSON.stringify({
            username: username,
            password: password
        });
        axios.post('http://bugbounty.pythonanywhere.com/api/v1/auth/hackers/login/',
            credentials,
            { headers: { "Content-Type": "application/json" } }
        )
            .then(res => {
                console.log(res);
                handleSetUserToken(res.data.access);
                history.push("/dashboard");
            })
            .catch(e => {
                console.error(e);
            })
    }

    const handleUsername = e => {
        setUsername(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    if (token) {
        history.push("/dashboard");
    }

    return (
        <main class="component-wrapper login-wrapper">
            <div className="container home">
                <div className="row">
                    <div className="col-md-6 mx-auto p-4 bg-black rounded">
                        <img className="login-logo d-block mx-auto" src={WhiteLogo} alt="Logo" />
                        <h3 className="text-center py-4">تسجيل الدخول</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="usernameOrEmail">إسم المستخدم أو البريد الإلكتروني</label>
                                <input type="text" onChange={handleUsername} className="form-control custom-input" id="usernameOrEmail" aria-describedby="emailHelp" required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">كلمة المرور</label>
                                <input type="password" onChange={handlePassword} className="form-control custom-input" id="passwordInput" required />
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