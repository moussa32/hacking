import React from 'react';
import Navbar from "../layout/Navbar";
import { withRouter } from "react-router-dom";


function Activity(props) {
  return (
    <>
      <Navbar currentPathname={props.location.pathname} />
      <div>
        Activity
      </div>
    </>
  )
}

export default withRouter(Activity);
