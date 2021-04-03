import React from 'react';
import { Link } from "react-router-dom";
import { FaEnvelopeOpen } from "react-icons/fa";


const Confirmation = () =>{
    return(
        <main className="email-confirmation">
            <div className="container">
                <div class="jumbotron text-center email-confirmation-body">
                    <p className="lead">لقد أرسلنا بريدًا إلكترونيًا إلى <Link to='mailto:moussaebrahem32@gmail.com' className="sent-email">moussaebrahem@gmail.com</Link></p>
                    <p>يرجى التحقق من بريدك الإلكتروني والتحقق من حسابك, للمتابعة.</p>
                    <FaEnvelopeOpen size={'10em'} className="d-block mx-auto py-3"/>
                    <small>لم تتلق البريد الإلكتروني؟</small>
                    <small><button className="resend-email-button d-block mx-auto pt-3">إعادة إرسال البريد الإلكتروني</button></small>
                </div>
            </div>
        </main>
    );
}

export default Confirmation;