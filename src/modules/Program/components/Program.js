import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router";

import NotFound from "../../../shared/components/NotFound";
import SignupProgram from "./Registerition/SignupProgram";
import EmailConfirmation from "./Registerition/EmailConfirmation";
import VerifyEmail from "../../../shared/components/Verify";
import Activity from "./Dashboard/Activity";
import ProgramPage from "./ProgramPage";
import Settings from "./Dashboard/Settings.js";
import { handleGetProgram } from "../actions";
import ProtectedRoute from "../../../shared/components/ProtectedRoute";
import ReportPage from "../../ReportPage";

const Program = ({ dispatch }) => {
  useEffect(() => {
    dispatch(handleGetProgram(localStorage.getItem("accessToken")));
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/program/signup" component={SignupProgram} />
        <Route exact path="/program/email-confirmation" component={EmailConfirmation} />
        <Route exact path="/program/verify-email" component={VerifyEmail} />
        <ProtectedRoute exact path="/program/dashboard/activity" component={Activity} />
        <ProtectedRoute exact path="/program/dashboard/settings" component={Settings} />
        <ProtectedRoute exact path="/program/dashboard/settings/:id" component={Settings} />
        <ProtectedRoute path="/program/dashboard/report" component={ReportPage} />
        <Route exact path="/program/:id/:slug" component={ProgramPage} />
        <Redirect to="/notfound" />
      </Switch>
    </>
  );
};

const mapStateToProps = ({ program }) => {
  return {};
};

export default connect(mapStateToProps)(withRouter(Program));
