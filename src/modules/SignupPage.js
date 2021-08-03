import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHackerrank } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import Spinner from "../shared/components/Spinner";
import Footer from "./Program/components/layout/Footer";
import Navbar from "../modules/Blog/components/layout/Navbar";
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
          <div className="container-fluid home available-margin">
            <div className="row">
              <div className="col-md-5 mx-auto">
                <Link className="text-white text-decoration-none" to="/program/signup">
                  <div className="card border-0 signup-card">
                    <div className="card-body text-center">
                      <BsBuilding className="mb-4" size={"4rem"} />
                      <h2 className="card-title signup-title">شركة</h2>
                      <ul className="text-right">
                        <li className="lead">اختبر منتجاتك وخدماتك الالكترونية</li>
                        <li className="lead">أكتشف نقاط الضعف</li>
                        <li className="lead">أمن نفسك</li>
                        <li className="lead">نافس بقوى</li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-5 mx-auto">
                <Link className="text-white text-decoration-none" to="/hacker/signup">
                  <div className="card border-0 signup-card">
                    <div className="card-body text-center">
                      <FaHackerrank className="mb-4" size={"4rem"} />
                      <h2 className="card-title signup-title">باحث أمني</h2>
                      <ul className="text-right">
                        <li className="lead">أربح المال</li>
                        <li className="lead">زود مهاراتك</li>
                        <li className="lead">انضم لمجتمع عالمي</li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <Spinner></Spinner>
        )}
      </div>
    </>
  );
};

export default SignupPage;
