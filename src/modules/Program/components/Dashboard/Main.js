import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import {HiOutlineClipboardList} from "react-icons/hi";
import {BiTask} from "react-icons/bi";
import Spinner from "../../../../shared/components/Spinner";
import LeftSideBar from "../layout/LeftSideBar";
import Footer from "../layout/Footer";
import ProgramInfo from "./ProgramComponents/ProgramInfo";
import ProgramStat from "./ProgramComponents/ProgramStat";
import ProgramReports from "./ProgramComponents/ProgramReports";
import ProgramActivity from "./ProgramComponents/ProgramActivity";
import ProgramWeakPoints from "./ProgramComponents/ProgramWeakPoints";
import ProgramWASP from "./ProgramComponents/ProgramWASP";
import ProgramAssets from "./ProgramComponents/ProgramAssets";
import {getProgram} from "../../../../api/ProgramAPI/ProgramInfo";
import {getNewTokens} from "../../../../api/RefreshTokenApi";
import ProgramReportsState from "./ProgramComponents/ProgramReportsState";

const Main = ({dispatch}) => {
  const [user, setUser] = useState({});
  const [isLoadded, setIsLoadded] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getProgram(localStorage.getItem("accessToken"))
      .then((res) => {
        let responseData = res.data;
        setUser(responseData);
        setIsLoadded(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        } else if (error.response.status === 403) {
          setStatus({type: "danger", message: "لا يمكنك الدخول إلى لوحة التحكم بدون تفعيل بريدك الإلكتروني ورقم الهاتف"});
        }
      });
  }, []);

  return (
    <>
      <div className="component-wrapper">
        <div className="container-fluid home">
          {status ? (
            <div className={`jumbotron jumbotron-fluid bg-${status.type}`}>
              <div className="container text-center">
                <h1>لم يتم تفعيل حسابك بالكامل</h1>
                <p className="mt-3 lead">معذرة لا يمكنك الدخول إلى لوحة التحكم بدون تفعيل بريدك الإلكتروني أو رقم الهاتف</p>
              </div>
            </div>
          ) : (
            <>
              {isLoadded ? (
                <div className="row">
                  <div className="col-1 bg-black">
                    <nav className="col dbsidebar right-dbsidebar">
                      <ul className="nav flex-column vertical-nav">
                        <li className="nav-item">
                          <Link to="/">
                            <HiOutlineClipboardList size="2rem" className="text-white" />
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/">
                            <BiTask size="2rem" className="text-white" />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="jumbotron jumbotron-fluid text-center col-10 py-4 bg-second dbmain rounded">
                    <div className="container-fluid">
                      <ProgramInfo userInfo={user} />
                      <ProgramStat balance={user.balance} payings={user.payings} />
                      <ProgramReports />
                      <ProgramWeakPoints />
                      <ProgramAssets />
                      <ProgramWASP />
                      <ProgramReportsState />
                      <ProgramActivity />
                    </div>
                  </div>
                  <LeftSideBar />
                </div>
              ) : (
                <Spinner></Spinner>
              )}
            </>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({program}) => {
  console.log(program);
  return {
    userInfo: program.programInfo,
    compaynName: program.programInfo.company_name,
    companyLogo: program.programInfo.logo,
  };
};

export default connect(mapStateToProps)(withRouter(Main));
