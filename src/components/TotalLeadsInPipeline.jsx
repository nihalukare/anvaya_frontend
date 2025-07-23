import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useFetch } from "../hooks/useFetch";
import { BASE_API_URL } from "../config";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TotalLeadsInPipeline({ leads }) {
  const { data, loading, error } = useFetch(`${BASE_API_URL}/report/pipeline`);

  const closedLeads = leads?.length - data?.totalLeadsInPipeline;

  const pieChartData = {
    labels: ["Closed Leads", "Active Leads"],
    datasets: [
      {
        label: "Number of leads",
        data: [closedLeads, data?.totalLeadsInPipeline],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
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
