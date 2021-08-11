import React, { useEffect, useState } from "react";
import axios from "axios";
import { dvbaseUrl } from "../../api/Constants";

const ResetEmail = () => {
  const [validToken, setValidToken] = useState(false);

  const userIdFromURL = new URLSearchParams(window.location.search).get("uid") || null;
  const userTokenFromURL = new URLSearchParams(window.location.search).get("token") || null;

  useEffect(() => {
    axios.post(`${dvbaseUrl}/api/v2/auth/users/reset_password_confirm/`, {
      new_username: "moussa",
    });

    if (userIdFromURL && userTokenFromURL) {
      setValidToken(true);
    } else {
      setValidToken(false);
    }
  }, []);

  return (
    <div className="container home my-0 mx-auto">
      {validToken ? (
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">تم بنجاح</h4>
          <p>تم تغيير بريدك الألكتروني بنجاح يمكنك الان تسجيل الدخول ببريدك الالكتروني الجديد.</p>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">فشلت المحاوله</h4>
          <p className="mt-4">يرجع هذا الخطاء إلي انه قد تكون جلستك قد انتهت او انك لم تقم بإعادة تعين كلمة المرور بشكل صحيح</p>
          <hr className="mt-2" />
          <p className="mb-0">لتفادي هذه المشكلة يمكنك إعادة تعين كلمة المرور مره اخرى من لوحة التحكم</p>
        </div>
      )}
    </div>
  );
};

export default ResetEmail;
