import React, { useEffect, useState } from "react";
import axios from "axios";
import { dvApiUrl, dvbaseUrl } from "../../../api/Constants";
import Footer from "./layout/Footer";
import Spinner from "../../../shared/components/Spinner";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaArrowCircleLeft, FaTelegramPlane } from "react-icons/fa";
import { handleBadgeColor } from "../../../shared/utils/handleBadgeColor";

function ProgramHome(props) {
  const { match } = props;
  const [programInfo, setProgramInfo] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  useEffect(() => {
    if (match.params.id) {
      axios.get(`${dvApiUrl}/programs/${match.params.id}/`).then(res => {
        setProgramInfo(res.data);
        setIsLoadding(true);
      });
    }
  }, [match.params.id]);

  const handleNoData = () => {
    return (
      <div className="alert alert-warning text-center w-100" role="alert">
        لا توجد اي بيانات
      </div>
    );
  };

  return (
    <>
      {isLoadding ? (
        <div className="jumbotron jumbotron-fluid text-center pb-4 bg-second rounded">
          <div className="container-fluid">
            <div className="row p-4 bg-black">
              <div className="col-md-3">
                <img className="program-logo" src={`${dvbaseUrl}/${programInfo.logo}`} alt={programInfo.company_name} />
                <a className="d-block text-center mt-3 text-break" href={programInfo.url} target="_blank">
                  {programInfo.url}
                </a>
              </div>
              <div className="col-md-9">
                <div className="d-flex justify-content-between">
                  <div className="program-info text-right px-3">
                    <h3 className="program-title">{programInfo.company_name}</h3>
                    <p className="program-summery text-muted small text-break lead">{programInfo.summery}</p>
                  </div>
                  <button className="btn btn-lightgreen align-self-center px-4 disabled">تسليم التقرير</button>
                </div>
                <div className="jumbotron bg-second p-3 mt-3">
                  <div className="row">
                    <div className="col-md-4 program-stat">
                      <h5 className="text-lightgreen mb-3">معدل</h5>
                      <p className="mb-2 lead">
                        {programInfo.bounty_bars && programInfo.bounty_bars.length > 0
                          ? Math.max.apply(
                              Math,
                              programInfo.bounty_bars.map(function (o) {
                                return o.amount;
                              })
                            )
                          : "0"}
                        $ -
                        {programInfo.bounty_bars && programInfo.bounty_bars.length
                          ? Math.min.apply(
                              Math,
                              programInfo.bounty_bars.map(function (o) {
                                return o.amount;
                              })
                            )
                          : "0"}
                        $
                      </p>
                    </div>
                    <div className="col-md-4 program-stat">
                      <h5 className="text-lightgreen mb-3">النطاق</h5>
                      <p className="mb-2 lead">{programInfo.assets_count}</p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="text-lightgreen mb-3">عدد التقارير</h5>
                      <p className="mb-2 lead">{programInfo.all_reports_count}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-4 bg-black mt-2">
              <div className="col-md-12">
                <ul className="nav nav-tabs custom-nav-tabs px-0 d-flex flex-column flex-md-row justify-content-between pb-4" id="programTabs" role="tablist">
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
                        {programInfo.in_scope_assets.length > 0
                          ? programInfo.in_scope_assets.map(asset => {
                              return (
                                <div key={asset.id} className="jumbotron bg-black pb-4 program-home-tab-section">
                                  <div className="row flex-row-reverse">
                                    <div className="col-md-3">
                                      <h3 className="text-left text-lightgreen">{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}</h3>
                                    </div>
                                    <div className="col-md-9 text-left">
                                      <a className="" href={asset.url}>
                                        {asset.url}
                                      </a>
                                      <p className="lead text-muted">{asset.description}</p>
                                    </div>
                                    <div className="col-md-6 align-items-center; justify-content-between bg-second py-2 px-4 rounded d-flex flex-row-reverse ml-auto">
                                      <div className="d-flex flex-row align-items-center">
                                        <span className={`badge badge-${handleBadgeColor(asset.level)} inscope-assets-list`}></span>
                                        <p className="mb-0 mr-3">مستوى</p>
                                      </div>
                                      <div className="inscope-assets-info">
                                        <span className="inscope-assets-type rounded p-2">
                                          <AiOutlineDollarCircle size={"1.7rem"} className={asset.paid ? "text-lightgreen" : "text-danger"} />
                                        </span>
                                        {asset.paid ? "مدفوع" : "غير مدفوع"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : handleNoData()}

                        {programInfo.out_scope_assets && programInfo.out_scope_assets.length > 0 ? (
                          <>
                            <h3 className="text-lightgreen text-right my-4">خارج النطاق</h3>
                            {programInfo.out_scope_assets.map(() => {
                              return (
                                <div className="jumbotron bg-black program-home-tab-section">
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
                              );
                            })}
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="rewards" role="tabpanel" aria-labelledby="rewards-tab">
                    <div className="row">
                      {programInfo.bounty_bars && programInfo.bounty_bars.length > 0
                        ? programInfo.bounty_bars.map(bar => {
                            return (
                              <div className="col-md-6 py-3">
                                <div className="card bg-second">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      <span className={`badge badge-${handleBadgeColor(bar.level)} program-bountry-bars`}></span> {bar.level}
                                    </h5>
                                    <p className="program-bountry-bars-value mt-4 font-weight-normal">{bar.amount}$</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : handleNoData()}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="programActivity" role="tabpanel" aria-labelledby="programActivity-tab">
                    <div className="row pb-4">
                      <div className="col-md-12 mb-3">
                        <div className="card border border-secondary bg-transparent">
                          <div className="card-body program-activity-log-item py-3">
                            <span className="rounded-circle p-2 text-white d-block">1</span>
                            <img src="https://bugbounty.pythonanywhere.com//media/programs/logos/Bug.png" className="d-block top-hackers-image mx-4" alt="..." />
                            <h5 className="program-activity-log-info lead">عبر دينا إلى paypal</h5>
                            <p className="align-self-center lead">منذ 3 أيام</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card border border-secondary bg-transparent">
                          <div className="card-body program-activity-log-item py-3">
                            <span className="rounded-circle p-2 text-white d-block">2</span>
                            <img src="https://bugbounty.pythonanywhere.com//media/programs/logos/Bug.png" className="d-block top-hackers-image mx-4" alt="..." />
                            <h5 className="program-activity-log-info lead">عبر دينا إلى paypal</h5>
                            <p className="align-self-center lead">منذ 20 أيام</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card border border-secondary bg-transparent">
                          <div className="card-body program-activity-log-item py-3">
                            <span className="rounded-circle p-2 text-white d-block">3</span>
                            <img src="https://bugbounty.pythonanywhere.com//media/programs/logos/Bug.png" className="d-block top-hackers-image mx-4" alt="..." />
                            <h5 className="program-activity-log-info lead">عبر دينا إلى paypal</h5>
                            <p className="align-self-center lead">منذ 9 أيام</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="ads" role="tabpanel" aria-labelledby="ads-tab">
                    {programInfo.announcements && programInfo.announcements.length > 0
                      ? programInfo.announcements.map(announcement => {
                          return (
                            <div key={announcement.id} className="jumbotron bg-second py-4 program-home-tab-section text-right">
                              <div className="row">
                                <div className="col-md-6 ml-auto">
                                  <p className="lead bg-black p-2 rounded d-flex justify-content-between">{`${new Date(announcement.created).toISOString().slice(0, 19).replace("T", " ")}`}</p>
                                </div>
                                <div className="col-md-12 ml-auto">
                                  <h3 className="text-lightgreen">{announcement.title}</h3>
                                  {announcement.body}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : handleNoData()}
                  </div>
                  <div className="tab-pane fade" id="thanksBoard" role="tabpanel" aria-labelledby="thanksBoard-tab">
                    <div className="row pb-4">
                      {programInfo.thanked_hackers.length > 0
                        ? programInfo.thanked_hackers.map(hacker => {
                            return (
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
                            );
                          })
                        : handleNoData()}
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
                            <button className="btn btn-lightgreen text-left px-4 mr-auto" data-toggle="modal" data-target="#contactProgramAdmin">
                              <FaTelegramPlane size={"1.2rem"} />
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
                            <button className="btn btn-lightgreen text-left px-4 mr-auto" data-toggle="modal" data-target="#contactProgramAdmin">
                              <FaTelegramPlane size={"1.2rem"} />
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
                            <button className="btn btn-lightgreen text-left px-4 mr-auto" data-toggle="modal" data-target="#contactProgramAdmin">
                              <FaTelegramPlane size={"1.2rem"} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="contactProgramAdmin" tabIndex="-1" aria-labelledby="contactProgramAdmin" aria-hidden="true">
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
                    <h4 className="small muted lead">إجمالي المدفوع</h4>
                    <p className="p-2 bg-black rounded text-center stat-value lead">${programInfo.payings}</p>
                  </div>
                  <div className="stat-section">
                    <h4 className="small muted lead">أكبر مكافأة</h4>
                    <p className="p-2 bg-black rounded text-center stat-value lead">
                      $
                      {programInfo.bounty_bars && programInfo.bounty_bars.length > 0
                        ? Math.max.apply(
                            Math,
                            programInfo.bounty_bars.map(function (o) {
                              return o.amount;
                            })
                          )
                        : "0"}
                    </p>
                  </div>
                  <div className="stat-section">
                    <h4 className="small muted lead">عدد التقارير المسلمة</h4>
                    <p className="p-2 bg-black rounded text-center stat-value lead">100</p>
                  </div>
                  <div className="stat-section">
                    <h4 className="small muted lead">عدد التقارير المحلوله</h4>
                    <p className="p-2 bg-black rounded text-center stat-value lead">{programInfo.resolved_reports_count}</p>
                  </div>
                  <div className="stat-section">
                    <h4 className="small muted lead">اشخاص تم شكرهم</h4>
                    <p className="p-2 bg-black rounded text-center stat-value lead">{programInfo.thanked_hackers_count}</p>
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
                  <div className="nav-item" role="presentation">
                    <a className="nav-link text-center my-3 program-nav-link text-lightgreen" data-toggle="tab" href="#admins" role="tab" aria-controls="admins" aria-selected="false">
                      كل الاشخاص <FaArrowCircleLeft className="text-secondary" />
                    </a>
                  </div>
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
