import React from 'react';
import ProfileTab from './SettingsTabs/ProfileTab';
import PasswordTab from './SettingsTabs/PasswordTab';
import EmailTab from './SettingsTabs/EmailTab';
import PaymentTab from './SettingsTabs/PaymentTab';
import NotificationsTab from './SettingsTabs/NotificationsTab';
import PointsTab from './SettingsTabs/PointsTab';
import DeactivateTab from './SettingsTabs/DeactivateTab';
import AuthenticationTab from './SettingsTabs/AuthenticationTab';
import AccountPreferencesTab from './SettingsTabs/AccountPreferencesTab.js';
import InvitationPreferencesTab from './SettingsTabs/InvitationPreferencesTab.js';


import './Settings.css';

const Settings = () => {
  const pills = [
    { type: 'profile', lable: 'الصفحة الشخصية' },
    { type: 'password', lable: 'كلمة المرور' },
    { type: 'email', lable: 'البريد الالكتروني' },
    { type: 'payment', lable: 'الدفع' },
    { type: 'notifications', lable: 'الاشعارات' },
    { type: 'points', lable: 'النقاط' },
    { type: 'deactivate', lable: 'تعطيل الحساب' },
    { type: 'authentication', lable: 'المصادقة' },
    { type: 'account-preferences', lable: 'تفضيلات الحساب' },
    { type: 'invitation-preferences', lable: 'تفضيلات الدعوة' },
    { type: 'session', lable: 'الجلسات' },
  ];

  return (
    <div className="container settings-container">
      <div className="row bg-second p-3">
        <div className="col-md-3 bg-black p-3 text-center">
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <h2>الإعدادات</h2>
            {pills.map((pill, index) => {
              if (index == 0) {
                return <a className="nav-link setting-tab-link active" id={`v-pills-${pill.type}-tab`} data-toggle="pill" href={`#v-pills-${pill.type}`} role="tab" aria-controls={`v-pills-${pill.type}`} aria-selected="false">{pill.lable}</a>
              } else {
                return <a className="nav-link setting-tab-link" id={`v-pills-${pill.type}-tab`} data-toggle="pill" href={`#v-pills-${pill.type}`} role="tab" aria-controls={`v-pills-${pill.type}`} aria-selected="false">{pill.lable}</a>
              }
            })}
          </div>
        </div>
        <div className="col-md-9 tab-body">
          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade active show bg-black" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
              <h2 className="text-center py-4">{pills[0].lable}</h2>
              <ProfileTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-password" role="tabpanel" aria-labelledby="v-pills-password-tab">
              <h2 className="text-center pt-4 pb-2">{pills[1].lable}</h2>
              <small class="d-block text-center pb-4">تغيير كلمة المرور</small>
              <PasswordTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-email" role="tabpanel" aria-labelledby="v-pills-email-tab">
              <h2 className="text-center pt-4 pb-2">{pills[2].lable}</h2>
              <small class="d-block text-center pb-4">تغيير بريدك الالكتروني</small>
              <EmailTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-payment" role="tabpanel" aria-labelledby="v-pills-payment-tab">
              <h2 className="text-center py-4">{pills[3].lable}</h2>
              <PaymentTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-notifications" role="tabpanel" aria-labelledby="v-pills-notifications-tab">
              <h2 className="text-center py-4">{pills[4].lable}</h2>
              <NotificationsTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-points" role="tabpanel" aria-labelledby="v-pills-points-tab">
              <h2 className="text-center py-4">{pills[5].lable}</h2>
              <PointsTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-deactivate" role="tabpanel" aria-labelledby="v-pills-deactivate-tab">
              <h2 className="text-center py-4">{pills[6].lable}</h2>
              <DeactivateTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-authentication" role="tabpanel" aria-labelledby="v-pills-authentication-tab">
              <h2 className="text-center py-4">التحقق بخطوتين</h2>
              <AuthenticationTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-account-preferences" role="tabpanel" aria-labelledby="v-pills-account-preferences-tab">
              <h2 className="text-center py-4">{pills[8].lable}</h2>
              <AccountPreferencesTab />
            </div>
            <div className="tab-pane fade bg-black" id="v-pills-invitation-preferences" role="tabpanel" aria-labelledby="v-pills-invitation-preferences-tab">
              <h2 className="text-center py-4">{pills[9].lable}</h2>
              <InvitationPreferencesTab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;