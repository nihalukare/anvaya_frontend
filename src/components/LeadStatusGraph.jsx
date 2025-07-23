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

export default function LeadStatusGraph({ leads }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Leads ditribution by status",
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

  const statusCount = leads?.reduce((acc, lead) => {
    if (acc[lead.status] === undefined) {
      acc[lead.status] = 1;
    } else {
      acc[lead.status] += 1;
    }

    return acc;
  }, {});

  let labels = [];
  let dataPoints = [];
  if (statusCount) {
    labels = Object.keys(statusCount);
    dataPoints = Object.values(statusCount);
  }

  const graphData = {
    labels,
    datasets: [
      {
        label: "Number of Leads",
        data: dataPoints,
        backgroundColor: "rgba(99, 148, 255, 0.5)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={graphData} />
    </>
  );
}
