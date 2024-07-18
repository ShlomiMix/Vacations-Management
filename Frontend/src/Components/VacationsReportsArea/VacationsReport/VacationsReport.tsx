import { Chart as ChartJS, registerables } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js/auto";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { jsonToCSV, useCSVDownloader } from "react-papaparse";
import { useDispatch } from "react-redux";
import { vacationReportActionCreators } from "../../../Redux/ReportsSlice";
import { useAppSelector } from "../../../Redux/Store";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import "./VacationsReport.css";
import useTitle from "../../../Utils/UseTitle";

ChartJS.register(...registerables);

function VacationsReport(): JSX.Element {
  const vacations = useAppSelector((state) => state?.vacationsReport);
  const { CSVDownloader, Type } = useCSVDownloader();

  const destinations = vacations.map((v) => v.destination);

  const likesCount = vacations.map((v) => v.likesCount);

  const dispatch = useDispatch();

  useTitle("Vacations Reports")

  const csv = jsonToCSV(
    {
      fields: ["Destination", "Likes Count"],
      data: vacations.map((v) => [v.destination, v.likesCount]),
    },
    { escapeFormulae: true }
  );

  // Define a useEffect hook to fetch vacations report data when the component mounts
  useEffect(() => {
    vacationsService
      .getVacationsReport()
      .then((vacations) => {
        // Dispatch an action to update the vacations report state with the fetched data
        dispatch(vacationReportActionCreators.setVacations(vacations));
      })
      .catch((err) => notify.error(err));
  }, [vacations, dispatch]);

  const data: ChartData<"bar"> = {
    labels: destinations,
    datasets: [
      {
        label: "Turn Off",
        data: likesCount,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="VacationsReport">
      <div className="vacations-report-container">
        <div className="header">
          <h1 className="title">Likes Report</h1>
        </div>
        <Bar data={data} options={options} />
      </div>
      <div className="csv-container">
        <CSVDownloader
          type={Type.Button}
          filename="vacation report"
          config={{
            delimiter: ";",
          }}
          data={csv}
          className="csv"
        >
          Export to CSV
        </CSVDownloader>
      </div>
    </div>
  );
}

export default VacationsReport;
