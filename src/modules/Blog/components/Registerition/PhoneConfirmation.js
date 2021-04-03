import React, {useState} from 'react';
import { FaCheckCircle } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneConfirmation = () =>{
    return(
        <main className="phone-confirmation">
            <div className="container">
                <div className="jumbotron text-center phone-confirmation-body">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb custom-breadcrumb">
                            <li className="breadcrumb-item"><FaCheckCircle className="check-progress ml-2" size={'1.5em'}/> التحقق من البريد الإلكتروني</li>
                        </ol>
                    </nav>
                    <div className="jumbotron jumbotron-fluid phone-confirmation-form rounded">
                        <label className="d-block text-right box-title">التحقق من الموبيل</label>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <PhoneInput />
                                </div>
                            </div>
                            <button className="btn btn-lightgreen my-4 d-block mx-auto">التحقق</button>
                            <small className="d-block">سيصلك رسالة sms برمز التحقق الخاص بك</small>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PhoneConfirmation;