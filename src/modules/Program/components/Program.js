import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect, withRouter, useRouteMatch} from "react-router";

import NotFound from "../../../shared/components/NotFound";
import SignupProgram from "./Registerition/SignupProgram";
import EmailConfirmation from "./Registerition/EmailConfirmation";
import VerifyEmail from "../../../shared/components/Verify";
import Main from "./Dashboard/Main";
import Activity from "./Dashboard/Activity";
import Leaderboard from "./Dashboard/Leaderboard";
import ProgramHome from "./ProgramHome";
import Settings from "./Dashboard/Settings.js";
import Navbar from "./layout/Navbar";

import {handleGetProgram} from "../actions";

const Program = ({location}) => {
  return (
    <>
      <Navbar currentPathname={location.pathname} />
      <Switch>
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/program/signup" component={SignupProgram} />
        <Route exact path="/program/email-confirmation" component={EmailConfirmation} />
        <Route exact path="/program/verify-email" component={VerifyEmail} />
        <Route exact path="/program/dashboard" component={Main} />
        <Route exact path="/program/dashboard/activity" component={Activity} />
        <Route exact path="/program/dashboard/settings" component={Settings} />
        <Route exact path="/program/dashboard/leaderboard" component={Leaderboard} />
        <Route exact path="/program/:id/:slug" component={ProgramHome} />
        <Redirect to="/notfound" />
      </Switch>
    </>
  );
};

export default withRouter(Program);
