import React from "react";
import {Link} from "react-router-dom";
import {HiOutlineClipboardList} from "react-icons/hi";
import {BiTask} from "react-icons/bi";
import LeftSideBar from "./layout/LeftSideBar";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function ProgramHome(props) {
  return (
    <>
      <div className="jumbotron jumbotron-fluid text-center col-12 py-4 bg-second rounded">
        <div className="container-fluid">
          <div className="row p-4 bg-black">
            <div className="col-md-3">
              <img className="program-logo" src="https://listimg.pinclipart.com/picdir/s/139-1397724_paypal-paypal-logo-transparent-background-small-clipart.png" alt="das" />
              <a className="d-block text-center mt-3" href="https://www.paypal.com" target="_blank">
                https://www.paypal.com
              </a>
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between">
                <div className="program-info text-right px-3">
                  <h3 className="program-title">Paypal</h3>
                  <p className="program-summery text-muted small text-break">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
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
                    <p className="mb-2">40</p>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-lightgreen mb-3">عدد التقارير</h5>
                    <p className="mb-2">100</p>
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
                      <h3 className="text-lightgreen text-right">النطاقات</h3>
                      <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="rewards" role="tabpanel" aria-labelledby="rewards-tab">
                  <div className="row">
                    <div className="col-md-6 py-3">
                      <div class="card bg-second">
                        <div class="card-body">
                          <h5 class="card-title">
                            <span className="badge badge-danger"></span> ضروري
                          </h5>
                          <p class="display-4 mt-4 font-weight-normal">1000$</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 py-3">
                      <div class="card bg-second">
                        <div class="card-body">
                          <h5 class="card-title">
                            <span className="badge badge-success"></span> مرتفع
                          </h5>
                          <p class="card-text mt-4 font-weight-normal">5000$</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 py-3">
                      <div class="card bg-second">
                        <div class="card-body">
                          <h5 class="card-title">
                            <span className="badge badge-danger"></span> ضروري
                          </h5>
                          <p class="card-text">1000$</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="programActivity" role="tabpanel" aria-labelledby="programActivity-tab">
                  النشاط
                </div>
                <div className="tab-pane fade" id="ads" role="tabpanel" aria-labelledby="ads-tab">
                  الإعلانات
                </div>
                <div className="tab-pane fade" id="thanksBoard" role="tabpanel" aria-labelledby="thanksBoard-tab">
                  لوحة الشكر
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
                  <p className="p-2 bg-black rounded text-center stat-value">$100000</p>
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
                  <p className="p-2 bg-black rounded text-center stat-value">40</p>
                </div>
                <div className="stat-section">
                  <h6 className="small muted">اشخاص تم شكرهم</h6>
                  <p className="p-2 bg-black rounded text-center stat-value">10</p>
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
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProgramHome;
