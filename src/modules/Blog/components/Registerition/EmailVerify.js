import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleSetUserToken, handleGetUserToken } from '../../actions';
import { useHistory } from 'react-router-dom';

const EmailVerify = () => {

  const [valid, setValid] = useState({
    token: '',
    error: '',
    success: '',
    isValid: false,
    isLoadding: true
  });

  const history = useHistory();

  const verifyUserToken = () => {
    const location = window.location.href;
    const tokenFromURL = location.split('=')[1];

    handleSetUserToken('token', tokenFromURL);
  }

  useEffect(() => {
    verifyUserToken();

    const getUnAuth = handleGetUserToken('token');

    axios.get(`http://bugbounty.pythonanywhere.com/api/v1/auth/hackers/verify-email/?token=${getUnAuth}`)
      .then((res) => {

        setValid({ ...valid, error: '', success: 'تم تفعيل بريدك الإلكتروني بنجاح جاري تحويلك' });
        setTimeout(() => {
          history.push("/mobile-confirmation");
        }, 5000);

      }).catch(function (error) {
        if (error.response) {
          if (error.response.status == 400) {
            setValid({ ...valid, error: 'لا يوجد بريد إلكتروني مرتبط بهذا الرمز' });

            setTimeout(() => {
              history.push("/email-confirmation");
            }, 3000);
          }
        }
      });
  }, [])


  return (
    <main class="component-wrapper">
      <div className="container home">
        <div className="jumbotron text-center py-4 bg-second">
          <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
            <label className="d-block text-right box-title">التحقق من البريد الإلكتروني</label>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  {valid.error ? (<div class="alert alert-danger mt-4 text-center" role="alert">
                    {valid.error}
                  </div>) : ''}
                  {valid.success ? (<div class="alert alert-success mt-4 text-center" role="alert">
                    {valid.success}
                  </div>) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EmailVerify;