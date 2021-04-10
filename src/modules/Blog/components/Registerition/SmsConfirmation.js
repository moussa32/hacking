import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import './SmsConfirmation.css';
import axios from 'axios';

const SmsConfirmation = () => {
    const [smsCode, setSmsCode] = useState({
        code: '',
        error: '',
        validCode: false
    });

    const handleSmscode = (e) => {
        setSmsCode({ ...smsCode, code: e.target.value });
        console.log(smsCode);
    }

    const validationCode = () => {
        let codeCondation = /^-?[\d.]+(?:e-?\d+)?$/;

        if (!codeCondation.test(smsCode.code)) {
            setSmsCode({ ...smsCode, error: 'برجاء كتابة الكود بشكل صحيح' });
            return false;
        } else if (smsCode.code.length < 6 || smsCode.code.length > 6) {
            setSmsCode({ ...smsCode, error: 'يجب ان يكون الكود 6 ارقام' });
            return false;
        } else if (!smsCode.code) {
            setSmsCode({ ...smsCode, error: 'برجاء عدم ترك الحقل فارغ' });
            return false;
        }

        setSmsCode({ ...smsCode, error: '', validCode: true });
        console.log(smsCode);
        return true
    }

    const sendCode = async () => {
        const res = await axios.post('http://bugbounty.pythonanywhere.com/api/v1/auth/hackers/verify-phone-code/', smsCode)
        return res
    }

    const reSendCode = async () => {
        const reSendRequest = await axios.post('http://bugbounty.pythonanywhere.com/api/v1/auth/hackers/resend-code/')
        return reSendRequest
    }

    const onSend = () => {
        const isValid = validationCode();
        console.log(smsCode);

        if (isValid) {
            sendCode()
                .then(message => {
                    setSmsCode({ ...smsCode, error: '', success: 'تم التأكد من رقم الهاتف' })
                })
                .catch(function (error) {
                    if (error.response.status == 406) {
                        setSmsCode({ ...smsCode, success: '', error: 'الكود غير صحيح' });
                    }
                });
        }
    }
    const onReSend = () => {
        const isValid = validationCode();
        console.log(smsCode);

        if (isValid) {
            reSendCode()
                .then(message => {
                    setSmsCode({ ...smsCode, error: '', success: 'تم إعادة إرسال الكود' })
                })
                .catch(function (error) {
                    if (error.response) {
                        setSmsCode({ ...smsCode, success: '', error: 'هناك مشكلة ما' });
                    }
                });
        }
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
                                <div className="col-md-6 mx-auto px-4">
                                    <p className="lead main-message">الرجاء إدخال رمز التحقق الذي أرسلناه إلي <span className="message-phone">+201095122777</span></p>
                                    <input type="text" className="form-control bg-white text-dark w-50 mx-auto text-center message-code" onChange={handleSmscode} maxlength='6' placeholder="كود التحقق" />
                                    {smsCode.error ? (<div class="alert alert-danger mt-4 text-center" role="alert">
                                        {smsCode.error}
                                    </div>) : ''}
                                    {smsCode.success ? (<div class="alert alert-success mt-4 text-center" role="alert">
                                        {smsCode.success}
                                    </div>) : ''}
                                </div>
                            </div>
                            <button onClick={onSend} className="btn btn-lightgreen my-4 d-block mx-auto">إرسال</button>
                            <small className="d-block">لم تتلق الرمز؟  <button onClick={onReSend} className="text-lightgreen bg-transparent border-0">أعد إرسال الرمز</button></small>
                            <Link className="text-lightgreen mt-3 d-block" to='/mobile-confirmation'>غير رقم الهاتف</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SmsConfirmation;