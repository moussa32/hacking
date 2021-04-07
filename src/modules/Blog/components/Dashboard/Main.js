import React from 'react';
import { Link } from 'react-router-dom'
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
import { handleGetHackerInfo } from '../../actions/index';


const Main = () => {
    return (
        <mian className="component-wrapper">
            <div class="container-fluid home">
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
                            <HackerInfo />
                            <section className="row">
                                <div className="col-md-4 p-3 rounded">
                                    <div className="card bg-black">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 text-right"><h4>الأرباح</h4></div>
                                                <div className="col-md-6 text-left"><h4><AiFillDollarCircle size={'2rem'} /></h4></div>
                                            </div>
                                            <p className="hacker-stat-numbers mt-2 mb-1">13123</p>
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
                                            <p className="hacker-stat-numbers mt-2 mb-1">13123</p>
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
                                            <p className="hacker-stat-numbers mt-2 mb-1">13123</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <HackerReports />
                            <HackerBadges />
                            <HackerSkills />
                            <HackerWASP />
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
            </div>
        </mian>
    )
}

export default Main;