import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCogs } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiTask } from "react-icons/bi";
import Spinner from "../../../../shared/components/Spinner";
import './AvailablePrograms.css';


const AvailablePrograms = () => {
  const [loadded, setLoadded] = useState(true);

  return (
    <mian className="component-wrapper">
      {loadded ? (<div class="container-fluid home">
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
              <div className="bg-black">
                <div id="programs-slider" className="carousel slide mt-4" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="https://cdn1.techhq.com/wp-content/uploads/2020/10/shutterstock_1096975310-861x484.png" class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block">
                        <button type="button" className="btn btn-light px-4 py-2">تعرف على المزيد</button>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="https://q-mind.co/wp-content/uploads/2019/04/1.png" class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block">
                        <button type="button" className="btn btn-light px-4 py-2">تعرف على المزيد</button>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="https://connect.geant.org/wp-content/uploads/2020/02/SWITCH-Hack-The-Hacker-Banner-TNC20.jpg" class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block">
                        <button type="button" className="btn btn-light px-4 py-2">تعرف على المزيد</button>
                      </div>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#programs-slider" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#programs-slider" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 bg-black">
            <nav className="col dbsidebar left-dbsidebar">
              <ul className="nav flex-column vertical-nav left-vertical-nav">
                <li className="nav-item settings-button rounded bg-second">
                  <Link to='/'><FaCogs size='2rem' className="text-lightgreen" /></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >) : (<Spinner></Spinner>)}

    </mian >
  );
}

export default AvailablePrograms;