import React from "react";
// import { FaArrowCircleLeft } from "react-icons/fa";

const ProgramSidebar = ({ sidebarInfo }) => {
  return (
    <>
      <div className="jumbotron bg-second p-3 text-right mb-3">
        <h5 className="text-lightgreen mb-4">إحصائيات البرنامج</h5>
        <div className="stat-section">
          <h4 className="small muted lead">إجمالي المدفوعات</h4>
          <p className="p-2 bg-black rounded text-center stat-value lead">${sidebarInfo.payings}</p>
        </div>
        <div className="stat-section">
          <h4 className="small muted lead">المكافأة الأعلى قيمة</h4>
          <p className="p-2 bg-black rounded text-center stat-value lead">
            $
            {sidebarInfo.bounty_bars && sidebarInfo.bounty_bars.length > 0
              ? Math.max.apply(
                  Math,
                  sidebarInfo.bounty_bars.map(function (o) {
                    return o.amount;
                  })
                )
              : "0"}
          </p>
        </div>
        <div className="stat-section">
          <h4 className="small muted lead">عدد التقارير المسلمة</h4>
          <p className="p-2 bg-black rounded text-center stat-value lead">{sidebarInfo.all_reports_count}</p>
        </div>
        <div className="stat-section">
          <h4 className="small muted lead">عدد التقارير المنتهية</h4>
          <p className="p-2 bg-black rounded text-center stat-value lead">{sidebarInfo.resolved_reports_count}</p>
        </div>
        <div className="stat-section">
          <h4 className="small muted lead">خبراء تم مكافأتهم</h4>
          <p className="p-2 bg-black rounded text-center stat-value lead">{sidebarInfo.thanked_hackers_count}</p>
        </div>
      </div>
      <div className="jumbotron bg-second p-3 text-right">
        <p className="text-center p-0">لم يتوفر اي بيانات بعد</p>
        {/* <h5 className="text-lightgreen mb-4">خبراء</h5>
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
            كل الخبراء <FaArrowCircleLeft className="text-secondary" />
          </a>
        </div> */}
      </div>
    </>
  );
};

export default ProgramSidebar;
