import React from "react";
import CompanyProfileTab from "./SettingsTabs/CompanyProfileTab";
import CompanyPolicyTab from "./SettingsTabs/CompanyPolicyTab";
import CompanyRewardsTab from "./SettingsTabs/CompanyRewardsTab";
import CompanyAssetsTab from "./SettingsTabs/CompanyAssetsTab.js";
import CompanyAdsTab from "./SettingsTabs/CompanyAdsTab.js";
import CompanyNotificationsTab from "./SettingsTabs/CompanyNotificationsTab.js";
import CompanyPreferencesTab from "./SettingsTabs/CompanyPreferencesTab.js";
import CompanyDeactivateTab from "./SettingsTabs/CompanyDeactivateTab.js";
import CompanyEmailTab from "./SettingsTabs/CompanyEmailTab";
import CompanyPasswordTab from "./SettingsTabs/CompanyPasswordTab";
import CompanySessionTab from "./SettingsTabs/CompanySessionTab.js";
import Footer from "../layout/Footer";
import "./Settings.css";

const Settings = () => {
  const pills = [
    {type: "company-profile", lable: "ملف الشركة"},
    {type: "program-policy", lable: "سياسة البرنامج"},
    {type: "rewards", lable: "المكافأت"},
    {type: "domains", lable: "النطاقات"},
    {type: "ads", lable: "الإعلانات"},
    {type: "notifications", lable: "الإشعارات"},
    {type: "preferences", lable: "التفضيلات"},
    {type: "deactivate", lable: "الغاء التفعيل"},
    {type: "password", lable: "كلمة المرور"},
    {type: "email", lable: "البريد المستخدم"},
    {type: "session", lable: "الجلسات"},
  ];

  return (
    <>
      <div className="container settings-container">
        <div className="row bg-second p-3">
          <div className="col-md-3 bg-black p-3 text-center">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <h2>الإعدادات</h2>
              {pills.map((pill, index) => {
                if (index == 0) {
                  return (
                    <a key={index} className="nav-link setting-tab-link active" id={`v-pills-${pill.type}-tab`} data-toggle="pill" href={`#v-pills-${pill.type}`} role="tab" aria-controls={`v-pills-${pill.type}`} aria-selected="false">
                      {pill.lable}
                    </a>
                  );
                } else {
                  return (
                    <a key={index} className="nav-link setting-tab-link" id={`v-pills-${pill.type}-tab`} data-toggle="pill" href={`#v-pills-${pill.type}`} role="tab" aria-controls={`v-pills-${pill.type}`} aria-selected="false">
                      {pill.lable}
                    </a>
                  );
                }
              })}
            </div>
          </div>
          <div className="col-md-9 tab-body">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade active show bg-black" id="v-pills-company-profile" role="tabpanel" aria-labelledby="v-pills-company-profile-tab">
                <h2 className="text-center py-4">{pills[0].lable}</h2>
                <CompanyProfileTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-program-policy" role="tabpanel" aria-labelledby="v-pills-program-policy-tab">
                <h2 className="text-center py-4">{pills[1].lable}</h2>
                <CompanyPolicyTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-rewards" role="tabpanel" aria-labelledby="v-pills-rewards-tab">
                <h2 className="text-center py-4">{pills[2].lable}</h2>
                <CompanyRewardsTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-domains" role="tabpanel" aria-labelledby="v-pills-domains-tab">
                <h2 className="text-center py-4">{pills[3].lable}</h2>
                <CompanyAssetsTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-ads" role="tabpanel" aria-labelledby="v-pills-ads-tab">
                <h2 className="text-center py-4">{pills[4].lable}</h2>
                <CompanyAdsTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-notifications" role="tabpanel" aria-labelledby="v-pills-notifications-tab">
                <h2 className="text-center py-4">{pills[5].lable}</h2>
                <CompanyNotificationsTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-preferences" role="tabpanel" aria-labelledby="v-pills-preferences-tab">
                <h2 className="text-center py-4">{pills[6].lable}</h2>
                <CompanyPreferencesTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-deactivate" role="tabpanel" aria-labelledby="v-pills-deactivate-tab">
                <h2 className="text-center py-4">{pills[7].lable}</h2>
                <CompanyDeactivateTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-password" role="tabpanel" aria-labelledby="v-pills-password-tab">
                <h2 className="text-center py-4">{pills[8].lable}</h2>
                <CompanyPasswordTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-email" role="tabpanel" aria-labelledby="v-pills-email-tab">
                <h2 className="text-center py-4">{pills[9].lable}</h2>
                <CompanyEmailTab />
              </div>
              <div className="tab-pane fade bg-black" id="v-pills-session" role="tabpanel" aria-labelledby="v-pills-session-tab">
                <h2 className="text-center py-4">{pills[10].lable}</h2>
                <CompanySessionTab />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
