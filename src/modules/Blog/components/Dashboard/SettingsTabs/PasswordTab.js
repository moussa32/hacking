import React from 'react';

const PasswordTab = () => {
  return (
    <>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings">
            <div className="form-group">
              <label for="email">البريد الإلكتروني</label>
              <input type="email" placeholder="example@gmail.com" className="form-control custom-input border-0" id="email" aria-describedby="emailHelp" />
              <small className="form-text text-muted">برجاء كتابة البريد الإلكتروني المستخدم للإرسال رابط إعادة التعيين</small>
            </div>
            <button type="submit" className="btn btn-settings d-block mx-auto settings-submit-button">تغيير كلمة المرور</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordTab;