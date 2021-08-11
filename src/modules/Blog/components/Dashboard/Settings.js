import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import ProfileTab from "./SettingsTabs/ProfileTab";
import SkillsTab from "./SettingsTabs/SkillsTab.js";
import PasswordTab from "./SettingsTabs/PasswordTab";
import EmailTab from "../../../../shared/components/ResetEmail";
import PaymentTab from "./SettingsTabs/PaymentTab";
import NotificationsTab from "./SettingsTabs/NotificationsTab";
import PointsTab from "./SettingsTabs/PointsTab";
import DeactivateTab from "./SettingsTabs/DeactivateTab";
import AuthenticationTab from "./SettingsTabs/AuthenticationTab";
import AccountPreferencesTab from "./SettingsTabs/AccountPreferencesTab.js";
import InvitationPreferencesTab from "./SettingsTabs/InvitationPreferencesTab.js";
import SessionTab from "./SettingsTabs/SessionTab.js";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const pills = [
    { type: "profile", lable: "الصفحة الشخصية" },
    { type: "password", lable: "كلمة المرور" },
    { type: "skills", lable: "المهارات" },
    { type: "email", lable: "البريد الالكتروني" },
    { type: "payment", lable: "الدفع" },
    { type: "notifications", lable: "الاشعارات" },
    { type: "points", lable: "النقاط" },
    { type: "deactivate", lable: "تعطيل الحساب" },
    { type: "authentication", lable: "المصادقة" },
    { type: "account-preferences", lable: "تفضيلات الحساب" },
    { type: "invitation-preferences", lable: "تفضيلات الدعوة" },
    { type: "session", lable: "الجلسات" },
  ];
  let currentPath = useParams().id;

  useEffect(() => {
    setActiveTab(currentPath);
  }, [currentPath]);

  return (
    <Router>
      <div className="container settings-container">
        <div className="row bg-second p-3">
          <div className="col-md-3 bg-black p-3 text-center">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <h2>الإعدادات</h2>
              {pills.map((pill, index) => {
                return (
                  <Link key={index} className={`nav-link setting-tab-link ${activeTab === pill.type ? "active" : ""}`} id={pill.type} onClick={() => setActiveTab(pill.type)} to={`/dashboard/settings/${pill.type}`}>
                    {pill.lable}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="col-md-9 tab-body">
            <div className="tab-content bg-black py-4" id="v-pills-tabContent">
              <Switch>
                <Route path={`/dashboard/settings/${pills[0].type}`} component={ProfileTab} />
                <Route path={`/dashboard/settings/${pills[1].type}`} component={PasswordTab} />
                <Route path={`/dashboard/settings/${pills[2].type}`} component={SkillsTab} />
                <Route path={`/dashboard/settings/${pills[3].type}`} component={EmailTab} />
                <Route path={`/dashboard/settings/${pills[4].type}`} component={PaymentTab} />
                <Route path={`/dashboard/settings/${pills[5].type}`} component={NotificationsTab} />
                <Route path={`/dashboard/settings/${pills[6].type}`} component={PointsTab} />
                <Route path={`/dashboard/settings/${pills[7].type}`} component={DeactivateTab} />
                <Route path={`/dashboard/settings/${pills[8].type}`} component={AuthenticationTab} />
                <Route path={`/dashboard/settings/${pills[9].type}`} component={AccountPreferencesTab} />
                <Route path={`/dashboard/settings/${pills[10].type}`} component={InvitationPreferencesTab} />
                <Route path={`/dashboard/settings/${pills[11].type}`} component={SessionTab} />
                <Route path={`/dashboard/settings/`} component={ProfileTab} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Settings;
