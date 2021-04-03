import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const SmsConfirmation = () => {
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
                                    <p>الرجاء إدخال رمز التحقق الذي أرسلناه إلى +201095122777</p>
                                    <input type="text" className="form-control bg-white text-dark py-4" placeholder="كود التحقق" />
                                </div>
                            </div>
                            <button className="btn btn-lightgreen my-4 d-block mx-auto">إرسال</button>
                            <small className="d-block">لم تتلق الرمز؟  <a href="#" className="text-lightgreen">أعد إرسال الرمز</a></small>
                            <Link className="text-lightgreen mt-3 d-block" to='/PhoneConfirmation'>غير رقم الهاتف</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SmsConfirmation;