import React from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaHandshake } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { DiGrails, DiYeoman } from "react-icons/di";

const Services = () => {
  return (
    <div className="col-md-12 mb-4">
      <div className="text-center">
        <h1 className=" services-heading">Hacking Technology</h1>
        <div className="row">
          <div className="col-md-6">
            <p className="lead">قم بتأمين تطبيقاتك من خلال الاختبار المستمر تحت مظلة Hacking Technology البيضاء. تشجع Hacking Technology الشركات والمؤسسات من كافة القطاعات على تأمين نشاطاتها بعيداً عن تدخلات القبعات السوداء التي قد تضر بالأصول.</p>
          </div>
          <div className="col-md-6">
            <a className="btn btn-lightgreen btn-join-us" href="/signup">
              انضم إلينا <FaHandshake className={"mr-2"} />
            </a>
          </div>
        </div>
        <h2 className="services-title">ما يميزنا</h2>
        <div className="row justify-content-around">
          <div className="col-md-5 mt-4">
            <div className="services-card">
              <SiGnuprivacyguard className="text-lightgreen mb-3" size={"4.5rem"} />
              <h3>برنامج مكافأة الأخطاء الأكثر موثوقية</h3>
              <p className="mt-4">امنح مؤسستك صلاحية الوصول إلى مجتمع القبعات البيضاء الأكثر ثقة واعتماداً في العالم العربي. يُحيِد مجتمع القبعات البيضاء أنواع كثيرة من المخاطر الالكترونية التي تطال المؤسسات في جميع القطاعات. من خلال برامج مكافآت الأخطاء للشركات.</p>
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <div className="services-card">
              <DiGrails className="text-lightgreen mb-3" size={"4.5rem"} />
              <h3>مرونة و موثوقية الاختبارات</h3>
              <p className="mt-4">برامج مكافآت الأخطاء المرنة تعطي الخبراء حزمة واسعة من الاختيارات للمفاضلة بينها، والتي يمكن التفاعل معها بمبدأ الأمان والمرونة.</p>
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <div className="services-card">
              <DiYeoman className="text-lightgreen mb-3" size={"4.5rem"} />
              <h3>السرية وعدم الإفصاح.</h3>
              <p className="mt-4">تمنحك البرامج العامة وصولاً كاملاً إلى مجتمع القبعات البيضاء لدينا. كما تجمع البرامج المحددة زمنياً بين الاختبار المنظم والقرصنة غير المنظمة.</p>
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <div className="services-card">
              <FiInbox className="text-lightgreen mb-3" size={"4.5rem"} />
              <h3>تقارير مباشرة</h3>
              <p className="mt-4">راقب حالة برنامج المكافأة الخاص بك في الوقت الفعلي من خلال الاحصائيات و الرسومات البيانية التي تعكس نشاطك عبر دورة حياة الثغرات الأمنية. يساعدك هذا في تحديد أولويات المخاطر على نطاق واسع ، وإدارة الموارد بشكلٍ فعال ، والاستفادة من بيانات البرنامج لقياس التقدم.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
