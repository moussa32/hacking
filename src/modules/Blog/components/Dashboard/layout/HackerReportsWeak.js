import React, { useState, useEffect } from 'react';
import { getHackerWeaknessReports } from '../../../../../api/HackerReportsWeakApi';
import { getNewTokens } from '../../../../../api/RefreshTokenApi';
import { handleGetUserToken } from '../../../actions/index';

const StandrdVulnerabilities = () => {
  const [reports, setReports] = useState([]);
  const [isLoadded, setIsLoadded] = useState(false);
  const token = handleGetUserToken('accessToken');
  const reFreshtoken = handleGetUserToken('refreshToken');


  const weaknessRequest = getHackerWeaknessReports(token);
  useEffect(() => {
    weaknessRequest.then((res) => {
      setReports(res.data);

      setIsLoadded(true);
    }).catch((erorr) => {
      if (erorr.response.status == 401) {
        getNewTokens(reFreshtoken);
      }
    })
  }, [])

  return (
    <>
      {isLoadded ? (<div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">نقاط الضعف</h2>
          <div className="section-container bg-second m-4 rounded vulcontainer">
            <table class="table text-white">
              <thead>
                <tr className="vultr">
                  <th scope="col" class="border-top-0" className="vulname text-lightgreen text-right">نقطة الضعف</th>
                  <th scope="col" class="border-top-0 text-lightgreen">التقارير</th>
                </tr>
              </thead>
              <tbody className="vulbody">
                {
                  reports.map(report => {
                    return (
                      <tr>
                        <th scope="row" className="vulname text-right">{report.name}</th>
                        <td>{report.reports_count}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>) : ''}
    </>
  );
}

export default StandrdVulnerabilities;