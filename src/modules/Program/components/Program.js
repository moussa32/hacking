import React from 'react';
import { Switch, Route, Redirect, withRouter, useRouteMatch } from 'react-router';

import NotFound from "../../../shared/components/NotFound";
import SignupProgram from "./Registerition/SignupProgram";

const Program = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path={`${match.path}/signup`} component={SignupProgram} />
        <Redirect to="/notfound" />
      </Switch>
    </>
  );
}

export default withRouter(Program);