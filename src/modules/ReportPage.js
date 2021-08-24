import React from "react";
import Navbar from "./Program/components/layout/Navbar";
import Footer from "./Program/components/layout/Footer";
import { BsFillLockFill } from "react-icons/bs";
import { handleBadgeColor } from "../shared/utils/handleBadgeColor";
import { AiFillFileUnknown } from "react-icons/ai";
import "./ReportPage.css";
import Timeline from "./Timeline";
import CustomSelect from "../shared/components/FormFields/CustomSelect";
import { ImUpload } from "react-icons/im";
import { FaCamera } from "react-icons/fa";

const ReportPage = ({ location }) => {
  return (
    <>
      <Navbar currentPathname={location.pathname} />
      <div className="component-wrapper available-margin">
        <div className="container-fluid home">
          <div className="bg-second">
            <div className="d-flex flex-wrap report-page-container bg-second">
              <div className="report-right bg-black p-4">
                <img
                  className="rounded-circle d-block mx-auto"
                  width={150}
                  src="https://olxegstatic-a.akamaihd.net/41da248-265-olxeg-stg/naspersclassifieds-regional/olxmena-atlas-web/static/img/logo@2x.png?t=210819111752"
                />
                <p className="lead text-center display-4">OLX</p>
                <p className="text-center">2 مارس 2002</p>
              </div>
              <div className="report-left bg-black p-4">
                <div className="report-left-info">
                  <p className="lead report-ltr">:Ref</p>
                  <p className="lead">الحالة :</p>
                  <p className="lead">نقاط الضعف :</p>
                  <p className="lead">الرؤية :</p>
                  <p className="lead">الخطورة :</p>
                  <p className="lead my-4">المشاركون :</p>
                  <p className="lead report-ltr">:10 WASP</p>
                </div>
                <div className="report-left-values">
                  <p className="lead">#57809</p>
                  <p className="lead">
                    مغلق <BsFillLockFill />
                  </p>
                  <p className="lead">Use the encryption key</p>
                  <p className="lead">خاص</p>
                  <p className="lead report-badge">
                    <span className={`badge badge-${handleBadgeColor("متوسط")}`}></span> متوسط
                  </p>
                  <p className="lead part-users">
                    <img src="https://media.istockphoto.com/photos/colored-powder-explosion-abstract-closeup-dust-on-backdrop-colorful-picture-id1072093690?k=6&m=1072093690&s=612x612&w=0&h=Eyk67XBt4sr3Bk1MubM6dHpvEVNICX4L7FumWhcTwuY=" />
                    <img src="https://media.istockphoto.com/photos/colored-powder-explosion-abstract-closeup-dust-on-backdrop-colorful-picture-id1072093690?k=6&m=1072093690&s=612x612&w=0&h=Eyk67XBt4sr3Bk1MubM6dHpvEVNICX4L7FumWhcTwuY=" />
                  </p>
                  <p className="lead report-badge">
                    Injection <span className={`badge badge-${handleBadgeColor("متوسط")}`}></span>
                  </p>
                </div>
                <div className="report-metainfo">
                  <div className="bg-second rounded mt-4 text-center">
                    <p className="mb-3 lead">النقاط</p>
                    <p className="text-lightgreen mb-0 lead">90</p>
                  </div>
                  <div className="bg-second rounded mt-4 text-center">
                    <p className="mb-3 lead">الرتبة</p>
                    <p className="text-lightgreen mb-0 lead">5</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="jumbotron bg-second report-content">
              <div className="bg-black p-4">
                <h2>المحتوى</h2>
                <div className="mx-auto my-3 text-center">
                  <AiFillFileUnknown size={"4.2rem"} />
                  <p className="lead mt-3">لا يوجد محتوى حاليا</p>
                </div>
              </div>
            </div>
            <div className="jumbotron bg-second report-content mt-0">
              <div className="bg-black p-4">
                <h2 className="mb-4">شريط الأحداث</h2>
                <div className="d-flex align-items-center">
                  <img
                    className="report-user-img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png"
                  />
                  <h4 className="mr-3 text-lightgreen">موسى</h4>
                </div>
                <div className="timeline">
                  <Timeline userName="موسى" commit="لقد قمت بتعديل بسيط" time="2 مارس 2020" />
                  <Timeline commit="لقد قمت بتعديل بسيط" time="2 مارس 2020" />
                  <Timeline
                    commit="لقد قمت بتعديل بسيط"
                    time="2 مارس 2020"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png"
                  />
                  <Timeline commit="لقد قمت بتعديل بسيط" time="2 مارس 2020" />
                </div>
                <div className="d-flex align-items-center">
                  <img
                    className="report-user-img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1200px-Google_Chrome_icon_%28September_2014%29.svg.png"
                  />
                  <CustomSelect
                    id="category"
                    options={[
                      { value: "close", lable: "اغلاق" },
                      { value: "open", lable: "فتح" },
                    ]}
                    isClearable={true}
                    isSearchable={true}
                    placeholder="إضافة تعليق"
                    classNames="form-group mr-2 mb-0 report-option categories-filters"
                  />
                </div>
                <div className="input-group my-3 position-relative">
                  <div className="input-group-append report-option-icon">
                    <ImUpload size={"1.7rem"} />
                    <FaCamera size={"1.7rem"} />
                  </div>
                  <textarea
                    placeholder="اسم المستخدم او البريد الالكتروني"
                    className="form-control custom-input report-description p-4"
                    rows="4"
                  />
                </div>
                <button className="btn btn-lightgreen mt-3 px-4 mr-auto d-block">اضافة</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportPage;
