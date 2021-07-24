import React from 'react';
import Navbar from '../layout/Navbar';
import { withRouter } from "react-router-dom";

function Leaderboard(props) {
  return (
    <>
      <Navbar currentPathname={props.location.pathname} />
      <div>Leaderboard</div>
    </>
  )
}

export default withRouter(Leaderboard);
