import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const SmsConfirmation = () =>{
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
                                    <p>الرجاء إدخال رمز التحقق الذي أرسلناه إلى +201095122777</p>     
                                    <input type="text" className="form-control" placeholder="كود التحقق"/>                
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