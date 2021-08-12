import React, { useEffect, useState, useRef } from "react";
import CompanyAddNewAd from "./CompanyAddNewAd";
import { getCompanyAds, getCompanyAd, deleteCompanyAds, putCompanyAd } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { BsFillClockFill } from "react-icons/bs";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";

function CompanyAdsTab() {
  const [ads, setAds] = useState(null);
  const [currentAdToDelete, setCurrentAdToDelete] = useState(null);
  const [currentAdToEdit, setCurrentAdToEdit] = useState({ title: "", body: "" });
  const [currentAd, setCurrentAd] = useState(null);
  const [modalStatus, setModalStatus] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const [trip, setTrip] = useState("ADS");

  const token = localStorage.getItem("accessToken");
  const deleteButtonRef = useRef();

  useEffect(() => {
    getCompanyAds(token)
      .then(res => {
        setAds(res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  }, []);

  useEffect(() => {
    const deleteButton = deleteButtonRef.current;
    deleteButton.setAttribute("data-dismiss", "modal");
  }, []);

  const handelGetAd = adId => {
    getCompanyAd(token, adId)
      .then(res => {
        setCurrentAdToEdit(res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  };

  const handleEditAd = (token, adId, newInfo) => {
    setIsLoadding(true);
    putCompanyAd(token, adId, newInfo)
      .then(res => {
        setIsLoadding(false);
        setModalStatus({ type: "success", message: "تم تحديث بيانات الإعلان" });
      })
      .catch(error => {
        setIsLoadding(false);
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  };

  const handleDeleteAd = adID => {
    deleteCompanyAds(token, adID).then(res => {
      setAds(ads.filter(ad => ad.id !== adID));
    });
  };

  const handleCloseTab = () => {
    const deleteButton = deleteButtonRef.current;
    setTimeout(() => {
      deleteButton.click();
    }, 500);
  };

  return (
    <div className="container pb-1">
      {trip === "ADS" && (
        <>
          <div className="mx-auto mb-4 rounded">
            <button className="btn btn-lightgreen d-block mr-auto" onClick={() => setTrip("addAD")}>
              إضافة إعلانات جديدة
            </button>
          </div>
          <div className="jumbotron bg-second py-4 px-3 text-right">
            {ads && ads.length > 0 ? (
              ads.map(ad => {
                return (
                  <div key={ad.id} className="container bg-black my-3">
                    <div className="row">
                      <div className="col-md-9 py-3">
                        <h3 className="text-lightgreen">{ad.title}</h3>
                        <h5 className="pb-3 rounded d-flex align-items-center">
                          <BsFillClockFill className="text-lightgreen ml-2" />
                          {new Date(ad.published).toISOString().substring(0, 10)}
                        </h5>
                        <p className="lead">{ad.body}</p>
                        <p className="mb-0 mr-3 lead"></p>
                      </div>
                      <div className="col-md-3 d-flex align-items-center flex-wrap domain-buttons">
                        <button
                          className="btn btn-lightgreen ml-4"
                          data-toggle="modal"
                          data-target="#editAdModal"
                          onClick={() => {
                            setCurrentAd(ad.id);
                            handelGetAd(ad.id);
                          }}
                        >
                          <BiEditAlt />
                        </button>
                        <button
                          className="btn btn-danger"
                          data-toggle="modal"
                          data-target="#deleteAdModal"
                          onClick={e => {
                            setCurrentAdToDelete(ad.id);
                          }}
                        >
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
                  <button type="button" className="btn btn-secondary" ref={deleteButtonRef} data-dismiss="modal">
                    الغاء
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      handleCloseTab();
                      handleDeleteAd(currentAdToDelete);
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="editAdModal" tabIndex="-1" aria-labelledby="editAssetModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title text-dark" id="editAdModal">
                    تعديل الإعلانات
                  </h3>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group rounded">
                      <label htmlFor="assetType" className="col-form-label text-dark">
                        العنوان:
                      </label>
                      <input type="text" value={currentAdToEdit.title} className="form-control" onChange={e => setCurrentAdToEdit({ ...currentAdToEdit, title: e.target.value })} placeholder="#" required />
                    </div>
                    <div className="form-group rounded">
                      <label htmlFor="assetType" className="col-form-label text-dark">
                        الوصف :
                      </label>
                      <textarea value={currentAdToEdit.body} onChange={e => setCurrentAdToEdit({ ...currentAdToEdit, body: e.target.value })} className="form-control p-3" required></textarea>
                    </div>
                    <label className="col-form-label text-lightgreen">الحالة:</label>
                    <div className="form-check text-dark py-1">
                      <input style={{ marginRight: " -1.25rem" }} value={currentAdToEdit.is_active} className="form-check-input" type="radio" name="is_active" value="true" onChange={e => setCurrentAdToEdit({ ...currentAdToEdit, is_active: true })} required />
                      <label className="form-check-label">مفعل</label>
                    </div>
                    <div className="form-check text-dark py-1">
                      <input style={{ marginRight: " -1.25rem" }} value={currentAdToEdit.is_active} className="form-check-input" type="radio" name="is_active" value="false" onChange={e => setCurrentAdToEdit({ ...currentAdToEdit, is_active: false })} required />
                      <label className="form-check-label">غير مفعل</label>
                    </div>
                  </form>
                  {isLoadding ? (
                    <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : null}
                  {modalStatus && (
                    <div className={`alert alert-${modalStatus.type} mt-4 text-center`} role="alert">
                      {modalStatus.message}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    الغاء
                  </button>
                  <button type="button" className="btn btn-warning" onClick={() => handleEditAd(token, currentAd, currentAdToEdit)}>
                    تعديل
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {trip === "addAD" && <CompanyAddNewAd />}
    </div>
  );
}

export default CompanyAdsTab;
