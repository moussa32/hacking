import React from 'react';
import { Link } from 'react-router-dom'
import { HackerImage } from "../../../../assets/index";
import { VscLocation } from "react-icons/vsc";
import { FaCogs, FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiTask, BiCrown } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdStars } from "react-icons/md";




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
                            <div class="jumbotron jumbotron-fluid bg-black rounded">
                                <div class="container">
                                    <div className="row">
                                        <div className="col-md-7 mx-auto">
                                            <img src={HackerImage} class="rounded-circle hacker-image rounded mx-auto d-block mb-3" alt="..." />
                                            <h2 className="hackerName text-white my-4">هاكر</h2>
                                            <p className="hackerLocation text-white lead"><VscLocation /> مصر</p>
                                            <p className="hackerBio text-white lead">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                            <div className="row mx-auto">
                                                <div className="col-md-12">
                                                    <a href="#" className="text-lightgreen hacker-social-icons"><FaTwitterSquare size='2.5rem' /></a>
                                                    <a href="#" className="text-lightgreen hacker-social-icons"><FaLinkedin size='2.5rem' /></a>
                                                    <a href="#" className="text-lightgreen hacker-social-icons"><FaFacebookSquare size='2.5rem' /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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