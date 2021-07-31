import React, {useState, useEffect} from "react";
import {MdDelete} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";
import {getCompanyAssets, deleteCompanyAssets} from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import {handleBadgeColor} from "../../../../../shared/utils/handleBadgeColor";

const CompanyAssetsTab = () => {
  const [assets, setAssets] = useState(null);
  const [currentAssetToDelete, setCurrentAssetToDelete] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getCompanyAssets(token).then((res) => {
      console.log(res.data);
      setAssets(res.data);
    });
  }, []);

  const handleDeleteAsset = (assetId) => {
    deleteCompanyAssets(token, assetId).then((res) => console.log(res.data));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 mx-auto mb-4 rounded add-domain-container">
          <button className="btn btn-lightgreen d-block mr-auto" disabled>
            اضافة نطاقات جديدة
          </button>
        </div>
        <div className="col-md-11 bg-second mx-auto mb-4 p-3 rounded">
          {assets && assets.length > 0 ? (
            assets.map((asset) => {
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
                        <button className="btn btn-lightgreen ml-4" disabled>
                          <BiEditAlt />
                        </button>
                        <button className="btn btn-danger" data-toggle="modal" data-target="#deleteAssetModal" onClick={() => setCurrentAssetToDelete(asset.id)}>
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
        </div>
      </div>
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
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                الغاء
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteAsset(currentAssetToDelete)}>
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyAssetsTab;
