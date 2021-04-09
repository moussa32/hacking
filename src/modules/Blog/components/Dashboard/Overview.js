import React, { useState } from "react";
import { Switch, Route, withRouter, Redirect, useRouteMatch } from "react-router-dom";

import HackerNavbar from "./layout/HackerNavbar";
import ScrollToTop from "../../../../shared/components/ScrollToTop";
import NotFound from "./../../../../shared/components/NotFound";
import Main from "./Main";
import Activity from "./Activity";
import AvailablePrograms from "./AvailablePrograms";
import Leaderboard from "./Leaderboard";
import { handleGetUserToken } from '../../actions/index';


const Overview = (props) => {
    let match = useRouteMatch();
    let token = handleGetUserToken();

    return (
        <div>
            <HackerNavbar currentPathname={props.location.pathname} />
            <ScrollToTop />
            <Switch>
                {token ?
                    (<Route exact path={`${match.path}`} component={Main} />)
                    : (<Redirect to="/login" />)
                }
                <Route exact path="/notfound" component={NotFound} />
                <Route exact path={`${match.path}/activity`} component={Activity} />
                <Route exact path={`${match.path}/available-programs`} component={AvailablePrograms} />
                <Route exact path={`${match.path}/leaderboard`} component={Leaderboard} />
                <Route exact path={`${match.path}`} component={Main} />
                <Redirect to="/notfound" />
            </Switch>
        </div>
    );
};

export default withRouter(Overview);
