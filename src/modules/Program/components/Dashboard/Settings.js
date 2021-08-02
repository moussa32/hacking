import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import CompanyProfileTab from "./SettingsTabs/CompanyProfileTab";
import CompanyPolicyTab from "./SettingsTabs/CompanyPolicyTab";
import CompanyRewardsTab from "./SettingsTabs/CompanyRewardsTab";
import CompanyAssetsTab from "./SettingsTabs/CompanyAssetsTab.js";
import CompanyAdsTab from "./SettingsTabs/CompanyAdsTab.js";
import CompanyNotificationsTab from "./SettingsTabs/CompanyNotificationsTab.js";
import CompanyPreferencesTab from "./SettingsTabs/CompanyPreferencesTab.js";
import CompanyDeactivateTab from "./SettingsTabs/CompanyDeactivateTab.js";
import CompanyEmailTab from "../../../../shared/components/ResetEmail";
import CompanyPasswordTab from "./SettingsTabs/CompanyPasswordTab";
import CompanySessionTab from "./SettingsTabs/CompanySessionTab.js";
import Footer from "../layout/Footer";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("company-profile");
  const pills = [
    { type: "company-profile", lable: "ملف الشركة" },
    { type: "program-policy", lable: "سياسة البرنامج" },
    { type: "rewards", lable: "المكافأت" },
    { type: "domains", lable: "النطاقات" },
    { type: "ads", lable: "الإعلانات" },
    { type: "notifications", lable: "الإشعارات" },
    { type: "preferences", lable: "التفضيلات" },
    { type: "deactivate", lable: "الغاء التفعيل" },
    { type: "password", lable: "كلمة المرور" },
    { type: "email", lable: "البريد المستخدم" },
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
                  <Link key={index} className={`nav-link setting-tab-link ${activeTab === pill.type ? "active" : ""}`} id={pill.type} onClick={() => setActiveTab(pill.type)} to={`/program/dashboard/settings/${pill.type}`}>
                    {pill.lable}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="col-md-9 tab-body">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade active show bg-black" id="v-pills-company-profile" role="tabpanel" aria-labelledby="v-pills-company-profile-tab">
                <h2 className="text-center py-4">{}</h2>
                <Switch>
                  <Route path={`/program/dashboard/settings/${pills[0].type}`} component={CompanyProfileTab} />
                  <Route path={`/program/dashboard/settings/${pills[1].type}`} component={CompanyPolicyTab} />
                  <Route path={`/program/dashboard/settings/${pills[2].type}`} component={CompanyRewardsTab} />
                  <Route path={`/program/dashboard/settings/${pills[3].type}`} component={CompanyAssetsTab} />
                  <Route path={`/program/dashboard/settings/${pills[4].type}`} component={CompanyAdsTab} />
                  <Route path={`/program/dashboard/settings/${pills[5].type}`} component={CompanyNotificationsTab} />
                  <Route path={`/program/dashboard/settings/${pills[6].type}`} component={CompanyPreferencesTab} />
                  <Route path={`/program/dashboard/settings/${pills[7].type}`} component={CompanyDeactivateTab} />
                  <Route path={`/program/dashboard/settings/${pills[8].type}`} component={CompanyPasswordTab} />
                  <Route path={`/program/dashboard/settings/${pills[9].type}`} component={CompanyEmailTab} />
                  <Route path={`/program/dashboard/settings/${pills[10].type}`} component={CompanySessionTab} />
                  <Route path={`/program/dashboard/settings/`} component={CompanyProfileTab} />
                </Switch>
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-session" role="tabpanel" aria-labelledby="v-pills-session-tab">
                <CompanySessionTab />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default Settings;
