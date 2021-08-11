import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Chart } from "react-chartjs-2";
import { getProgramReportsLevels } from "../../../../../api/ProgramAPI/ProgramReportsLevels";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import { BsInboxesFill } from "react-icons/bs";

const ProgramReports = () => {
  const [isDataDone, setIsDataDone] = useState(false);
  const [isData, setIsData] = useState(false);

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "#0f572226",
        borderColor: "#08cc96",
        borderWidth: 2,
        color: "#fff",
      },
    ],
  });
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ["مفتوح", "مغلق"],
    datasets: [
      {
        data: [],
        backgroundColor: ["rgb(24,138,76)", "rgb(251,136,17)"],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const reFreshtoken = localStorage.getItem("refreshToken");

    getProgramReportsLevels(token)
      .then(res => {
        Chart.defaults.global.defaultFontColor = "#fff";

        //Is there any data return from the server hide default icon
        if (res.data.reports_by_level.length !== 0) {
          setIsData(true);
        }

        const reportsByLevel = res.data.reports_by_level;
        const pushReportsLabels = barChartData.labels;
        const pushReportsValue = barChartData.datasets[0].data;

        reportsByLevel.forEach(report => {
          pushReportsLabels.push(report.name);
          pushReportsValue.push(report.reports_count);
        });

        const reportsByState = res.data.reports_by_state;
        const pushStateReportsValue = doughnutChartData.datasets[0].data;

        for (const [key, value] of Object.entries(reportsByState)) {
          pushStateReportsValue.push(value);
        }

        setIsDataDone(true);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(reFreshtoken);
        }
      });
  }, []);

  const optionsForBars = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "#ffffff63",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  const options = {
    responsive: true,
    legend: {
      position: "bottom",
      rtl: true,
      labels: {
        usePointStyle: true,
        boxWidth: 30,
        padding: 20,
      },
    },
  };

  return (
    <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
      <h2 className="text-right mr-4 mb-4">{isData ? <BsInboxesFill className="section-icon" size={"2rem"} /> : ""} التقارير</h2>
      <div className="container">
        {isData ? (
          <>
            {isDataDone ? (
              <>
                <h3 className="w-100 pb-4">مجموع التقارير {doughnutChartData.datasets[0].data[0] + doughnutChartData.datasets[0].data[1]}</h3>
                <div className="row px-2">
                  <div className="col mx-1 px-0 bg-black">
                    <Doughnut data={doughnutChartData} options={options} />
                  </div>
                  <div className="col bg-black p-3">
                    <Bar data={barChartData} options={optionsForBars} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <BsInboxesFill size={"3rem"} />
            <p className="mt-4 lead mb-0">لا يوجد اي تقارير مسلمة</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramReports;
