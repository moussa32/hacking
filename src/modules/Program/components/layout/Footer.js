import React from "react";
import { GreenLogo } from "../../../../assets";
import { FaFacebook, FaTelegram, FaSnapchat, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-4 py-3 bg-second">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <img src={GreenLogo} width={45} height={45} alt="hacking tech" className="d-block mx-auto" title="hacking" />
          </div>
          <div className="col-md-2 footer-list">
            <h5 className="text-lightgreen">الأحكام والشروط</h5>
            <ul className="list-unstyled text-small p-0">
              <li>
                <a className="text-white" href="/usage-policy">
                  سياسة الإستخدام
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 footer-list">
            <h5 className="text-lightgreen">إنضم إلينا</h5>
            <ul className="list-unstyled text-small p-0">
              <li>
                <a className="text-white" href="/program/signup">
                  شركة
                </a>
              </li>
              <li>
                <a className="text-white" href="/hacker/signup">
                  باحث أمني
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 footer-list">
            <h5 className="text-lightgreen">روابط خاصة</h5>
            <ul className="list-unstyled text-small p-0">
              <li>
                <a className="text-white" href="/contact-us">
                  أتصل بنا
                </a>
              </li>
              <li>
                <a className="text-white" href="/about-us">
                  من نحن
                </a>
              </li>
              <li>
                <a className="text-white" href="/blog">
                  المدونة
                </a>
              </li>
              <li>
                <a className="text-white" href="/#">
                  Stuff for developers
                </a>
              </li>
              <li>
                <a className="text-white" href="/#">
                  Another one
                </a>
              </li>
              <li>
                <a className="text-white" href="/#">
                  Last time
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 footer-list">
            <ul className="list-unstyled text-small flex-wrap p-0 d-flex align-items-center justify-content-center">
              <li className="m-1">
                <a className="text-white" href="https://facebook.com/HTBCSS/">
                  <FaFacebook size={"2rem"} />
                </a>
              </li>
              <li className="m-1">
                <a className="text-white" href="https://t.me/HTBCSS">
                  <FaTelegram size={"2rem"} />
                </a>
              </li>
              <li className="m-1">
                <a className="text-white" href="https://www.instagram.com/HTBCSS">
                  <FiInstagram size={"2rem"} />
                </a>
              </li>
              <li className="m-1">
                <a className="text-white" href="https://www.snapchat.com/add/HTBCSS">
                  <FaSnapchat size={"2rem"} />
                </a>
              </li>
              <li className="m-1">
                <a className="text-white" href="https://wwww.twitter.com/HTBCSS">
                  <FaTwitter size={"2rem"} />
                </a>
              </li>
              <li className="m-1">
                <a className="text-white" href="https://www.tiktok.com/@htbcss">
                  <SiTiktok size={"2rem"} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <p className="text-center">
              حقوق النشر <span className="text-lightgreen">2021</span> بواسطة Hacking Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
