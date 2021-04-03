import React from 'react';
import { Link } from "react-router-dom";
import { FaEnvelopeOpen } from "react-icons/fa";


const Confirmation = () => {
    return (
        <main class="component-wrapper">
            <div className="container home">
                <div class="jumbotron text-center bg-second">
                    <p className="lead">لقد أرسلنا بريدًا إلكترونيًا إلى <Link to='mailto:moussaebrahem32@gmail.com' className="text-lightgreen">moussaebrahem@gmail.com</Link></p>
                    <p>يرجى التحقق من بريدك الإلكتروني والتحقق من حسابك, للمتابعة.</p>
                    <FaEnvelopeOpen size={'10em'} className="d-block mx-auto py-3" />
                    <small>لم تتلق البريد الإلكتروني؟</small>
                    <small><a className="text-lightgreen d-block mx-auto pt-3">إعادة إرسال البريد الإلكتروني</a></small>
                </div>
            </div>
        </main>
    );
}

export default Confirmation;