import React, { useEffect, useState, useMemo } from "react";
import { FaDollarSign } from "react-icons/fa";
import Spinner from "../shared/components/Spinner";
import Swiper from "react-id-swiper";
import { getAvailableProgramAds, getAvailablePrograms, getAvailableProgramsByPram } from "../api/AvailableProgramsApi";
import { getNewTokens } from "../api/RefreshTokenApi";
import CustomSelect from "../shared/components/FormFields/CustomSelect";
import Footer from "./Program/components/layout/Footer";
import Navbar from "../modules/Blog/components/layout/Navbar";
import HackerNavbar from "./Blog/components/Dashboard/layout/HackerNavbar";
import ProgramNavbar from "./Program/components/layout/Navbar";
import "swiper/css/swiper.css";
import "./AvailablePrograms.css";

const AvailablePrograms = props => {
  const [initPrograms, setInitPrograms] = useState(null);
  const [programAds, setProgramAds] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [programType, setProgramType] = useState(null);
  const [loadded, setLoadded] = useState(false);

  const token = localStorage.getItem("accessToken");
  const reFreshtoken = localStorage.getItem("refreshToken");
  const allAvailablePrograms = getAvailablePrograms(token);

  const convertDate = ISODate => {
    let newDate = new Date(`${ISODate}`);
    let convertedDate = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDay()}`;
    return convertedDate;
  };

  const onProductType = type => {
    if (type) {
      setProgramType({ ...programType, type: type.value.toLowerCase() });
    } else {
      setProgramType({ ...programType, type: "" });
    }
  };

  const onProductStatus = statue => {
    if (statue) {
      setProgramType({ ...programType, status: statue.value.toLowerCase() });
    } else {
      setProgramType({ ...programType, status: "" });
    }
  };

  const handleFetch = option => {
    getAvailableProgramsByPram(option)
      .then(res => {
        setPrograms(() => res.data);
      })
      .catch(error => {
        if (error.response.status === 400) {
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
    getAvailableProgramAds().then(res => {
      setProgramAds(res.data);
    });
    allAvailablePrograms.then(item => {
      setPrograms(item.data);
      setInitPrograms(item.data);
      setLoadded(true);
      console.log(item.data);
    });
  }, []);

  const params = {
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  const choseNavbar = () => {
    if (localStorage.getItem("type") === "hacker") {
      return <HackerNavbar currentPathname={props.location.pathname} />;
    } else if (localStorage.getItem("type") === "program") {
      return <ProgramNavbar currentPathname={props.location.pathname} />;
    }
  };

  return (
    <>
      {token ? choseNavbar() : <Navbar currentPathname={props.location.pathname} />}
      <div className="component-wrapper h-100">
        {loadded ? (
          <div className="container-fluid home available-margin">
            <div className="container bg-second p-4">
              <div className="jumbotron jumbotron-fluid bg-black rounded py-1">
                <div className="container p-4">
                  <Swiper {...params}>
                    {programAds && programAds.length > 0
                      ? programAds.map(ad => {
                          return (
                            <div key={ad.id}>
                              <img src={ad.image} className="d-block w-100" alt={ad.title} />
                              <div className="carousel-caption d-none d-md-block">
                                <h4>{ad.title}</h4>
                                <p className="lead">{ad.description.length > 150 ? ad.description.substring(0, 150) + " ......." : ad.description}</p>
                                {ad.ad_link && (
                                  <a href={ad.ad_link} target="_blank" className="btn btn-lightgreen">
                                    قراءة المزيد
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </Swiper>
                </div>
              </div>
              <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
                <div className="container px-4">
                  <>
                    <div className="row">
                      <div className="col-md-4">
                        <CustomSelect
                          id="program-type"
                          options={[
                            { value: "opened", label: "مفتوح" },
                            { value: "closed", label: "مغلق" },
                            { value: "eligable", label: "مدفوع" },
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
                            { value: "Windows", label: "Windows" },
                            { value: "IOS", label: "IOS" },
                            { value: "Android", label: "Android" },
                            { value: "dm", label: "Domain Name" },
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
                        {programs.map(program => {
                          return (
                            <div key={program.id} className="col-xl-4 col-md-4 p-3 rounded">
                              <a href={`/program/${program.id}/${program.company_name}`} className="card bg-second border-0 program-card text-white text-decoration-none">
                                <div className="card-header program-card-header">
                                  <img className="card-img-top program-logo p-0 d-block mx-auto" src={`${program.logo}`} alt={program.name} />
                                </div>
                                <div className="card-body d-flex flex-row-reverse justify-content-between align-items-center py-0">
                                  <h3 className="card-title badge-name my-3 text-left text-capitalize">{program.company_name}</h3>
                                  {program.status === "opened" ? (
                                    <span>
                                      <FaDollarSign size={"1.2rem"} color={"#009cde"} />
                                    </span>
                                  ) : null}
                                </div>
                                <div className="card-body py-2 d-flex flex-row-reverse justify-content-between program-text">
                                  <p className="text-lightgreen card-text">
                                    $
                                    {Math.min.apply(
                                      Math,
                                      program.bounty_bars.map(function (o) {
                                        return o.amount;
                                      })
                                    )}{" "}
                                    - $
                                    {Math.max.apply(
                                      Math,
                                      program.bounty_bars.map(function (o) {
                                        return o.amount;
                                      })
                                    )}
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
        ) : (
          <Spinner></Spinner>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AvailablePrograms;
