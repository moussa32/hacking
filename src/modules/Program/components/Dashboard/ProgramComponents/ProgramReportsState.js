import React, { useEffect, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { getProgramReportsStateApi } from "../../../../../api/ProgramAPI/ProgramReportsStateApi";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import { BsInboxesFill } from "react-icons/bs";

const ProgramReportsState = () => {
  const [isDataDone, setIsDataDone] = useState(false);
  const [isData, setIsData] = useState(false);
  const [totalReports, setTotalReports] = useState(0);

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#0f572226", "rgba(101,39,64,0.3)", "rgba(97,10,19,0.3)", "#4f0f5759"],
        borderColor: ["#08cc96", "rgb(101,39,64)", "rgb(97,10,19)", "#52105a"],
        borderWidth: 2,
        color: "#fff",
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const reFreshtoken = localStorage.getItem("refreshToken");

    getProgramReportsStateApi(token)
      .then(res => {
        Chart.defaults.global.defaultFontColor = "#fff";
        console.log(res.data);
        //Is there any data return from the server hide default icon
        if (res.data.length !== 0) {
          setIsData(true);
        }

        const reportsByState = res.data;
        const pushReportsLabels = barChartData.labels;
        const pushReportsValue = barChartData.datasets[0].data;
        let sumOfReports = 0;

        reportsByState.forEach(report => {
          pushReportsLabels.push(report.close_state);
          pushReportsValue.push(report.reports_count);
          sumOfReports += report.reports_count;
        });

        setTotalReports(sumOfReports);
        setIsDataDone(true);
      })
      .catch(error => {
        if (error.response.status === 401) {
          getNewTokens(reFreshtoken);
        }
      });
  }, []);

  const options = {
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
            display: false,
            color: "#ffffff63",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  return (
    <div className="jumbotron jumbotron-fluid bg-black rounded pt-4">
      <h2 className="text-right mr-4 mb-4">{isData ? <BsInboxesFill className="section-icon" size={"2rem"} /> : ""} التقارير حسب الحاله</h2>
      <div className="container">
        {isData ? (
          <>
            {isDataDone ? (
              <>
                <h3 className="w-100 pb-4">مجموع التقارير {totalReports}</h3>
                <div className="row px-2">
                  <div className="col-md-12 p-3">
                    <Bar data={barChartData} options={options} />
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

export default ProgramReportsState;
