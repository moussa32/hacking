import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter, useRouteMatch } from "react-router";

import NotFound from "../../../shared/components/NotFound";
import SignupProgram from "./Registerition/SignupProgram";
import EmailConfirmation from "./Registerition/EmailConfirmation";
import VerifyEmail from "../../../shared/components/Verify";
import Main from "./Dashboard/Main";
import Activity from "./Dashboard/Activity";
import Leaderboard from "./Dashboard/Leaderboard";
import ProgramPage from "./ProgramPage";
import Settings from "./Dashboard/Settings.js";
import Navbar from "./layout/Navbar";
import MainNavbar from "../../../modules/Blog/components/layout/Navbar";
import { handleGetProgram } from "../actions";
import { useHistory } from "react-router-dom";

const Program = ({ location, dispatch }) => {
  useEffect(() => {
    dispatch(handleGetProgram(localStorage.getItem("accessToken")));
  }, [dispatch]);
  const history = useHistory();
  return (
    <>
      {localStorage.getItem("accessToken") ? <Navbar currentPathname={location.pathname} /> : <MainNavbar currentPathname={location.pathname} />}
      <Switch>
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/program/signup" component={SignupProgram} />
        <Route exact path="/program/email-confirmation" component={EmailConfirmation} />
        <Route exact path="/program/verify-email" component={VerifyEmail} />
        <Route exact path="/program/:id/:slug" component={ProgramPage} />
        {!localStorage.getItem("accessToken") ? (
          <Redirect to="/login" />
        ) : (
          <>
            <Route exact path="/program/dashboard" component={Main} />
            <Route exact path="/program/dashboard/activity" component={Activity} />
            <Route exact path="/program/dashboard/settings" component={Settings} />
            <Route exact path="/program/dashboard/settings/:id" component={Settings} />
            <Route exact path="/program/dashboard/leaderboard" component={Leaderboard} />
          </>
        )}
        <Redirect to="/notfound" />
      </Switch>
    </>
  );
};

const mapStateToProps = ({ program }) => {
  return {};
};

export default connect(mapStateToProps)(withRouter(Program));
