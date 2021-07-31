import React, {useEffect, useState} from "react";
import {getCompanyAds, deleteCompanyAds} from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import {MdDelete} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";

function CompanyAdsTab() {
  const [ads, setAds] = useState(null);
  const [currentAdToDelete, setCurrentAdToDelete] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyAds(token).then((res) => {
      setAds(res.data);
      console.log(res.data);
    });
  }, []);

  const handleDeleteAd = (adID) => {
    deleteCompanyAds(token, adID).then((res) => console.log(res.data));
  };

  return (
    <div className="container pb-1">
      <div className="mx-auto mb-4 rounded">
        <button className="btn btn-lightgreen d-block mr-auto" disabled>
          اضافة نطاقات جديدة
        </button>
      </div>
      <div className="jumbotron bg-second py-4 px-3 text-right">
        {ads && ads.length > 0 ? (
          ads.map((ad) => {
            return (
              <div className="container bg-black my-3">
                <div className="row">
                  <div className="col-md-9 py-3">
                    <h3 className="text-lightgreen">{ad.title}</h3>
                    <p className="lead">{ad.body}</p>
                    <p className="mb-0 mr-3 lead"></p>
                    <p class="lead bg-second p-2 rounded d-flex justify-content-between">2021-07-27 15:53:29</p>
                  </div>
                  <div className="col-md-3 d-flex align-items-center flex-wrap domain-buttons">
                    <button className="btn btn-lightgreen ml-4" disabled>
                      <BiEditAlt />
                    </button>
                    <button className="btn btn-danger" data-toggle="modal" data-target="#deleteAdModal" onChange={() => setCurrentAdToDelete(ad.id)}>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="alert alert-warning text-center mb-0 w-100" role="alert">
            لا توجد اي بيانات
          </div>
        )}
      </div>
      <div className="modal fade" id="deleteAdModal" tabIndex="-1" aria-labelledby="deleteAdModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title text-danger" id="deleteAssetModal">
                تحذير!
              </h3>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="text-dark lead my-4">انت على وشك حذف أحد النطاقات هل تريد ذلك حقًأ؟</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                الغاء
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteAd(currentAdToDelete)}>
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyAdsTab;
