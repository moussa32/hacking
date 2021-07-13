import React, { useState, useEffect } from 'react';
import { getHackerWeaknessReports } from '../../../../../api/HackerReportsWeakApi';
import { getNewTokens } from '../../../../../api/RefreshTokenApi';
import { handleGetUserToken } from '../../../actions/index';
import { GiBrokenShield } from 'react-icons/gi';

const StandrdVulnerabilities = () => {
  const [reports, setReports] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isLoadded, setIsLoadded] = useState(false);
  const token = handleGetUserToken('accessToken');
  const reFreshtoken = handleGetUserToken('refreshToken');


  const weaknessRequest = getHackerWeaknessReports(token);
  useEffect(() => {
    weaknessRequest.then((res) => {
      setReports(res.data);
      //Is there any data return from the server hide default icon
      if (res.data.length !== 0) {
        setIsData(true);
      }
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
          <h2 className="section-title text-right">{isData ? (<GiBrokenShield className="section-icon" size={"2rem"} />) : ('')}نقاط الضعف</h2>
          {isData ? (<div className="section-container bg-second m-4 rounded vulcontainer">
            <table className="table text-white table-responsive">
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
          </div>) : (<>
            <GiBrokenShield size={"3rem"} />
            <p className="mt-4 lead mb-0">لا يوجد اي تقارير مسلمة</p>
          </>)}
        </div>
      </div>) : ''}
    </>
  );
}

export default StandrdVulnerabilities;