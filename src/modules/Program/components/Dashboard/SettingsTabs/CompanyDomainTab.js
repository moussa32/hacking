import React, {useState} from "react";
import {MdDelete} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";

const CompanyDomainTab = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col-md-11 mx-auto mb-4 p-3 pl-0 rounded">
          <button className="btn btn-lightgreen d-block px-4 py-2 mr-auto">اضافة نطاقات جديدة</button>
        </div>
        <div className="col-md-11 bg-second mx-auto mb-4 p-3 rounded">
          <div className="jumbotron jumbotron-fluid bg-black my-3 py-4 rounded">
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <h3 className="text-lightgreen">Domain</h3>
                  <p className="lead">https://www.paypal.com/eg/home</p>
                  <div className="d-flex flex-row align-items-center">
                    <span className="badge badge-warning inscope-assets-list"></span>
                    <p className="mb-0 mr-3 lead">مستوى</p>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <button className="btn btn-lightgreen ml-4">
                    <BiEditAlt />
                  </button>
                  <button className="btn btn-danger">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="jumbotron jumbotron-fluid bg-black my-3 py-4 rounded">
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <h3 className="text-lightgreen">Domain</h3>
                  <p className="lead">https://www.paypal.com/eg/home</p>
                  <div className="d-flex flex-row align-items-center">
                    <span className="badge badge-warning inscope-assets-list"></span>
                    <p className="mb-0 mr-3 lead">مستوى</p>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <button className="btn btn-lightgreen ml-4">
                    <BiEditAlt />
                  </button>
                  <button className="btn btn-danger">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="jumbotron jumbotron-fluid bg-black my-3 py-4 rounded">
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <h3 className="text-lightgreen">Domain</h3>
                  <p className="lead">https://www.paypal.com/eg/home</p>
                  <div className="d-flex flex-row align-items-center">
                    <span className="badge badge-warning inscope-assets-list"></span>
                    <p className="mb-0 mr-3 lead">مستوى</p>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                  <button className="btn btn-lightgreen ml-4">
                    <BiEditAlt />
                  </button>
                  <button className="btn btn-danger">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDomainTab;
