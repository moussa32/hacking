import React from 'react';

const EmailTab = () => {
  return (
    <>
      <div className="row mx-2">
        <div className="col-md-12">
          <div class="alert alert-danger settings-alert" role="alert">
            <h4 class="alert-heading">تنبيه</h4>
            <p>في حالة تغييرك البريد الالكتروني سيتوقف العمل بالبريد القديم والحديث لمدة 24 ساعة تبدا من تاريخ اثبات ملكية البريد الجديد.</p>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-md-12">
          <form className="profile-settings">
            <div className="form-group">
              <label for="newEmail">البريد الإلكتروني الجديد</label>
              <input type="email" placeholder="example@gmail.com" className="form-control custom-input border-0" id="newEmail" />
            </div>
            <button type="submit" className="btn btn-settings d-block mx-auto settings-submit-button">تغيير البريد الالكتروني</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmailTab;