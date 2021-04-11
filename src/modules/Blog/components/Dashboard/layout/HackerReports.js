import React, { useState } from 'react';
import { Bar, Doughnut, Chart } from 'react-chartjs-2';
import { fake_Doughnut_data, fake_sDoughnut_data } from '../../../../../shared/constants/fakedata';
import axios from 'axios';
import { handleGetUserToken } from '../../../actions/index';
import { getHackerReports } from '../../../../../api/HackerReportsApi';

const HackerReports = () => {
  const [isDataDone, setIsDataDone] = useState(false);
  const [reportChartData, setReportChartData] = useState({
    labels: ['ضروري', 'عالي', 'متوسط', 'منخفض'],
    datasets: [{
      data: [50, 90, 60, 20, 100, 0],
      backgroundColor: '#0f572226',
      borderColor: '#08cc96',
      borderWidth: 2
    }]
  });

  const token = handleGetUserToken('accessToken');
  const reFreshtoken = handleGetUserToken('refreshToken');
  const hackerReportsRequest = getHackerReports(token);

  console.log(getHackerReports);

  const data = () => {
    Chart.defaults.global.legend.display = false;
    return reportChartData;
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
  }

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
        <h2 className="text-right mr-4 mb-4">التقارير</h2>
        <div className="container">
          <div className="row px-2">
            <div className="col-md-5 bg-second p-3">
              <Bar data={reportChartData} options={options} />
            </div>
            <div className="col-md-7">
              <h4 className="w-100 pb-3">مجموع التقارير {fake_sDoughnut_data.datasets[0].data[0] + fake_sDoughnut_data.datasets[0].data[1]}</h4>
              <div className="row">
                <div className="col-md-6">
                  <Doughnut data={fake_Doughnut_data} options={options} />
                  <small className="d-block mt-3">{fake_sDoughnut_data.datasets[0].data[0]} تقرير مغلق</small>
                </div>
                <div className="col-md-6">
                  <Doughnut data={fake_sDoughnut_data} options={options} />
                  <small className="d-block mt-3">{fake_sDoughnut_data.datasets[0].data[1]} تقرير مفتوح</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerReports;