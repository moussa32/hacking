import React from "react";
import { dvbaseUrl } from "../../../../api/Constants";

const ProgramHeader = ({ headerInfo }) => {
  return (
    <div className="row p-4 bg-black">
      <div className="col-md-3">
        <img className="program-logo" src={`${dvbaseUrl}/${headerInfo.logo}`} alt={headerInfo.company_name} />
        <a className="d-block text-center mt-3 text-break" href={headerInfo.url} target="_blank">
          {headerInfo.url}
        </a>
      </div>
      <div className="col-md-9">
        <div className="d-flex justify-content-between">
          <div className="program-info text-right px-3">
            <h3 className="program-title">{headerInfo.company_name}</h3>
            <p className="program-summery text-muted small text-break lead">{headerInfo.summery}</p>
          </div>
          <button className="btn btn-lightgreen align-self-center px-4 disabled">تسليم التقرير</button>
        </div>
        <div className="jumbotron bg-second p-3 mt-3">
          <div className="row">
            <div className="col-md-4 program-stat">
              <h5 className="text-lightgreen mb-3">معدل</h5>
              <p className="mb-2 lead">
                {headerInfo.bounty_bars && headerInfo.bounty_bars.length > 0
                  ? Math.max.apply(
                      Math,
                      headerInfo.bounty_bars.map(function (o) {
                        return o.amount;
                      })
                    )
                  : "0"}
                $ -
                {headerInfo.bounty_bars && headerInfo.bounty_bars.length
                  ? Math.min.apply(
                      Math,
                      headerInfo.bounty_bars.map(function (o) {
                        return o.amount;
                      })
                    )
                  : "0"}
                $
              </p>
            </div>
            <div className="col-md-4 program-stat">
              <h5 className="text-lightgreen mb-3">النطاق</h5>
              <p className="mb-2 lead">{headerInfo.assets_count}</p>
            </div>
            <div className="col-md-4">
              <h5 className="text-lightgreen mb-3">عدد التقارير</h5>
              <p className="mb-2 lead">{headerInfo.all_reports_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramHeader;
