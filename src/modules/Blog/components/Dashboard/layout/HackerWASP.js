import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { handleGetUserToken, handleSetUserToken } from '../../../actions/index';
import { getHackerWASP } from '../../../../../api/WaspApi';
import { getNewTokens } from '../../../../../api/RefreshTokenApi';


const HackerSkills = () => {
  const [wasp, setWasp] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: '#4f0f5726',
      borderColor: '#52105a',
      borderWidth: 2
    }]
  });
  const [isDataDone, setIsDataDone] = useState(false);

  useEffect(() => {
    const token = handleGetUserToken('accessToken');
    const reFreshtoken = handleGetUserToken('refreshToken');
    const owaspRequest = getHackerWASP(token);

    owaspRequest.then((res) => {
      const reportsData = res.data;
      const pushWASPLabels = wasp.labels;
      const pushWASPData = wasp.datasets[0].data;

      reportsData.forEach(element => {
        pushWASPLabels.push(element.name);
        pushWASPData.push(element.reports_count);
      });

      setIsDataDone(true);
    }).catch((erorr) => {
      if (erorr.response.status == 401) {
        getNewTokens(reFreshtoken);
      }
    })
  }, []);

  const options = {
    responsive: true,
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        stacked: true,
      }]
    }
  }
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">WASP 10</h2>
          <div className="section-container mt-4">
            {isDataDone ? <Bar data={wasp} options={options} /> : ''}
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerSkills;