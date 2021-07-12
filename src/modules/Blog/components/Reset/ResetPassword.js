import React, { useEffect, useState } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
const ResetPassword = () => {
  const [validToken, setValidToken] = useState(false);

  const userIdFromURL = (new URLSearchParams(window.location.search)).get("uid") || null;
  const userTokenFromURL = (new URLSearchParams(window.location.search)).get("token") || null;

  useEffect(() => {
    if (userIdFromURL && userTokenFromURL) {
      setValidToken(true);
    } else {
      setValidToken(false);
    }

  }, [])

  return (
    <div className="container home my-4">
      {validToken ? (
        <ResetPasswordForm uid={userIdFromURL} token={userTokenFromURL} />
      )
        : <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">فشلت المحاوله</h4>
          <p className="mt-4">يرجع هذا الخطاء إلي انه قد تكون جلستك قد انتهت او انك لم تقم بإعادة تعين كلمة المرور بشكل صحيح</p>
          <hr className="mt-2" />
          <p className="mb-0">لتفادي هذه المشكلة يمكنك إعادة تعين كلمة المرور مره اخرى من لوحة التحكم</p>
        </div>}
    </div >
  )
}

export default ResetPassword;