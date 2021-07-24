import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import { withRouter, Link } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiTask } from "react-icons/bi";
import Spinner from "../../../../shared/components/Spinner";
import LeftSideBar from '../layout/LeftSideBar';
import Footer from '../layout/Footer';
import ProgramInfo from "./ProgramComponents/ProgramInfo";
import ProgramStat from "./ProgramComponents/ProgramStat";
import ProgramReports from "./ProgramComponents/ProgramReports";
import ProgramActivity from "./ProgramComponents/ProgramActivity";
import ProgramWeakPoints from "./ProgramComponents/ProgramWeakPoints";
import ProgramWASP from "./ProgramComponents/ProgramWASP";
import ProgramAssets from "./ProgramComponents/ProgramAssets";
import { getProgram } from "../../../../api/ProgramAPI/ProgramInfo";
import { handleGetProgram } from "../../actions";



const Main = ({ location }) => {
  const [user, setUser] = useState({})
  const [isLoadded, setIsLoadded] = useState(false);

  useEffect(() => {
    getProgram(localStorage.getItem("accessToken"))
      .then(res => {
        let responseData = res.data;
        console.log(responseData);
        setUser(responseData);
        setIsLoadded(true);
      })
  }, [])

  return (
    <>
      {isLoadded ? (
        <>
          <Navbar currentPathname={location.pathname} />
          <div className="component-wrapper">
            <div className="container-fluid home">
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
                    <ProgramInfo userInfo={user} />
                    <ProgramStat />
                    <ProgramReports />
                    <ProgramWeakPoints />
                    <ProgramAssets />
                    <ProgramWASP />
                    <ProgramActivity />
                  </div>
                </div>
                <LeftSideBar />
              </div>
              <Footer />
            </div >
          </div >
        </>
      ) : (<Spinner></Spinner>)}
    </>
  )
}

const mapStateToProps = ({ program }) => {
  return {
    userInfo: program.programInfo,
    compaynName: program.programInfo.company_name,
    companyLogo: program.programInfo.logo
  }
}

export default connect(mapStateToProps)(withRouter(Main));