import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { FaReact } from 'react-icons/fa';
import { getProgramReportsAsset } from "../../../../../api/ProgramAPI/ProgramReportsAsset";

function ProgramAssets() {
  const [reportsAssetData, setReportsAssetData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#6201f8',
        '#ecafea',
        '#c211d7',
        '#43059d',
        '#43059d',
        '#beb6c3',
        '#7f6a8c',
        '#ef5b95',
      ],
      borderColor: 'rgba(255, 255, 255, 0)'
    }]
  })
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    getProgramReportsAsset(localStorage.getItem("accessToken"))
      .then(res => {
        console.log(res);
        res.data.map(point => {
          reportsAssetData.labels.push(point.name);
          reportsAssetData.datasets[0].data.push(point.reports_count);
        });
        setIsData(true);
      })
  }, [])

  const options = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        usePointStyle: true,
        boxWidth: 15
      }
    },
  };

  return (
    <>
      {isData ? <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
        <h2 className="text-right mr-4 mb-4"><FaReact className="section-icon" size={"2rem"} /> حسب الأصول</h2>
        <div className="container">
          <div className="row px-2">
            <div className="col-md-11 px-0">
              <Doughnut data={reportsAssetData} options={options} />
            </div>
          </div>
        </div>
      </div > : <><FaReact size={"3rem"} />
        <p className="mt-4 lead mb-0">لا يوجد اي أصول</p></>}
    </>
  )
}

export default ProgramAssets;
