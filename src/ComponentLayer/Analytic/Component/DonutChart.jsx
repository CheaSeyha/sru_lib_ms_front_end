import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const MyDoughnutChart = ({ bookData }) => {
  const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Initialize temporary arrays to hold the labels and data
    const labels = [];
    const data = [];

    // Collect labels and data
    bookData.forEach((dataItem) => {
      labels.push(dataItem.lang);
      data.push(dataItem.Total);
    });

    // Update state with the collected data
    setChartLabel(labels);
    setChartData(data);
  }, [bookData]);

  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: "Total Book",
        data: chartData,
        backgroundColor: ['#00BBFF', '#00FFEA'],
        hoverOffset: 4,
        borderColor: 'transparent', // Hide the border color
      },
    ],
  };

  const options = {
    cutout: "70%", // Adjust thickness
    plugins: {
      tooltip: {
        enabled: true, // Ensure tooltip is enabled
      },
      legend: {
        display: false, // Set to false to hide the legend
      },
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
    />
  );
};

export default MyDoughnutChart;
