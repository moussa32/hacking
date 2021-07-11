import React, { useState } from 'react';
import { WhiteLogo } from '../../../assets/index';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleSetUserToken, handleGetUserToken } from '../actions/index';
import { dvApiUrl } from '../../../api/Constants';

const Login = () => {
  const history = useHistory();
  const token = handleGetUserToken('accessToken');

  if (token) {
    history.push("/dashboard");
  }

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    formIsValid: false,
    errors: { message: '' }
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setCredentials({ ...credentials, errors: { message: 'برجاء عدم ترك اي حقل فارغ' } });
      return '';

    } else {
      setCredentials({ ...credentials, errors: { message: '' } });

      axios.post(`${dvApiUrl}/auth/hackers/login/`,
        credentials
      )
        .then(res => {
          handleSetUserToken('accessToken', res.data.access);
          handleSetUserToken('refreshToken', res.data.refresh);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              setCredentials({ ...credentials, errors: { message: 'برجاء التأكد من اسم أو كلمة المرور' } })
            } else if (error.response.status === 404) {
              setCredentials({ ...credentials, errors: { message: 'تحقق من البيانات المدخلة' } })
            } else if (error.response.status === 429) {
              setCredentials({ ...credentials, errors: { message: ' لقد سجلت بيانات الدخول بشكل خاطئ العديد من المرات أنتظر دقيقة' } })
            }
          }
        });
    }
  }

  const handleUserLoginInputs = e => {
    const username = e.target.name;
    const password = e.target.value;
    setCredentials({ ...credentials, [username]: password });
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
                <label for="usernameOrEmail">إسم المستخدم</label>
                <input type="text" name="username" value={credentials.username} onChange={e => handleUserLoginInputs(e)} className="form-control custom-input" id="usernameOrEmail" aria-describedby="emailHelp" required />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">كلمة المرور</label>
                <input name="password" type="password" value={credentials.password} onChange={e => handleUserLoginInputs(e)} className="form-control custom-input" id="passwordInput" required />
              </div>
              <div class="form-group py-1">
                <a className="text-lightgreen" href="#">نسيت كلمة المرور</a>
              </div>
              <button type="submit" className="btn btn-lightgreen mx-auto d-block btn-lg">تسجيل الدخول</button>
              {credentials.errors.message ? (<div class="alert alert-danger mt-4 text-center" role="alert">
                {credentials.errors.message}
              </div>) : ''}
              <p className="text-center py-3">إنشاء حساب جديد؟ <Link to="/sign-up" className="text-lightgreen">إنشاء</Link></p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;