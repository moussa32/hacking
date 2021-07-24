import React from 'react';
import Navbar from '../layout/Navbar';
import { withRouter } from "react-router-dom";

const AvailablePrograms = (props) => {
  return (
    <>
      <Navbar currentPathname={props.location.pathname} />
      <div>
        AvailablePrograms
      </div>
    </>
  )
}

export default withRouter(AvailablePrograms);
