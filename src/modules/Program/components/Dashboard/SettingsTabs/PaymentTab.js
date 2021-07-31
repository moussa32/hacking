import React from 'react';
import "./PaymentTab.css";

const PaymentTab = () => {
  return (
    <>
      <div className="row mx-0 my-4">
        <div className="col-md-6">
          <h4>الأرباح</h4>
          <a href="#" className="text-lightgreen">ارسال ملف CSV عبر البريد الالكتروني</a>
        </div>
        <div className="col-md-6 text-left">
          <h4>الرصيد</h4>
          <span className="balance">10$</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-11 mx-auto">
          <table className="table bg-second text-white text-center">
            <thead>
              <tr>
                <th className="payment-head" scope="col"><span>المصدر</span></th>
                <th className="payment-head" scope="col"><span>التاريخ</span></th>
                <th className="payment-head" scope="col"><span>مكافأة من</span></th>
                <th className="payment-head" scope="col"><span>الكمية</span></th>
              </tr>
            </thead>
            <tbody>
              <tr className="payment-row">
                <th scope="row"><img className="payment-logo" alt="" title="" src="https://linkysoft.com/wp-content/uploads/2018/04/%D8%A8%D9%88%D8%A7%D8%B3%D8%B7%D8%A9-%D8%A8%D8%A7%D9%89-%D8%A8%D8%A7%D9%84-%D9%84%D8%B4%D8%B1%D9%83%D8%A9-%D9%84%D9%8A%D9%86%D9%83%D9%89-%D8%B3%D9%88%D9%81%D8%AA.png" /> PayPal</th>
                <td>2020 مارس 21</td>
                <td><img className="payment-logo" alt="" title="" src="https://img1.arabpng.com/20180329/xxe/kisspng-olx-nigeria-classified-advertising-business-sales-telegram-5abd4c79697788.718289541522355321432.jpg" /> OLX</td>
                <td>21</td>
              </tr>
              <tr>
                <th scope="row"><img className="payment-logo" alt="" title="" src="https://linkysoft.com/wp-content/uploads/2018/04/%D8%A8%D9%88%D8%A7%D8%B3%D8%B7%D8%A9-%D8%A8%D8%A7%D9%89-%D8%A8%D8%A7%D9%84-%D9%84%D8%B4%D8%B1%D9%83%D8%A9-%D9%84%D9%8A%D9%86%D9%83%D9%89-%D8%B3%D9%88%D9%81%D8%AA.png" /> PayPal</th>
                <td>2020 مارس 21</td>
                <td><img className="payment-logo" alt="" title="" src="https://img1.arabpng.com/20180329/xxe/kisspng-olx-nigeria-classified-advertising-business-sales-telegram-5abd4c79697788.718289541522355321432.jpg" /> OLX</td>
                <td>53</td>
              </tr>
              <tr>
                <th scope="row"><img className="payment-logo" alt="" title="" src="https://linkysoft.com/wp-content/uploads/2018/04/%D8%A8%D9%88%D8%A7%D8%B3%D8%B7%D8%A9-%D8%A8%D8%A7%D9%89-%D8%A8%D8%A7%D9%84-%D9%84%D8%B4%D8%B1%D9%83%D8%A9-%D9%84%D9%8A%D9%86%D9%83%D9%89-%D8%B3%D9%88%D9%81%D8%AA.png" /> PayPal</th>
                <td>2020 مارس 21</td>
                <td><img className="payment-logo" alt="" title="" src="https://img1.arabpng.com/20180329/xxe/kisspng-olx-nigeria-classified-advertising-business-sales-telegram-5abd4c79697788.718289541522355321432.jpg" /> OLX</td>
                <td>98</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PaymentTab;