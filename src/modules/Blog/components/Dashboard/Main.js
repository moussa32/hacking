import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { FaCogs } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiTask, BiCrown } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdStars } from "react-icons/md";
import HackerInfo from './layout/HackerInfo';
import HackerReports from './layout/HackerReports';
import HackerBadges from './layout/HackerBadges';
import HackerSkills from './layout/HackerSkills';
import HackerWASP from './layout/HackerWASP';
import HackerReportsWeak from './layout/HackerReportsWeak';
import HackerThanks from './layout/HackerThanks';
import HackerActivity from './layout/HackerActivity';
import Spinner from "../../../../shared/components/Spinner";
import { getHackerInfo } from '../../../../api/DashboardApi';
import { getNewTokens } from '../../../../api/RefreshTokenApi';
import { handleGetUserToken } from '../../actions/index';




const Main = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loadded, setLoadded] = useState(false);

  const token = handleGetUserToken('accessToken');
  const reFreshtoken = handleGetUserToken('refreshToken');
  const hackerData = getHackerInfo(token);

  useEffect(() => {
    hackerData
      .then(item => {
        setUserInfo(item.data);
        setLoadded(true);
      }).catch(function (error) {
        console.log(error.response);
        if (error.response.status == 401) {
          getNewTokens(reFreshtoken);
        }
      })
  }, [])

  return (
    <mian className="component-wrapper">
      {loadded ? (<div class="container-fluid home">
        <div className="row">
          <div className="col-1 bg-black">
            <nav className="col dbsidebar right-dbsidebar">
              <ul class="nav flex-column vertical-nav">
                <li class="nav-item">
                  <Link to='/'><HiOutlineClipboardList size='2rem' className="text-white" /></Link>
                </li>
                <li class="nav-item">
                  <Link to='/'><BiTask size='2rem' className="text-white" /></Link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="jumbotron jumbotron-fluid text-center col-10 py-4 bg-second dbmain rounded">
            <div class="container-fluid">
              <HackerInfo userInfo={userInfo} />
              <section className="row">
                <div className="col-md-4 p-3 rounded">
                  <div className="card bg-black">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 text-right"><h4>الأرباح</h4></div>
                        <div className="col-md-6 text-left"><h4><AiFillDollarCircle size={'2rem'} /></h4></div>
                      </div>
                      <p className="hacker-stat-numbers mt-2 mb-1">{userInfo.hacker.earnings ? (userInfo.hacker.earnings) : '00.00'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 p-3 rounded">
                  <div className="card bg-black">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 text-right"><h4>النقاط</h4></div>
                        <div className="col-md-6 text-left"><h4><MdStars size={'2rem'} /></h4></div>
                      </div>
                      <p className="hacker-stat-numbers mt-2 mb-1">{userInfo.hacker.points ? (userInfo.hacker.points) : '0'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 p-3 rounded">
                  <div className="card bg-black">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 text-right"><h4>ترتيبك</h4></div>
                        <div className="col-md-6 text-left"><h4><BiCrown size={'2rem'} /></h4></div>
                      </div>
                      <p className="hacker-stat-numbers mt-2 mb-1">{userInfo.hacker.rank ? (userInfo.hacker.rank) : '0'}</p>
                    </div>
                  </div>
                </div>
              </section>
              <HackerReports />
              <HackerBadges userInfo={userInfo} />
              <HackerSkills userSkills={userInfo.hacker.skills} />
              <HackerWASP />
              <HackerReportsWeak />
              <HackerThanks userThankers={userInfo.hacker.thankers} />
              <HackerActivity />
            </div>
          </div>
          <div className="col-1 bg-black">
            <nav className="col dbsidebar left-dbsidebar">
              <ul class="nav flex-column vertical-nav left-vertical-nav">
                <li class="nav-item settings-button rounded bg-second">
                  <Link to='/'><FaCogs size='2rem' className="text-lightgreen" /></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >) : (<Spinner></Spinner>)}

    </mian >
  )
}

export default Main;