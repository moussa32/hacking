import React from 'react';
import { WhiteLogo } from '../../../../assets';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiWhatsappFill, RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-second">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md">
            <img src={WhiteLogo} alt="hacking tech" title="hacking" />
          </div>
          <div className="col-6 col-md">
            <h5 className="text-lightgreen">الأحكام والشروط</h5>
            <ul className="list-unstyled text-small p-0">
              <li><a className="text-white" href="#">Cool stuff</a></li>
              <li><a className="text-white" href="#">Random feature</a></li>
              <li><a className="text-white" href="#">Team feature</a></li>
              <li><a className="text-white" href="#">Stuff for developers</a></li>
              <li><a className="text-white" href="#">Another one</a></li>
              <li><a className="text-white" href="#">Last time</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-lightgreen">الأحكام والشروط</h5>
            <ul className="list-unstyled text-small p-0">
              <li><a className="text-white" href="#">Cool stuff</a></li>
              <li><a className="text-white" href="#">Random feature</a></li>
              <li><a className="text-white" href="#">Team feature</a></li>
              <li><a className="text-white" href="#">Stuff for developers</a></li>
              <li><a className="text-white" href="#">Another one</a></li>
              <li><a className="text-white" href="#">Last time</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-lightgreen">الأحكام والشروط</h5>
            <ul className="list-unstyled text-small p-0">
              <li><a className="text-white" href="#">Cool stuff</a></li>
              <li><a className="text-white" href="#">Random feature</a></li>
              <li><a className="text-white" href="#">Team feature</a></li>
              <li><a className="text-white" href="#">Stuff for developers</a></li>
              <li><a className="text-white" href="#">Another one</a></li>
              <li><a className="text-white" href="#">Last time</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5 className="text-lightgreen">الأحكام والشروط</h5>
            <ul className="list-unstyled text-small p-0">
              <li><a className="text-white" href="#">Cool stuff</a></li>
              <li><a className="text-white" href="#">Random feature</a></li>
              <li><a className="text-white" href="#">Team feature</a></li>
              <li><a className="text-white" href="#">Stuff for developers</a></li>
              <li><a className="text-white" href="#">Another one</a></li>
              <li><a className="text-white" href="#">Last time</a></li>
            </ul>
          </div>
          <div className="col-8 col-md align-self-center">
            <ul className="list-unstyled text-small p-0 d-flex align-items-center">
              <li className="mx-1"><a className="text-white" href="#"><FaFacebook size={"2rem"} /></a></li>
              <li className="mx-1"><a className="text-white" href="#"><RiWhatsappFill size={"2rem"} /></a></li>
              <li className="mx-1"><a className="text-white" href="#"><FaLinkedin size={"2rem"} /></a></li>
              <li className="mx-1"><a className="text-white" href="#"><RiGithubFill size={"2rem"} /></a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <p className="text-center">حقوق النشر <span className="text-lightgreen">2021</span> بواسطة هاكنج</p>
          </div>
        </div>
      </div>
    </footer >
  )
}

export default Footer