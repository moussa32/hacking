import React from "react";
import { GreenLogo } from "../../../../assets";
import { FaFacebook, FaTelegram, FaSnapchat, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-4 pt-3 pb-0 bg-black">
      <div className="container p-4">
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
            </ul>
          </div>
          <div className="col-md-4 footer-list">
            <ul className="media-list li-space-lg p-medium d-flex px-0 py-3 m-0 footer-social-icon">
              <li className="media m-1">
                <a className="text-white" href="https://facebook.com/HTBCSS/">
                  <FaFacebook size={"2.3rem"} className="text-lightgreen bg-second rounded p-1 m-1" />
                </a>
              </li>
              <li className="media m-1">
                <a className="text-white" href="https://t.me/HTBCSS">
                  <FaTelegram size={"2.3rem"} className="text-lightgreen bg-second rounded p-1 m-1" />
                </a>
              </li>
              <li className="media m-1">
                <a className="text-white" href="https://www.instagram.com/HTBCSS">
                  <FiInstagram size={"2.3rem"} className="text-lightgreen bg-second rounded p-1 m-1" />
                </a>
              </li>
              <li className="media m-1">
                <a className="text-white" href="https://www.snapchat.com/add/HTBCSS">
                  <FaSnapchat size={"2.3rem"} className="text-lightgreen bg-second rounded p-1 m-1" />
                </a>
              </li>
              <li className="media m-1">
                <a className="text-white" href="https://wwww.twitter.com/HTBCSS">
                  <FaTwitter size={"2.3rem"} className="text-lightgreen bg-second rounded p-1 m-1" />
                </a>
              </li>
              <li className="media m-1">
                <a className="text-white" href="https://www.tiktok.com/@htbcss">
                  <SiTiktok size={"2.3rem"} className="text-lightgreen bg-second rounded p-1 m-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-second pt-1">
        <div className="row mt-3">
          <div class="col-lg-12 d-flex justify-content-between">
            <p class="p-small text-muted">
              جميع الحقوق محفوظة ©<span id="ftDate"> 2021</span>
            </p>
            <div class="d-flex justify-content-between privacy-terms">
              <a class="p-small mx-2" href="/privacy-policy">
                سياسة الخصوصية
              </a>
              <a class="p-small mx-2" href="/terms-of-use">
                اتفاقية الاستخدام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
