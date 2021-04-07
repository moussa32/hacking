import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { fake_data as data, fake_Doughnut_data } from '../../../../../shared/constants/fakedata';


const HackerReports = () => {
  return (
    <>
      <div class="jumbotron jumbotron-fluid bg-black rounded">
        <div class="container">
          <div className="row">
            <div className="col-md-6">
              <Bar data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
            <div className="col-md-6">
              <Doughnut data={fake_Doughnut_data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerReports;