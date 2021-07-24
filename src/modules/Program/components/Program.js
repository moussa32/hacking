import React from 'react';
import { Switch, Route, Redirect, withRouter, useRouteMatch } from 'react-router';

import NotFound from "../../../shared/components/NotFound";
import SignupProgram from "./Registerition/SignupProgram";
import EmailConfirmation from "./Registerition/EmailConfirmation";
import VerifyEmail from "../../../shared/components/Verify";
import Main from "./Dashboard/Main";
import Activity from "./Dashboard/Activity";
import AvailablePrograms from "./Dashboard/AvailablePrograms";
import Leaderboard from "./Dashboard/Leaderboard";


const Program = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path={`${match.path}/dashboard`} component={Main} />
        <Route exact path={`${match.path}/dashboard/activity`} component={Activity} />
        <Route exact path={`${match.path}/dashboard/available-programs`} component={AvailablePrograms} />
        <Route exact path={`${match.path}/dashboard/leaderboard`} component={Leaderboard} />
        <Route exact path={`${match.path}/signup`} component={SignupProgram} />
        <Route exact path={`${match.path}/email-confirmation`} component={EmailConfirmation} />
        <Route exact path={`${match.path}/verify-email`} component={VerifyEmail} />
        <Redirect to="/notfound" />
      </Switch>
    </>
  );
}

export default withRouter(Program);