import React, {useEffect, useState} from "react";
import axios from "axios";
import {dvApiUrl, dvbaseUrl} from "../../../api/Constants";
import {Link} from "react-router-dom";
import {HiOutlineClipboardList} from "react-icons/hi";
import {BiTask} from "react-icons/bi";
import LeftSideBar from "./layout/LeftSideBar";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Spinner from "../../../shared/components/Spinner";

function ProgramHome(props) {
  const [programInfo, setProgramInfo] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  useEffect(() => {
    axios.get(`${dvApiUrl}/programs/9/`).then((res) => {
      console.log(res.data);
      setProgramInfo(res.data);
      setIsLoadding(true);
    });
  }, []);

  const handleBountyBarsStatue = (statue) => {
    if (statue === "ضروري") {
      return (
        <>
          <span className="badge badge-danger program-bountry-bars"></span> {statue}
        </>
      );
    } else if (statue === "عالي") {
      return (
        <>
          <span className="badge badge-success program-bountry-bars"></span> {statue}
        </>
      );
    } else if (statue === "متوسط") {
      return (
        <>
          <span className="badge badge-warning program-bountry-bars"></span> {statue}
        </>
      );
    } else if (statue === "منخفض") {
      return (
        <>
          <span className="badge badge-info program-bountry-bars"></span> {statue}
        </>
      );
    }
  };

  return (
    <>
      {isLoadding ? (
        <div className="jumbotron jumbotron-fluid text-center col-12 py-4 bg-second rounded">
          <div className="container-fluid">
            <div className="row p-4 bg-black">
              <div className="col-md-3">
                <img className="program-logo" src={`${dvbaseUrl}/${programInfo.logo}`} alt={programInfo.company_name} />
                <a className="d-block text-center mt-3" href={programInfo.url} target="_blank">
                  {programInfo.url}
                </a>
              </div>
              <div className="col-md-9">
                <div className="d-flex justify-content-between">
                  <div className="program-info text-right px-3">
                    <h3 className="program-title">{programInfo.company_name}</h3>
                    <p className="program-summery text-muted small text-break">{programInfo.summery}</p>
                  </div>
                  <button className="btn btn-lightgreen align-self-center">تسليم التقرير</button>
                </div>
                <div class="jumbotron bg-second p-3 mt-3">
                  <div className="row">
                    <div className="col-md-4 program-stat">
                      <h5 className="text-lightgreen mb-3">معدل</h5>
                      <p className="mb-2">100$ - 500$</p>
                    </div>
                    <div className="col-md-4 program-stat">
                      <h5 className="text-lightgreen mb-3">النطاق</h5>
                      <p className="mb-2">{programInfo.assets_count}</p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="text-lightgreen mb-3">عدد التقارير</h5>
                      <p className="mb-2">{programInfo.all_reports_count}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-4 bg-black mt-2">
              <div className="col-md-12">
                <ul className="nav nav-tabs custom-nav-tabs d-flex justify-content-between pb-4" id="programTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a className="nav-link program-nav-link text-lightgreen active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                      الرئيسية
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link program-nav-link text-lightgreen" id="rewards-tab" data-toggle="tab" href="#rewards" role="tab" aria-controls="rewards" aria-selected="false">
                      المكافأت
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link program-nav-link text-lightgreen" id="programActivity-tab" data-toggle="tab" href="#programActivity" role="tab" aria-controls="programActivity" aria-selected="false">
                      النشاط
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link program-nav-link text-lightgreen" id="ads-tab" data-toggle="tab" href="#ads" role="tab" aria-controls="ads" aria-selected="false">
                      الاعلانات
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link program-nav-link text-lightgreen" id="thanksBoard-tab" data-toggle="tab" href="#thanksBoard" role="tab" aria-controls="thanksBoard" aria-selected="false">
                      لوحة الشكر
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a className="nav-link program-nav-link text-lightgreen" id="admins-tab" data-toggle="tab" href="#admins" role="tab" aria-controls="admins" aria-selected="false">
                      المشرفون
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row p-4 bg-black mt-2">
              <div className="col-md-9">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="jumbotron bg-second jumbotron-fluid">الرئيسية</div>
                    <div className="jumbotron jumbotron-fluid bg-second py-4">
                      <div className="container">
                        <h3 className="text-lightgreen text-right my-4">النطاقات</h3>
                        <div className="jumbotron bg-black mb-0">
                          <div className="row flex-row-reverse">
                            <div className="col-md-3">
                              <h3 className="text-left text-lightgreen">Domain</h3>
                            </div>
                            <div className="col-md-9 text-left">
                              <a className="" href="https://www.paypal.com/eg/home">
                                https://www.paypal.com/eg/home
                              </a>
                              <p className="lead text-muted">But I must explain to you how all this mistaken</p>
                              <p className="lead text-muted">But I must explain to you how all this mistaken</p>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lightgreen text-right my-4">خارج النطاق</h3>
                        <div className="jumbotron bg-black">
                          <div className="row flex-row-reverse">
                            <div className="col-md-3">
                              <h3 className="text-left text-lightgreen">Domain</h3>
                            </div>
                            <div className="col-md-9 text-left">
                              <a className="" href="https://www.paypal.com/eg/home">
                                https://www.paypal.com/eg/home
                              </a>
                              <p className="lead text-muted">But I must explain to you how all this mistaken</p>
                              <p className="lead text-muted">But I must explain to you how all this mistaken</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="rewards" role="tabpanel" aria-labelledby="rewards-tab">
                    <div className="row">
                      {programInfo.bounty_bars.map((bar) => {
                        return (
                          <div className="col-md-6 py-3">
                            <div className="card bg-second">
                              <div className="card-body">
                                <h5 className="card-title">{handleBountyBarsStatue(bar.level)}</h5>
                                <p className="program-bountry-bars-value mt-4 font-weight-normal">{bar.amount}$</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="programActivity" role="tabpanel" aria-labelledby="programActivity-tab">
                    النشاط
                  </div>
                  <div className="tab-pane fade" id="ads" role="tabpanel" aria-labelledby="ads-tab">
                    الإعلانات
                  </div>
                  <div className="tab-pane fade" id="thanksBoard" role="tabpanel" aria-labelledby="thanksBoard-tab">
                    <div className="row pb-4">
                      <div className="col-md-12 mb-3">
                        <div className="card bg-second border-0">
                          <div className="card-body d-flex align-items-center py-3">
                            <span className="badge badge-success rounded-circle p-2 text-white d-block">1</span>
                            <div className="media mr-4">
                              <img src="https://i.pinimg.com/474x/b1/19/4f/b1194f6671a741f9b2d52c550324c630.jpg" className="d-block align-self-start top-hackers-image ml-4" alt="..." />
                              <div className="media-body align-self-center">
                                <h5 className="mt-0">دينا</h5>
                              </div>
                            </div>
                            <p className="align-self-center mr-auto pl-3 my-0">900 نقطة</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card bg-second border-0">
                          <div className="card-body d-flex align-items-center py-3">
                            <span className="badge badge-success rounded-circle p-2 text-white d-block">2</span>
                            <div className="media mr-4">
                              <img src="https://littlelioness.net/wp-content/uploads/2021/05/Hacker.jpg" className="d-block align-self-start top-hackers-image ml-4" alt="..." />
                              <div className="media-body align-self-center">
                                <h5 className="mt-0">دينا</h5>
                              </div>
                            </div>
                            <p className="align-self-center mr-auto pl-3 my-0">900 نقطة</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card bg-second border-0">
                          <div className="card-body d-flex align-items-center py-3">
                            <span className="badge badge-success rounded-circle p-2 text-white d-block">3</span>
                            <div className="media mr-4">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw5_pau5zA6WulJM-FOoA0JvHBkKaY2QYGPQ&usqp=CAU" className="d-block align-self-start top-hackers-image ml-4" alt="..." />
                              <div className="media-body align-self-center">
                                <h5 className="mt-0">دينا</h5>
                              </div>
                            </div>
                            <p className="align-self-center mr-auto pl-3 my-0">900 نقطة</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="admins" role="tabpanel" aria-labelledby="admins-tab">
                    <div className="row pb-4">
                      <div className="col-md-12 mb-3">
                        <div className="card bg-second border-0">
                          <div className="card-body d-flex align-items-center py-3">
                            <span className="badge badge-success rounded-circle p-2 text-white d-block">1</span>
                            <div className="media mr-4">
                              <img src="https://i.pinimg.com/474x/b1/19/4f/b1194f6671a741f9b2d52c550324c630.jpg" className="d-block align-self-start top-hackers-image ml-4" alt="..." />
                              <div className="media-body align-self-center">
                                <h5 className="mt-0">دينا</h5>
                              </div>
                            </div>
                            <button className="btn btn-lightgreen text-left mr-auto" data-toggle="modal" data-target="#contactProgramAdmin">
                              تواصل
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card bg-second border-0">
                          <div className="card-body d-flex align-items-center py-3">
                            <span className="badge badge-success rounded-circle p-2 text-white d-block">2</span>
                            <div className="media mr-4">
                              <img src="https://littlelioness.net/wp-content/uploads/2021/05/Hacker.jpg" className="d-block align-self-start top-hackers-image ml-4" alt="..." />
                              <div className="media-body align-self-center">
                                <h5 className="mt-0">دينا</h5>
                              </div>
                            </div>
                            <button className="btn btn-lightgreen text-left mr-auto" data-toggle="modal" data-target="#contactProgramAdmin">
                              تواصل
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card bg-second border-0">
                          <div className="card-body d-flex align-items-center py-3">
                            <span className="badge badge-success rounded-circle p-2 text-white d-block">3</span>
                            <div className="media mr-4">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw5_pau5zA6WulJM-FOoA0JvHBkKaY2QYGPQ&usqp=CAU" className="d-block align-self-start top-hackers-image ml-4" alt="..." />
                              <div className="media-body align-self-center">
                                <h5 className="mt-0">دينا</h5>
                              </div>
                            </div>
                            <button className="btn btn-lightgreen text-left mr-auto" data-toggle="modal" data-target="#contactProgramAdmin">
                              تواصل
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="contactProgramAdmin" tabindex="-1" aria-labelledby="contactProgramAdmin" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content text-dark">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              رسالة جديدة إلى @omer
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="form-group">
                                <label htmlFor="recipient-name" className="text-right">
                                  المرسل إليه:
                                </label>
                                <input type="text" className="form-control" id="recipient-name" />
                              </div>
                              <div className="form-group">
                                <label htmlFor="message-text" className="text-right">
                                  نص الرسالة:
                                </label>
                                <textarea className="form-control" id="message-text"></textarea>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                              إغلاق
                            </button>
                            <button type="button" className="btn btn-lightgreen py-2">
                              إرسال رسالة
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="jumbotron bg-second p-3 text-right mb-3">
                  <h5 className="text-lightgreen mb-4">إحصائيات البرنامج</h5>
                  <div className="stat-section">
                    <h6 className="small muted">إجمالي المدفوع</h6>
                    <p className="p-2 bg-black rounded text-center stat-value">${programInfo.payings}</p>
                  </div>
                  <div className="stat-section">
                    <h6 className="small muted">أكبر مكافأة</h6>
                    <p className="p-2 bg-black rounded text-center stat-value">$500</p>
                  </div>
                  <div className="stat-section">
                    <h6 className="small muted">عدد التقارير المسلمة</h6>
                    <p className="p-2 bg-black rounded text-center stat-value">100</p>
                  </div>
                  <div className="stat-section">
                    <h6 className="small muted">عدد التقارير المحلوله</h6>
                    <p className="p-2 bg-black rounded text-center stat-value">{programInfo.resolved_reports_count}</p>
                  </div>
                  <div className="stat-section">
                    <h6 className="small muted">اشخاص تم شكرهم</h6>
                    <p className="p-2 bg-black rounded text-center stat-value">{programInfo.thanked_hackers_count}</p>
                  </div>
                </div>
                <div className="jumbotron bg-second p-3 text-right">
                  <h5 className="text-lightgreen mb-4">أشخاص</h5>
                  <div className="top-hackers-section">
                    <div className="media">
                      <img src="https://i.pinimg.com/474x/b1/19/4f/b1194f6671a741f9b2d52c550324c630.jpg" className="align-self-start top-hackers-image ml-3" alt="..." />
                      <div className="media-body">
                        <h5 className="mt-0">دينا</h5>
                        <p className="mt-2 text-muted">154884</p>
                      </div>
                    </div>
                    <div className="media my-2">
                      <img src="https://littlelioness.net/wp-content/uploads/2021/05/Hacker.jpg" className="align-self-start top-hackers-image ml-3" alt="..." />
                      <div className="media-body">
                        <h5 className="mt-0">عمرو</h5>
                        <p className="mt-2 text-muted">134834</p>
                      </div>
                    </div>
                    <div className="media">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw5_pau5zA6WulJM-FOoA0JvHBkKaY2QYGPQ&usqp=CAU" className="align-self-start top-hackers-image ml-3" alt="..." />
                      <div className="media-body">
                        <h5 className="mt-0">أحمد</h5>
                        <p className="mt-2 text-muted">134994</p>
                      </div>
                    </div>
                  </div>
                  <a className="text-lightgreen text-center my-3 d-block" data-toggle="tab" href="#admins" role="tab" aria-controls="admins" aria-selected="false">
                    كل الاشخاص
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Spinner></Spinner>
      )}
    </>
  );
}

export default ProgramHome;
