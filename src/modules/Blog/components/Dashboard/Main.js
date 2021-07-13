import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link, useRouteMatch } from 'react-router-dom';
import { FaCogs } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiTask } from "react-icons/bi";
import HackerInfo from './layout/HackerInfo';
import HackerReports from './layout/HackerReports';
import HackerBadges from './layout/HackerBadges';
import HackerSkills from './layout/HackerSkills';
import HackerWASP from './layout/HackerWASP';
import HackerReportsWeak from './layout/HackerReportsWeak';
import HackerThanks from './layout/HackerThanks';
import HackerActivity from './layout/HackerActivity';
import HackerStat from './layout/HackerStat';
import Spinner from "../../../../shared/components/Spinner";

import { handleGetUserToken } from '../../actions/index';
import { handleGetUserInfo } from "../../actions/index";




const Main = (props) => {
  const { dispatch, hackerInfo } = props;

  const [loadded, setLoadded] = useState(false);
  const [data, setData] = useState(null);

  const token = handleGetUserToken('accessToken');
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(handleGetUserInfo(token));
    setData(hackerInfo);
  }, [dispatch])

  useEffect(() => {
    if (data) {
      setLoadded(true);
    }
  }, [hackerInfo])


  return (
    <div className="component-wrapper">
      {loadded ? (<div className="container-fluid home">
        <div className="row">
          <div className="col-1 bg-black">
            <nav className="col dbsidebar right-dbsidebar">
              <ul className="nav flex-column vertical-nav">
                <li className="nav-item">
                  <Link to='/'><HiOutlineClipboardList size='2rem' className="text-white" /></Link>
                </li>
                <li className="nav-item">
                  <Link to='/'><BiTask size='2rem' className="text-white" /></Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="jumbotron jumbotron-fluid text-center col-10 py-4 bg-second dbmain rounded">
            <div className="container-fluid">
              <HackerInfo />
              <HackerStat />
              <HackerReports />
              <HackerBadges />
              <HackerSkills />
              <HackerWASP />
              <HackerReportsWeak />
              <HackerThanks />
              <HackerActivity />
            </div>
          </div>
          <div className="col-1 bg-black">
            <nav className="col dbsidebar left-dbsidebar">
              <ul className="nav flex-column vertical-nav left-vertical-nav">
                <li className="nav-item settings-button rounded bg-second">
                  <Link to={`${match.path}/settings`}><FaCogs size='2rem' className="text-lightgreen" /></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >) : (<Spinner></Spinner>)}
    </div >
  )
}

const mapStateToProps = ({ blogs }) => {
  return {
    hackerInfo: blogs.userInfo
  };
};

export default connect(mapStateToProps)(Main);