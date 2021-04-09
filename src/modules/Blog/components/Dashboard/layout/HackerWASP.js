import React from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { wasp_fake_data as data } from '../../../../../shared/constants/fakedata';


const HackerSkills = () => {
  const data = (canvas) => {
    Chart.defaults.global.legend.display = false;

    return {
      labels: ['Insufficient logging and monitoring', 'Using Components with known vulnerabilities', 'Insecure Deserialization', 'Cross Site Scripting (XSS)', 'Security misconfigurations', 'Broken Access control', 'Sensitive Data Exposure', 'XML External Entities (XXE)', 'Broken Authentication', 'Injection'],
      datasets: [{
        labels: ['bugs'],
        data: [50, 90, 60, 20, 100, 23, 93, 49, 80, 75],
        backgroundColor: '#4f0f5726',
        borderColor: '#52105a',
        borderWidth: 2
      }]
    }
  }
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
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerSkills;