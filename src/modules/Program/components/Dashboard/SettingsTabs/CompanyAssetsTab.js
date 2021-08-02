import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { getCompanyAssets, getCompanyAsset, deleteCompanyAssets, putCompanyAssets } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import CompanyAddNewAsset from "./CompanyAddNewAsset";
import { handleBadgeColor } from "../../../../../shared/utils/handleBadgeColor";
import { handleLevelToNumber } from "../../../../../shared/utils/handleLevelName";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";

const CompanyAssetsTab = () => {
  const [assets, setAssets] = useState(null);
  const [step, setStep] = useState("assets");
  const [status, setStatus] = useState(null);
  const [modalStatus, setModalStatus] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const [currentAssetId, setCurrentAssetId] = useState(null);
  const [currentAsset, setCurrentAsset] = useState({ level: "", type: "", url: "", description: "", paid: "", in_scope: "" });
  const [assetToEdit, setAssetToEdit] = useState({});
  const token = localStorage.getItem("accessToken");
  const deleteButtonRef = useRef();

  useEffect(() => {
    getCompanyAssets(token).then(res => {
      setAssets(res.data);
    });
  }, []);

  useEffect(() => {
    const deleteButton = deleteButtonRef.current;
    deleteButton.setAttribute("data-dismiss", "modal");
  }, []);

  const handleDeleteAsset = assetId => {
    deleteCompanyAssets(token, assetId).then(res => {
      setAssets(assets.filter(asset => asset.id !== assetId));
    });
  };

  const handleTypeName = type => {
    if (type === "windows") {
      return "Windows";
    } else if (type === "android") {
      return "Android";
    } else if (type === "dm") {
      return "Domain Name";
    } else if (type === "ios") {
      return "IOS";
    }
  };

  const handelGetAsset = assetId => {
    getCompanyAsset(token, assetId)
      .then(res => {
        setCurrentAsset(res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "جاري تحديث جلستك" });
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  };

  const handleEditAsset = (token, assetId, newInfo) => {
    setIsLoadding(true);
    if (newInfo && Object.keys(newInfo).length === 0) {
      setIsLoadding(false);
      setModalStatus({ type: "danger", message: "لم يتم تغيير قيمة اي حقل بعد" });
    } else {
      putCompanyAssets(token, assetId, newInfo)
        .then(res => {
          console.log(res.data);
          setIsLoadding(false);
          setModalStatus({ type: "success", message: "تم تحديث بيانات النطاق بنجاح" });
        })
        .catch(error => {
          setIsLoadding(false);
          if (error.response.status === 401) {
            getNewTokens(localStorage.getItem("refreshToken"));
          } else if (error.response.status === 400) {
            setModalStatus({ type: "danger", message: "هناك خطأ في البيانات المرسلة" });
          }
        });
    }
  };

  const handleCloseTab = () => {
    const deleteButton = deleteButtonRef.current;
    setTimeout(() => {
      deleteButton.click();
    }, 500);
  };

  return (
    <>
      {step === "assets" && (
        <div className="row">
          <div className="col-md-12 mx-auto mb-4 rounded add-domain-container">
            <button className="btn btn-lightgreen d-block mr-auto" onClick={() => setStep("addAsset")}>
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
                          <h3 className="text-lightgreen">{handleTypeName(asset.type)}</h3>
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
                              setCurrentAssetId(asset.id);
                              handelGetAsset(asset.id);
                            }}
                          >
                            <BiEditAlt />
                          </button>
                          <button className="btn btn-danger" data-toggle="modal" data-target="#deleteAssetModal" onClick={() => setCurrentAssetId(asset.id)}>
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

      {step === "addAsset" && <CompanyAddNewAsset />}

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
              <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={deleteButtonRef} onClick={() => handleEditAsset(currentAssetId)}>
                الغاء
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  handleCloseTab();
                  handleDeleteAsset(currentAssetId);
                }}
              >
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
                <select
                  className="form-control py-0"
                  value={currentAsset.type.charAt(0).toUpperCase() + currentAsset.type.slice(1)}
                  onChange={e => {
                    setCurrentAsset({ ...currentAsset, type: e.target.value.toLowerCase() });
                    setAssetToEdit({ ...assetToEdit, type: e.target.value.toLowerCase() });
                  }}
                  required
                >
                  <option value="">نوع المنتج / الأصل</option>
                  <option value="Windows">Windows</option>
                  <option value="Ios">IOS</option>
                  <option value="Android">Android</option>
                  <option value="Dm">Domain Name</option>
                </select>
                <label className="col-form-label text-lightgreen">قابل للدفع:</label>
                <div className="form-check text-dark py-1">
                  <input style={{ marginRight: " -1.25rem" }} value={currentAsset.paid} defaultChecked={currentAsset.paid} className="form-check-input" type="radio" name="paid" onChange={e => setAssetToEdit({ ...assetToEdit, paid: true })} required />
                  <label className="form-check-label">مدفوع</label>
                </div>
                <div className="form-check text-dark py-1">
                  <input style={{ marginRight: " -1.25rem" }} value={currentAsset.paid} defaultChecked={currentAsset.paid} className="form-check-input" type="radio" name="paid" onChange={e => setAssetToEdit({ ...assetToEdit, paid: false })} />
                  <label className="form-check-label">غير مدفوع</label>
                </div>
                <div className="form-group rounded">
                  <label className="form-label text-lightgreen">المستوى</label>
                  <select
                    className="form-control py-0"
                    placeholder="المستويات"
                    value={handleLevelToNumber(currentAsset.level)}
                    onChange={e => {
                      setCurrentAsset({ ...currentAsset, level: e.target.value });
                      setAssetToEdit({ ...assetToEdit, level: parseInt(e.target.value) });
                    }}
                    required
                  >
                    <option value={2}>منخفض</option>
                    <option value={3}>متوسط</option>
                    <option value={4}>عالي</option>
                    <option value={5}>ضروري</option>
                  </select>
                </div>
                <div className="form-group rounded">
                  <label htmlFor="assetType" className="col-form-label text-dark">
                    الرابط:
                  </label>
                  <input type="url" defaultValue={currentAsset.url} className="form-control" placeholder="ex:https://google.com" onChange={e => setAssetToEdit({ ...assetToEdit, url: e.target.value })} required />
                </div>
                <label className="col-form-label text-lightgreen">قابل للتسليم:</label>
                <div className="form-check text-dark py-1">
                  <input style={{ marginRight: " -1.25rem" }} value={currentAsset.in_scope} defaultChecked={currentAsset.in_scope} className="form-check-input" type="radio" name="in_scope" onChange={e => setAssetToEdit({ ...assetToEdit, in_scope: false })} required />
                  <label className="form-check-label">لا</label>
                </div>
                <div className="form-check text-dark py-1">
                  <input style={{ marginRight: " -1.25rem" }} value={currentAsset.in_scope} defaultChecked={currentAsset.in_scope} className="form-check-input" type="radio" name="in_scope" onChange={e => setAssetToEdit({ ...assetToEdit, in_scope: true })} />
                  <label className="form-check-label">نعم</label>
                </div>
                <div className="form-group rounded">
                  <label htmlFor="assetType" className="col-form-label text-dark">
                    الوصف :
                  </label>
                  <textarea className="form-control p-3" defaultValue={currentAsset.description} rows="6" name="description" onChange={e => setAssetToEdit({ ...assetToEdit, description: e.target.value })} required></textarea>
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
              <button type="button" className="btn btn-warning" onClick={() => handleEditAsset(token, currentAsset.id, assetToEdit)}>
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
