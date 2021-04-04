import React from "react";
import { Switch, Route, withRouter, Redirect, useRouteMatch } from "react-router-dom";

import HackerNavbar from "./layout/HackerNavbar";
import ScrollToTop from "../../../../shared/components/ScrollToTop";
import NotFound from "./../../../../shared/components/NotFound";
import Main from "./Main";
import Activity from "./Activity";
import AvailablePrograms from "./AvailablePrograms";
import Leaderboard from "./Leaderboard";



const Overview = (props) => {
    let { path, url } = useRouteMatch();
    console.log(url);
    console.log(path);
    console.log(props.location.pathname);

    return (
        <div>
            <HackerNavbar currentPathname={props.location.pathname} />
            <ScrollToTop />
            <Switch>
                <Route exact path="/notfound" component={NotFound} />
                <Route exact path={`/dashboard/activity`} component={Activity} />
                <Route exact path={`/dashboard/available-programs`} component={AvailablePrograms} />
                <Route exact path={`/dashboard/leaderboard`} component={Leaderboard} />
                <Route exact path={`${path}`} component={Main} />
                <Redirect to="/notfound" />
            </Switch>
        </div>
    );
};

export default withRouter(Overview);
