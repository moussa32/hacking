import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { getCompanyAssets, getCompanyAsset, deleteCompanyAssets, putCompanyAssets } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import CompanyAddNewAsset from "./CompanyAddNewAsset";
import { handleBadgeColor } from "../../../../../shared/utils/handleBadgeColor";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";

const CompanyAssetsTab = () => {
  const [assets, setAssets] = useState(null);
  const [trip, setTrip] = useState("assets");
  const [status, setStatus] = useState(null);
  const [modalStatus, setModalStatus] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [assetToEdit, setAssetToEdit] = useState({ type: "", url: "", description: "" });
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyAssets(token).then(res => {
      setAssets(res.data);
    });
  }, []);

  const handleDeleteAsset = assetId => {
    deleteCompanyAssets(token, assetId).then(res => console.log(res.data));
  };

  const handelGetAsset = assetId => {
    getCompanyAsset(token, assetId)
      .then(res => {
        setAssetToEdit(res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "جاري تحديث جلستك" });
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  };

  const handleEditAsset = (token, assetId, newInfo) => {
    console.log(assetToEdit);
    setIsLoadding(true);
    putCompanyAssets(token, assetId, newInfo)
      .then(res => {
        setIsLoadding(false);
        setModalStatus({ type: "success", message: "تم تحديث بيانات النطاق بنجاح" });
        console.log(res.data);
      })
      .catch(error => {
        setIsLoadding(false);
        if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  };

  const handleAddNewAsset = e => {
    e.preventDefault();
  };

  return (
    <>
      {trip === "assets" && (
        <div className="row">
          <div className="col-md-12 mx-auto mb-4 rounded add-domain-container">
            <button className="btn btn-lightgreen d-block mr-auto" onClick={() => setTrip("addAsset")}>
              اضافة نطاقات جديدة
            </button>
          </div>
          <div className="col-md-11 bg-second mx-auto mb-4 p-3 rounded">
            {assets && assets.length > 0 ? (
              assets.map(asset => {
                return (
                  <div key={asset.id} className="jumbotron jumbotron-fluid bg-black my-3 py-4 rounded">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9">
                          <h3 className="text-lightgreen">{asset.type}</h3>
                          <p className="lead">{asset.url}</p>
                          <div className="d-flex flex-row align-items-center">
                            <span className={`badge badge-${handleBadgeColor(asset.level)} inscope-assets-list`}></span>
                            <p className="mb-0 mr-3 lead">
                              {asset.level} - {asset.in_scope ? "داخل النطاق" : "خارج النطاق"}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-center flex-wrap domain-buttons">
                          <button
                            className="btn btn-lightgreen ml-4"
                            data-toggle="modal"
                            data-target="#editAssetModal"
                            onClick={() => {
                              setCurrentAsset(asset.id);
                              handelGetAsset(asset.id);
                            }}
                          >
                            <BiEditAlt />
                          </button>
                          <button className="btn btn-danger" data-toggle="modal" data-target="#deleteAssetModal" onClick={() => setCurrentAsset(asset.id)}>
                            <MdDelete />
                          </button>
                        </div>
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
            {isLoadding ? (
              <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}
            {status && (
              <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
                {status.message}
              </div>
            )}
          </div>
        </div>
      )}

      {trip === "addAsset" && <CompanyAddNewAsset />}

      <div className="modal fade" id="deleteAssetModal" tabIndex="-1" aria-labelledby="deleteAssetModal" aria-hidden="true">
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
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => handleEditAsset(currentAsset)}>
                الغاء
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteAsset(currentAsset)}>
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="editAssetModal" tabIndex="-1" aria-labelledby="editAssetModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title text-dark" id="editAssetModal">
                تعديل النطاق
              </h3>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <select className="form-control py-0" value={assetToEdit.type.charAt(0).toUpperCase() + assetToEdit.type.slice(1)} id="exampleFormControlSelect1" onChange={e => setAssetToEdit({ ...assetToEdit, type: e.target.value.toLowerCase() })} required>
                  <option value="">نوع المنتج / الأصل</option>
                  <option value="Windows">Windows</option>
                  <option value="IOS">IOS</option>
                  <option value="Android">Android</option>
                  <option value="dm">dm</option>
                </select>
                <div className="form-group rounded">
                  <label htmlFor="assetType" className="col-form-label text-dark">
                    الرابط:
                  </label>
                  <input type="url" defaultValue={assetToEdit.url} className="form-control" placeholder="ex:https://google.com" onChange={e => setAssetToEdit({ ...assetToEdit, url: e.target.value })} required />
                </div>
                <div className="form-group rounded">
                  <label htmlFor="assetType" className="col-form-label text-dark">
                    الوصف :
                  </label>
                  <textarea className="form-control p-3" defaultValue={assetToEdit.description} rows="6" name="description" onChange={e => setAssetToEdit({ ...assetToEdit, description: e.target.value })} required></textarea>
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
              <button type="button" className="btn btn-warning" onClick={() => handleEditAsset(token, assetToEdit.id, assetToEdit)}>
                تعديل
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyAssetsTab;
