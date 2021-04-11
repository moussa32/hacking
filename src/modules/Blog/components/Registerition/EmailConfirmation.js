import React from 'react';
import { EmailConfirmationImage } from '../../../../assets/index';


const Confirmation = ({ emailData }) => {
    const hackerEmail = emailData.hacker_data.email
    return (
        <main class="component-wrapper">
            {hackerEmail ? (
                <div className="container home">
                    <div class="jumbotron text-center bg-second">
                        <p className="lead">لقد أرسلنا بريدًا إلكترونيًا إلى <a href={`mailto:${hackerEmail}`} target="_blank" rel="nofollow" className="text-lightgreen">{hackerEmail}</a></p>
                        <p>يرجى التحقق من بريدك الإلكتروني والتحقق من حسابك, للمتابعة.</p>
                        <img src={EmailConfirmationImage} className="d-block mx-auto py-3 email-confirmation-icon" />
                        <small>لم تتلق البريد الإلكتروني؟</small>
                        <small><button className="text-lightgreen d-block mx-auto pt-3 bg-transparent border-0">إعادة إرسال البريد الإلكتروني</button></small>
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