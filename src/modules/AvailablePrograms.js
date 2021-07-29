import React, {useEffect, useState, useMemo} from "react";
import {FaDollarSign} from "react-icons/fa";
import Spinner from "../shared/components/Spinner";
import {getAvailablePrograms, getAvailableProgramsByPram} from "../api/AvailableProgramsApi";
import {getNewTokens} from "../api/RefreshTokenApi";
import CustomSelect from "../shared/components/FormFields/CustomSelect";
import "./AvailablePrograms.css";
import {TYPE_FLOW} from "interweave";

const AvailablePrograms = () => {
  const [initPrograms, setInitPrograms] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [programType, setProgramType] = useState(null);
  const [loadded, setLoadded] = useState(false);

  const token = localStorage.getItem("accessToken");
  const reFreshtoken = localStorage.getItem("refreshToken");
  const allAvailablePrograms = getAvailablePrograms(token);

  const convertDate = (ISODate) => {
    let newDate = new Date(`${ISODate}`);
    let convertedDate = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDay()}`;
    return convertedDate;
  };

  const onProductType = (type) => {
    if (type) {
      setProgramType({...programType, type: type.value.toLowerCase()});
    } else {
      setProgramType({...programType, type: ""});
    }
  };

  const onProductStatus = (statue) => {
    if (statue) {
      setProgramType({...programType, status: statue.value.toLowerCase()});
    } else {
      setProgramType({...programType, status: ""});
    }
  };

  const handleFetch = (option) => {
    getAvailableProgramsByPram(option)
      .then((res) => {
        setPrograms(() => res.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log(error.response.data.program_assets__type[0]);
        } else if (error.response.status === 401) {
          getNewTokens(reFreshtoken);
        }
      });
  };

  useMemo(() => {
    if (programType && programType.type && programType.status) {
      handleFetch(`program_assets__type=${programType.type}&status=${programType.status}`);
    } else if (programType && programType.type) {
      handleFetch(`program_assets__type=${programType.type}`);
    } else if (programType && programType.status) {
      handleFetch(`status=${programType.status}`);
    } else {
      setPrograms(initPrograms);
    }
  }, [programType]);

  useEffect(() => {
    allAvailablePrograms.then((item) => {
      setPrograms(item.data);
      setInitPrograms(item.data);
      setLoadded(true);
    });
  }, []);

  return (
    <mian className="component-wrapper h-100">
      {loadded ? (
        <div className="container-fluid home">
          <div className="row">
            <div className="jumbotron jumbotron-fluid text-center col-12 py-4 bg-second rounded">
              <div className="container-fluid">
                <div className="bg-black">
                  <div id="programs-slider" className="carousel slide my-4" data-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src="https://cdn1.techhq.com/wp-content/uploads/2020/10/shutterstock_1096975310-861x484.png" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                          <button type="button" className="btn btn-light px-4 py-2">
                            تعرف على المزيد
                          </button>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="https://q-mind.co/wp-content/uploads/2019/04/1.png" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                          <button type="button" className="btn btn-light px-4 py-2">
                            تعرف على المزيد
                          </button>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="https://connect.geant.org/wp-content/uploads/2020/02/SWITCH-Hack-The-Hacker-Banner-TNC20.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                          <button type="button" className="btn btn-light px-4 py-2">
                            تعرف على المزيد
                          </button>
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
                  <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
                    <div className="container px-4">
                      <>
                        <div className="row">
                          <div className="col-md-4">
                            <CustomSelect
                              id="program-type"
                              options={[
                                {value: "opened", label: "مفتوح"},
                                {value: "closed", label: "مغلق"},
                                {value: "eligable", label: "مدفوع"},
                              ]}
                              isClearable={true}
                              isSearchable={true}
                              onChange={onProductStatus}
                              placeholder="نوع البرنامج"
                              classNames="form-group w-100 categories-filters"
                            />
                          </div>
                          <div className="col-md-4 mr-auto">
                            <CustomSelect
                              id="product-type"
                              options={[
                                {value: "Windows", label: "Windows"},
                                {value: "IOS", label: "IOS"},
                                {value: "Android", label: "Android"},
                                {value: "dm", label: "Domain Name"},
                              ]}
                              isClearable={true}
                              isSearchable={true}
                              onChange={onProductType}
                              placeholder="نوع المنتج / الأصل"
                              classNames="form-group w-100 categories-filters"
                            />
                          </div>
                        </div>
                        {!programs || programs.length === 0 ? (
                          <>
                            <div className="alert alert-warning text-center w-100" role="alert">
                              لا يوجد أي برامج متاحة
                            </div>
                          </>
                        ) : (
                          <div className="row section-container px-0">
                            {programs.map((program) => {
                              return (
                                <div key={program.id} className="col-xl-4 col-md-4 p-3 rounded">
                                  <a href={`/program/${program.id}/${program.company_name}`} className="card bg-second border-0 program-card text-white text-decoration-none">
                                    <div className="card-header program-card-header">
                                      <img className="card-img-top program-logo p-0 d-block mx-auto" src={`${program.logo}`} alt={program.name} />
                                    </div>
                                    <div className="card-body d-flex flex-row-reverse justify-content-between align-items-center py-0">
                                      <h3 className="card-title badge-name my-3 text-left text-capitalize">{program.company_name}</h3>
                                      {program.status == "opened" ? (
                                        <span>
                                          <FaDollarSign size={"1.2rem"} color={"#009cde"} />
                                        </span>
                                      ) : null}
                                    </div>
                                    <div className="card-body py-2 d-flex flex-row-reverse justify-content-between program-text">
                                      <p className="text-lightgreen card-text">
                                        ${program.payings} - ${program.balance}
                                      </p>
                                      <p className="card-text">{convertDate(program.launch_date)}</p>
                                    </div>
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner></Spinner>
      )}
    </mian>
  );
};

export default AvailablePrograms;
