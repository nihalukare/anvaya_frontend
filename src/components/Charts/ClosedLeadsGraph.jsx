import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ClosedLeadsGraph({ leads }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Leads closed by sales agent",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  const closedLeadsCount = leads?.reduce((acc, lead) => {
    if (lead.status === "Closed") {
      if (acc[lead.salesAgent.name] === undefined) {
        acc[lead.salesAgent.name] = 1;
      } else {
        acc[lead.salesAgent.name] += 1;
      }
    } else {
      if (acc[lead.salesAgent.name] === undefined) {
        acc[lead.salesAgent.name] = 0;
      }
    }
    return acc;
  }, {});

  let labels = [];
  let dataPoints = [];

  if (closedLeadsCount) {
    labels = Object.keys(closedLeadsCount);
    dataPoints = Object.values(closedLeadsCount);
  }

  const barGraphData = {
    labels,
    datasets: [
      {
        label: "Leads Closed",
        data: dataPoints,
        backgroundColor: "rgba(151, 255, 99, 0.5)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={barGraphData} />
    </>
  );
}
