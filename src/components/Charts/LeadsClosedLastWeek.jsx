import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useFetch } from "../../hooks/useFetch";
import { BASE_API_URL } from "../../config";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeadsClosedLastWeek() {
  const { data, loading, error } = useFetch(
    `${BASE_API_URL}/reports/last-week`
  );

  let normalisedData = data?.data.reduce((acc, lead) => {
    if (acc[lead.salesAgent.name] === undefined) {
      acc[lead.salesAgent.name] = 1;
    } else {
      acc[lead.salesAgent.name] += 1;
    }
    return acc;
  }, {});

  let labels = [];
  let dataPoints = [];

  if (normalisedData) {
    labels = Object.keys(normalisedData);
    dataPoints = Object.values(normalisedData);
  }

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of leads",
        data: dataPoints,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      {data?.data.length === 0 && (
        <div className="alert alert-primary">No leads to show the report.</div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error! Something went wrong.
        </div>
      )}
      {loading && (
        <div className="alert alert-primary" role="alert">
          Loading...
        </div>
      )}
      <Pie data={pieChartData} />
    </>
  );
}
