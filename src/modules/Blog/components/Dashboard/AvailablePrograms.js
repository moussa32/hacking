import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCogs } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiTask } from "react-icons/bi";
import Spinner from "../../../../shared/components/Spinner";
import './AvailablePrograms.css';
import { getAvailablePrograms } from '../../../../api/AvailableProgramsApi';
import { getNewTokens } from '../../../../api/RefreshTokenApi';
import { handleGetUserToken } from '../../actions/index';
import CustomSelect from '../../../../shared/components/FormFields/CustomSelect';


const AvailablePrograms = () => {
  const [programs, setPrograms] = useState(null);
  const [loadded, setLoadded] = useState(false);

  const token = handleGetUserToken('accessToken');
  const reFreshtoken = handleGetUserToken('refreshToken');
  const allAvailablePrograms = getAvailablePrograms(token);

  const convertDate = (ISODate) => {
    let newDate = new Date(`${ISODate}`);
    let convertedDate = `${newDate.getFullYear()}/${(newDate.getMonth() + 1)}`;
    return convertedDate;
  }

  useEffect(() => {
    allAvailablePrograms
      .then(item => {
        setPrograms(item.data);
        setLoadded(true);
      }).catch(function (error) {
        if (error.response.status === 401) {
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
                <div id="programs-slider" className="carousel slide my-4" data-ride="carousel">
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
                <div className="row justify-content-around">
                  <div className="col-md-4 pr-2">
                    <CustomSelect
                      id="program-type"
                      options={[
                        { value: 'مفتوحة', label: 'مفتوحة' },
                        { value: 'مغلقة', label: 'مغلقة' },
                        { value: 'مدفوعة', label: 'مدفوعة' }]}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="نوع البرنامج"
                      classNames="form-group w-100 categories-filters"
                    />
                  </div>
                  <div className="col-md-4 pl-2">
                    <CustomSelect
                      id="product-type"
                      options={[
                        { value: 'Any', label: 'Any' },
                        { value: 'CIDR', label: 'CIDR' },
                        { value: 'Domain', label: 'Domain' },
                        { value: 'IOS: App Store', label: 'IOS: App Store' },
                        { value: 'IOS: Testflight', label: 'IOS: Testflight' }]}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="نوع المنتج / الأصل"
                      classNames="form-group w-100 categories-filters"
                    />
                  </div>
                </div>
                <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
                  <div className="container px-4">
                    {programs.length === 0 ? (<><p className="mt-4 lead mb-0">ليس لديك اي شعارات بعد</p></>) : (
                      <div className="row section-container">{
                        programs.map(program => {
                          return (
                            <div key={program.id} className="col-xl-4 col-md-6 p-3 rounded">
                              <a href={program.url} className="card bg-second border-0 text-white text-decoration-none">
                                <img className="card-img-top program-logo p-0 d-block mx-auto" src={`${program.logo}`} alt={program.name} />
                                <div className="card-body py-2">
                                  <h3 className="card-title badge-name my-3 text-left text-capitalize">{program.name}</h3>
                                </div>
                                <div class="card-body d-flex flex-row-reverse justify-content-between program-text">
                                  <p className="text-lightgreen card-text">${program.min_bounty} - ${program.max_bounty}</p>
                                  <p className="card-text">{convertDate(program.launch_date)}</p>
                                </div>
                              </a>
                            </div>
                          )
                        })
                      }
                      </div>)}
                  </div>
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