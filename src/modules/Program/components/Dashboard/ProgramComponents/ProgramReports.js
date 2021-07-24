import React, { useState } from 'react';
import { Bar, Doughnut, Chart } from 'react-chartjs-2';
import { BsInboxesFill } from 'react-icons/bs';


function ProgramReports() {
  const [isData, setIsData] = useState(false);
  const [isDataDone, setIsDataDone] = useState(false);

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: '#0f572226',
      borderColor: '#08cc96',
      borderWidth: 2,
      color: '#fff'
    }]
  });
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [
      'مفتوح',
      'مغلق',
    ],
    datasets: [{
      data: [],
      backgroundColor: [
        '#0e5296',
        '#4d1055',
      ],
      hoverOffset: 4
    }]
  });

  const optionsForBars = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        },
      }],
      xAxes: [{
        gridLines: {
          display: true,
          color: '#ffffff63'
        },
      }]
    },
    legend: {
      display: false
    }
  }

  const options = {
    responsive: true,

  }


  return (
    <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
      <h2 className="text-right mr-4 mb-4">{isData ? (<BsInboxesFill className="section-icon" size={"2rem"} />) : ''} التقارير</h2>
      <div className="container">
        {isData ? (
          <>
            {isDataDone ? (
              <>
                <h3 className="w-100 pb-4">مجموع التقارير {doughnutChartData.datasets[0].data[0] + doughnutChartData.datasets[0].data[1]}</h3>
                <div className="row px-2">
                  <div className="col-md-7 bg-second p-3">
                    <Bar data={barChartData} options={optionsForBars} />
                  </div>
                  <div className="col-md-5 px-0">
                    <Doughnut data={doughnutChartData} options={options} />
                  </div>
                </div>
              </>
            ) : ''}
          </>
        ) : (
          <>
            <BsInboxesFill size={"3rem"} />
            <p className="mt-4 lead mb-0">لا يوجد اي تقارير مسلمة</p>
          </>
        )}
      </div>
    </div >
  )
}

export default ProgramReports
