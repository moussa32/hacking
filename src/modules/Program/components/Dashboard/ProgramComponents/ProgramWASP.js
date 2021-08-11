import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getProgramWASP } from "../../../../../api/ProgramAPI/ProgramWASPAPI";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import { VscBeaker } from "react-icons/vsc";

const ProgramWASP = () => {
  const [wasp, setWasp] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "#4f0f5759",
        borderColor: "#52105a",
        borderWidth: 2,
      },
    ],
  });
  const [isData, setIsData] = useState(false);
  const [isDataDone, setIsDataDone] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const reFreshtoken = localStorage.getItem("refreshToken");

    getProgramWASP(token)
      .then(res => {
        const reportsData = res.data;
        const pushWASPLabels = wasp.labels;
        const pushWASPData = wasp.datasets[0].data;

        //Is there any data return from the server hide default icon
        if (reportsData.length !== 0) {
          setIsData(true);
        }

        reportsData.forEach(element => {
          pushWASPLabels.push(element.name);
          pushWASPData.push(element.reports_count);
        });

        setIsDataDone(true);
      })
      .catch(erorr => {
        if (erorr.response.status === 401) {
          getNewTokens(reFreshtoken);
        }
      });
  }, []);

  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: true,
            color: "#ffffff38",
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            color: "#ffffff38",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">{isData ? <VscBeaker className="section-icon" size={"2rem"} /> : ""}10-OWASP</h2>
          {isData ? (
            <div className="section-container mt-4">{isDataDone ? <Bar data={wasp} options={options} /> : ""}</div>
          ) : (
            <>
              <VscBeaker size={"3rem"} />
              <p className="mt-4 lead mb-0">لا يوجد اي تقارير مسلمة</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProgramWASP;
