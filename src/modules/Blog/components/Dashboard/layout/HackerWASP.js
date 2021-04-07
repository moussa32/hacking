import React from 'react';
import { Bar } from 'react-chartjs-2';
import { wasp_fake_data as data } from '../../../../../shared/constants/fakedata';


const HackerSkills = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">WASP 10</h2>
          <div className="section-container mt-4">
            <Bar data={data} options={{
              responsive: true, scales: {
                xAxes: [{
                  ticks: {
                    display: false
                  }
                }]
              }
            }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerSkills;