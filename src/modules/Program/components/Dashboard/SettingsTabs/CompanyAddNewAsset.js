import React, { useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { connect } from "react-redux";
import { postCompanyAssets } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import "./CompanyAddNewAsset.css";

function CompanyAddNewAsset({ owner }) {
  const [newAsset, setNewAsset] = useState({
    owner,
    paid: true,
    type: "",
    in_scope: "",
    url: "",
    description: "",
  });
  const [status, setStatus] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleSubmitNewAsset = e => {
    e.preventDefault();
    setIsLoadding(true);

    postCompanyAssets(token, newAsset)
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم إضافة النطاق بناجح" });
      })
      .catch(error => {
        if (error.response.status === 400) {
          console.log(error.response);
        } else if (error.response.status === 401) {
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-11 mx-auto">
            <form className="mb-4" onSubmit={handleSubmitNewAsset}>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1" className="text-lightgreen">
                  النوع
                </label>
                <select className="form-control border-0 custom-input" id="exampleFormControlSelect1" onChange={e => setNewAsset({ ...newAsset, type: e.target.value.toLowerCase() })} required>
                  <option value="">نوع المنتج / الأصل</option>
                  <option value="Windows">Windows</option>
                  <option value="IOS">IOS</option>
                  <option value="Android">Android</option>
                  <option value="dm">dm</option>
                </select>
              </div>
              <div className="form-group rounded">
                <label htmlFor="assetType" className="col-form-label text-lightgreen">
                  الدفع:
                </label>
                <div id="ck-button">
                  <label>
                    <input type="radio" value="1" name="paid" onChange={e => setNewAsset({ ...newAsset, paid: true })} required />
                    <span>
                      <AiFillDollarCircle className="text-lightgreen" /> مدفوع
                    </span>
                  </label>
                </div>
                <div id="ck-button">
                  <label>
                    <input type="radio" value="2" name="paid" onChange={e => setNewAsset({ ...newAsset, paid: false })} required />
                    <span>
                      <AiFillDollarCircle className="text-danger" /> غير مدفوع
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-group rounded">
                <label htmlFor="assetType" className="col-form-label text-lightgreen">
                  الرابط:
                </label>
                <input type="url" className="form-control border-0 custom-input" placeholder="ex:https://google.com" onChange={e => setNewAsset({ ...newAsset, url: e.target.value })} required />
              </div>
              <div className="form-group rounded">
                <label htmlFor="assetType" className="col-form-label text-lightgreen">
                  قابل للتسليم:
                </label>
                <div id="ck-button">
                  <label>
                    <input type="radio" value="1" name="in_scope" onChange={e => setNewAsset({ ...newAsset, in_scope: false })} required />
                    <span>لا</span>
                  </label>
                </div>
                <div id="ck-button">
                  <label>
                    <input type="radio" value="2" name="in_scope" onChange={e => setNewAsset({ ...newAsset, in_scope: true })} />
                    <span>نعم</span>
                  </label>
                </div>
              </div>
              <div className="form-group rounded">
                <label htmlFor="assetType" className="col-form-label text-lightgreen">
                  الوصف :
                </label>
                <textarea className="form-control p-3 custom-input border-0" id="summary" rows="6" name="description" onChange={e => setNewAsset({ ...newAsset, description: e.target.value })} required></textarea>
              </div>
              <button type="submit" className="btn btn-lightgreen w-50 mx-auto d-block">
                اضافة
              </button>
            </form>
            {isLoadding ? (
              <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}
            {status ? (
              <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
                {status.message}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ program }) => {
  return {
    owner: program.programInfo.id,
  };
};

export default connect(mapStateToProps)(CompanyAddNewAsset);
