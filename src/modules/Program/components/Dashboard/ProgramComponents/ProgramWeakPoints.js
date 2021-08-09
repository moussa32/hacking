import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { getProgramWeakness } from "../../../../../api/ProgramAPI/ProgramWeakness";
import { GiBrokenShield } from "react-icons/gi";

function ProgramWeakPoints() {
  const [isLoadding, setIsLoadding] = useState(true);
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#6201f8", "#ecafea", "#c211d7", "#43059d", "#43059d", "#beb6c3", "#7f6a8c", "#ef5b95"],
        borderColor: "rgba(255, 255, 255, 0)",
      },
    ],
  });
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    getProgramWeakness(localStorage.getItem("accessToken")).then(res => {
      res.data.map(point => {
        doughnutChartData.labels.push(point.name);
        doughnutChartData.datasets[0].data.push(point.reports_count);
      });
      setIsData(true);
    });
  }, []);

  const options = {
    responsive: true,
    legend: {
      position: "left",
      labels: {
        usePointStyle: true,
        boxWidth: 15,
      },
    },
  };

  return (
    <div className="bg-black p-4 mb-4">
      <h2 className="text-right mb-4">{isData && doughnutChartData.length > 0 ? <GiBrokenShield className="section-icon" size={"2rem"} /> : ""} نقاط الضعف</h2>
      {isData && doughnutChartData.length > 0 ? (
        <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
          <div className="container">
            <div className="row px-2">
              <div className="col-md-11 px-0">
                <Doughnut data={doughnutChartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <GiBrokenShield size={"3rem"} />
          <p className="mt-4 lead mb-0">لا يوجد اي نقاط ضغف تم إكتشافها بعد.</p>
        </>
      )}
    </div>
  );
}

export default ProgramWeakPoints;
