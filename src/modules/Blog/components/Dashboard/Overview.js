import React, { useState } from "react";
import { Switch, Route, withRouter, Redirect, useRouteMatch } from "react-router-dom";

import HackerNavbar from "./layout/HackerNavbar";
import ScrollToTop from "../../../../shared/components/ScrollToTop";
import NotFound from "./../../../../shared/components/NotFound";
import Main from "./Main";
import Activity from "./Activity";
import Settings from "./Settings";
import Footer from "../../../Program/components/layout/Footer";
import { handleGetUserToken } from "../../actions/index";

const Overview = props => {
  const [parentData, setParentData] = useState({});
  let match = useRouteMatch();
  let token = handleGetUserToken("accessToken");

  return (
    <div>
      <HackerNavbar currentPathname={props.location.pathname} />
      <ScrollToTop />
      <Switch>
        <Route exact path="/dashboard">
          <Main setParentData={setParentData} />
        </Route>
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/activity" component={Activity} />
        <Route exact path="/dashboard/settings" component={Settings} />
        <Route exact path="/dashboard/settings/:id" component={Settings} />
        <Route exact path={`${match.path}`} component={Main} />
        <Redirect to="/notfound" />
      </Switch>
      <Footer />
    </div>
  );
};

export default withRouter(Overview);
