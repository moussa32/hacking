import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './MobileConfirmation.css';
import ar from 'react-phone-input-2/lang/ar.json';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const MobileConfirmation = () => {
  const history = useHistory();

  const [phoneNumber, setPhoneNumber] = useState({ phone_number: '' })
  const [status, setStatus] = useState({
    error: '',
    success: ''
  })

  const handlePhoneNumber = (e) => {
    setPhoneNumber({ phone_number: `+${e}` })
    console.log(phoneNumber);
  }

  const sendPhoneNumber = () => {
    axios.post('https://bugbounty.pythonanywhere.com/api/v1/auth/hackers/verify-phone/', phoneNumber)
      .then((res) => {
        console.log(res);

      }).catch(function (error) {

        if (error.response) {

          console.log(error.response);
          if (error.response.status == 500) {
            setStatus({ error: 'هناك مشكلة في الخادم فى الوقت الحالي' })
          } else if (error.response.status == 400) {
            setStatus({ error: 'أدخل رقم هاتف صالح' })
          }
        }
      });
  }

  return (
    <main class="component-wrapper">
      <div className="container home">
        <div className="jumbotron text-center py-4 bg-second">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-black">
              <li className="breadcrumb-item py-1"><FaCheckCircle className="check-progress ml-2" size={'1.5em'} /> التحقق من البريد الإلكتروني</li>
            </ol>
          </nav>
          <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
            <label className="d-block text-right box-title">التحقق من الموبيل</label>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <PhoneInput
                    country={'kw'}
                    name="phone_number"
                    localization={ar}
                    enableSearch={true}
                    onChange={handlePhoneNumber}
                  />
                  {status.error ? (<div class="alert alert-danger mt-4 text-center" role="alert">
                    {status.error}
                  </div>) : ''}
                  {status.success ? (<div class="alert alert-success mt-4 text-center" role="alert">
                    {status.success}
                  </div>) : ''}
                </div>
              </div>
              <button onClick={sendPhoneNumber} className="btn btn-lightgreen my-4 d-block mx-auto">التحقق</button>
              <small className="d-block">سيصلك رسالة sms برمز التحقق الخاص بك</small>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MobileConfirmation;