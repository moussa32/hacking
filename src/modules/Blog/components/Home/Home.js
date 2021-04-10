import React, { useState } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ScrollToTop from "../../../../shared/components/ScrollToTop";
import SocialMedia from "../layout/SocialMedia";
import AboutUs from "../../../../shared/components/StaticContent/AboutUs";
import ContactUs from "../ContactUs";
import Blog from "../Blog/Blog";
import PrivacyPolicy from "../../../../shared/components/StaticContent/PrivacyPolicy";
import TermsOfUse from "../../../../shared/components/StaticContent/TermsOfUse";
import NotFound from "./../../../../shared/components/NotFound";
import ByTagsList from "../Blog/ByTagsList";
import Tags from "../Blog/Tags";
import BlogHome from "../Blog";
import Main from "../Main";
import Login from "../Login";
import SignUp from "../Registerition/SignUp";
import EmailConfirmation from "../Registerition/EmailConfirmation";
import MobileConfirmation from "../Registerition/MobileConfirmation";
import SmsConfirmation from "../Registerition/SmsConfirmation";
import EmailVerify from "../Registerition/EmailVerify";




const Home = (props) => {
  const [parentData, setParentData] = useState({});

  return (
    <div>
      <Navbar currentPathname={props.location.pathname} />
      <ScrollToTop />
      <Switch>
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/terms-of-use" component={TermsOfUse} />
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/tags/:tag" component={ByTagsList} />
        <Route exact path="/blog" component={BlogHome} />
        <Route exact path="/blog/:slug/:id" component={Blog} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" >
          <SignUp setParentData={setParentData} />
        </Route>
        <Route exact path="/email-confirmation">
          <EmailConfirmation emailData={parentData} />
        </Route>
        <Route exact path="/mobile-confirmation" component={MobileConfirmation} />
        <Route exact path="/sms-confirmation" component={SmsConfirmation} />
        <Route exact path="/verify-email" >
          <EmailVerify userToken={parentData} />
        </Route>
        <Route exact path="/" component={Main} />
        <Redirect to="/notfound" />
      </Switch>
      <SocialMedia />
      <Footer />
    </div>
  );
};

export default withRouter(Home);
