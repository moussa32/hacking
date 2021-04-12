import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import './SmsConfirmation.css';
import { handleGetUserToken } from '../../actions/index';
import { useHistory } from 'react-router-dom';
import { getNewTokens } from '../../../../api/RefreshTokenApi';
import { sendSmsCode } from '../../../../api/smsCodeApi';
import { ImSpinner8 } from 'react-icons/im';
import axios from 'axios';
import { dvApiUrl } from '../../../../api/Constants';


const SmsConfirmation = () => {
    // const [smsCode, setSmsCode] = useState({
    //     code: '',
    //     phone_number: '',
    // });
    // const accessToken = handleGetUserToken('accessToken');
    // const refreshToken = handleGetUserToken('refreshToken');
    // const userPhoneNumber = handleGetUserToken('phoneNumber');
    // const history = useHistory();

    // const handleSmscode = (e) => {
    //     setSmsCode({ ...smsCode, code: e.target.value });
    // }

    // useState(() => {
    //     const validationCode = () => {
    //         let codeCondation = /^-?[\d.]+(?:e-?\d+)?$/;

    //         if (!codeCondation.test(smsCode.code)) {
    //             setSmsCode({ ...smsCode, error: 'برجاء كتابة الكود بشكل صحيح' });
    //             return false;
    //         } else if (smsCode.code.length < 6 || smsCode.code.length > 6) {
    //             setSmsCode({ ...smsCode, error: 'يجب ان يكون الكود 6 ارقام' });
    //             return false;
    //         } else if (!smsCode.code) {
    //             setSmsCode({ ...smsCode, error: 'برجاء عدم ترك الحقل فارغ' });
    //             return false;
    //         }

    //         setSmsCode({ ...smsCode, error: '', validCode: true });
    //         return true
    //     }

    // }, [])

    // const sendCode = async () => {
    //     const res = await axios.post(`${dvApiUrl}/auth/hackers/verify-phone-code/`, smsCode, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    //     return res
    // }

    // const reSendCode = async () => {
    //     const reSendRequest = await axios.post(`${dvApiUrl}/auth/hackers/resend-code/`, userPhoneNumber, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    //     return reSendRequest
    // }

    // const onSend = () => {
    //     const isValid = validationCode();
    //     setSmsCode({ ...smsCode, phone_number: userPhoneNumber });
    //     console.log(smsCode);

    //     if (isValid) {
    //         sendCode()
    //             .then(message => {
    //                 setSmsCode({ ...smsCode, error: '', success: 'تم التأكد من رقم الهاتف' });
    //                 setTimeout(() => {
    //                     history.push("/dashboard");
    //                 }, 3000);
    //             })
    //             .catch(function (error) {
    //                 getNewTokens(refreshToken);
    //                 console.log(error.response);
    //                 if (error.response.status == 406) {
    //                     setSmsCode({ ...smsCode, success: '', error: 'الكود غير صحيح' });
    //                 }
    //             });
    //     }
    // }
    // const onReSend = () => {
    //     reSendCode()
    //         .then(message => {
    //             console.log(message);
    //             setSmsCode({ ...smsCode, error: '', success: 'تم إعادة إرسال الكود' })
    //         })
    //         .catch(function (error) {
    //             if (error.response) {
    //                 console.log(error.response);
    //                 getNewTokens(refreshToken);
    //                 setSmsCode({ ...smsCode, success: '', error: 'هناك مشكلة ما' });
    //                 if (error.response.status == 429) {
    //                     setSmsCode({ ...smsCode, success: '', error: 'يجب عليك ان تنظر لدقيقتين حتى تستطيع إرسال كود جديد' });
    //                 }
    //             }
    //         });
    // }

    const [smsCode, setSmsCode] = useState({
        code: '',
        phone_number: ''
    });
    const [status, setStatus] = useState({});
    const [isRedirect, setIsRedirect] = useState(false);
    const accessToken = handleGetUserToken('accessToken');
    const reFreshtoken = handleGetUserToken('refreshToken');
    const userPhoneNumber = handleGetUserToken('phoneNumber');
    const history = useHistory();

    const handleSmsCode = (e) => {
        setSmsCode({ ...smsCode, code: e.target.value });
    }

    const validationCode = () => {
        let codeCondation = /^-?[\d.]+(?:e-?\d+)?$/;

        if (!smsCode.code) {
            setStatus({ error: 'برجاء عدم ترك الحقل فارغ' });
            return false;
        } else if (!codeCondation.test(smsCode.code)) {
            setStatus({ error: 'يجب أن يكون الكود أرقام فقط' });
            return false;
        } else if (smsCode.code.length !== 6) {
            setStatus({ error: 'يجب ان يكون الكود 6 ارقام' });
            return false;
        }

        return true
    }

    const onSend = () => {
        const codeValCondition = validationCode();

        if (codeValCondition) {
            smsCode.phone_number = userPhoneNumber;
            const smsCodeRequest = sendSmsCode(accessToken, smsCode);

            smsCodeRequest.then((res) => {
                console.log(res.data);
                setStatus({ success: 'لقد تم التأكد من رقمك بنجاح' });
                setIsRedirect(true);
                setTimeout(() => {
                    history.push("/dashboard");
                }, 3000);
            }).catch((error) => {
                console.log(error.response);
                if (error.response.status == 401) {
                    setStatus({ error: 'لقد انتهت جلستك برجاء إعادة تحميل الصفحة' })
                    getNewTokens(reFreshtoken);
                } else if (error.response.status == 406) {
                    setStatus({ error: 'برجاء التحقق من الرمز' })
                } else if (error.response.status == 429) {
                    setStatus({ error: 'برجاء انتظار دقيقة لاعادة ارسال الرمز' })
                }
            })
        } else {
            setStatus({ error: 'برجاء كتابة الرمز بشكل صحيح' });
        }
    }

    const onReSend = () => {
        console.log(userPhoneNumber);
        const reSendCode = async () => {
            const reSendRequest = await axios.post(`${dvApiUrl}/auth/hackers/resend-code/`, { phone_number: userPhoneNumber }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            return reSendRequest
        }

        reSendCode()
            .then(message => {
                console.log(message);
                setStatus({ error: '', success: 'تم إعادة إرسال الكود بنجاح' })
            }).catch((error) => {
                console.log(error.response);
                if (error.response.status == 401) {
                    setStatus({ error: 'لقد انتهت جلستك برجاء إعادة تحميل الصفحة' })
                    getNewTokens(reFreshtoken);
                } else if (error.response.status == 400) {
                    setStatus({ error: 'برجاء التأكد من كتابة الرمز المرسل' })
                } else if (error.response.status == 429) {
                    setStatus({ error: 'برجاء انتظار دقيقة لإعادة ارسال الرمز' })
                }
            })
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
                                    <p className="lead main-message">الرجاء إدخال رمز التحقق الذي أرسلناه إلي <span className="message-phone">{userPhoneNumber}</span></p>
                                    <input type="text" className="form-control bg-white text-dark w-50 mx-auto text-center message-code" onChange={handleSmsCode} maxlength='6' placeholder="كود التحقق" />
                                    {status.error ? (<div class="alert alert-danger mt-4 text-center" role="alert">
                                        {status.error}
                                    </div>) : ''}
                                    {status.success ? (<div class="alert alert-success mt-4 text-center" role="alert">
                                        {status.success}
                                    </div>) : ''}
                                    {isRedirect ? (<ImSpinner8 size={"2.5rem"} className="spin" />) : ''}
                                </div>
                            </div>
                            <button onClick={onSend} className="btn btn-lightgreen my-4 d-block mx-auto">إرسال</button>
                            <small className="d-block">لم تتلق الرمز؟  <button className="text-lightgreen bg-transparent border-0" onClick={onReSend}>أعد إرسال الرمز</button></small>
                            <Link className="text-lightgreen mt-3 d-block" to='/mobile-confirmation'>غير رقم الهاتف</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SmsConfirmation;