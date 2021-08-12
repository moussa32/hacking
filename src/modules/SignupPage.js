import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHackerrank } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import Spinner from "../shared/components/Spinner";
import Footer from "./Program/components/layout/Footer";
import Navbar from "../modules/Blog/components/layout/Navbar";
import { FaHandshake } from "react-icons/fa";

import "./SignupPage.css";

const SignupPage = props => {
  const [loadded, setLoadded] = useState(false);

  useEffect(() => {
    setLoadded(true);
  });
  return (
    <>
      <Navbar currentPathname={props.location.pathname} />
      <div className="component-wrapper signup-page">
        {loadded ? (
          <>
            <div className="container-fluid home available-margin">
              <div className="row">
                <div className="col-md-12 text-center mb-4">
                  <div className="signuppage-slogan">
                    <FaHandshake className={"text-lightgreen"} size={"6rem"} />
                    <p className="lead">قم بتأمين تطبيقاتك من خلال الاختبار المستمر تحت مظلة Hacking Technology البيضاء. تشجع Hacking Technology الشركات والمؤسسات من كافة القطاعات على تأمين نشاطاتها بعيداً عن تدخلات القبعات السوداء التي قد تضر بالأصول.</p>
                  </div>
                </div>
                <div className="col-md-4 mx-auto">
                  <Link className="text-white text-decoration-none" to="/program/signup">
                    <div className="card border-0 signup-card">
                      <div className="card-body text-center">
                        <BsBuilding className="mb-4" size={"4rem"} />
                        <h2 className="card-title signup-title">شركة</h2>
                        <ul className="text-right">
                          <li className="lead">اختبر منتجاتك وخدماتك الالكترونية</li>
                          <li className="lead">اكتشف نقاط الضعف</li>
                          <li className="lead">أمِّن أعمالك</li>
                          <li className="lead">نافس بقوة</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4 mx-auto">
                  <Link className="text-white text-decoration-none" to="/hacker/signup">
                    <div className="card border-0 signup-card">
                      <div className="card-body text-center">
                        <FaHackerrank className="mb-4" size={"4rem"} />
                        <h2 className="card-title signup-title">باحث أمني</h2>
                        <ul className="text-right">
                          <li className="lead">حقِّق دخلاً</li>
                          <li className="lead">طَوِّر مهاراتك</li>
                          <li className="lead">انضم لمجتمع عالمي</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <Spinner></Spinner>
        )}
      </div>
    </>
  );
};

export default SignupPage;
