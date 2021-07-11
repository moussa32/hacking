import React, { useState } from 'react';
import axios from 'axios';
import { EmailConfirmationImage } from '../../../../assets/index';
import { handleGetUserToken, handleSetUserToken } from '../../actions';


const Confirmation = ({ emailData }) => {
    const hackerEmail = emailData.hacker_data.email;
    const token = handleGetUserToken('accessToken');
    const [status, setStatus] = useState({});


    const onReSendEmail = () => {
        axios.post('https://bugbounty.pythonanywhere.com/api/v1/auth/hackers/resend-email/', { token: token }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            handleSetUserToken('accessToken', res.data.access_token);
            setStatus({ success: 'تم إعادة إرسال رابط التفعيل بنجاح برجاء التأكد من بريد الإلكتروني' })
        }).catch((error) => {
            if (error.respone.status === 400) {
                setStatus({ error: 'يجب ان يكون لديك حساب' })
            }
        })
    }

    return (
        <main class="component-wrapper">
            {hackerEmail ? (
                <div className="container home">
                    <div class="jumbotron text-center bg-second">
                        <p className="lead">لقد أرسلنا بريدًا إلكترونيًا إلى <a href={`mailto:${hackerEmail}`} target="_blank" rel="noreferrer" className="text-lightgreen">{hackerEmail}</a></p>
                        <p>يرجى التحقق من بريدك الإلكتروني والتحقق من حسابك, للمتابعة.</p>
                        <img src={EmailConfirmationImage} className="d-block mx-auto py-3 email-confirmation-icon" />
                        <small>لم تتلق البريد الإلكتروني؟</small>
                        <small><button className="text-lightgreen d-block mx-auto pt-3 bg-transparent border-0" onClick={onReSendEmail}>إعادة إرسال البريد الإلكتروني</button></small>
                        {status.success ? (
                            <div class="alert alert-success mt-3" role="alert">
                                {status.success}
                            </div>
                        ) : ''}
                        {status.error ? (
                            <div class="alert alert-danger mt-3" role="alert">
                                {status.error}
                            </div>
                        ) : ''}
                    </div>
                </div>
            ) : (
                <div className="container home">
                    <div class="jumbotron text-center bg-second">
                        <p className="lead">لا يوجد بريد إلكتروني حاليا برجاء إنشاء حساب جديد او تسجيل الدخول في حالة تم تفعيل حسابك</p>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Confirmation;