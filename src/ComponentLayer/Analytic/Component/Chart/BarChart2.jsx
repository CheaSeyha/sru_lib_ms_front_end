import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useThemeSwitch } from '../../../../Context/ThemeSwitchContext';

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { theme } = useThemeSwitch();

  // Precompute colors based on the theme
  const axisLabelsColors = useMemo(() => {
    return theme === "dark" ? "#ffffff" : "#000000";
  }, [theme]);

  // Chart.js configuration
  const data = {
    labels: ["ENG", "BUS", "IT", "Agri", "LAW", "Other", "News"],
    datasets: [
      {
        label: "Khmer",
        data: [44, 55, 41, 64, 22, 43, 21],
        backgroundColor: '#2845FF',
        borderColor: '#2845FF',
        borderWidth: 1,
      },
      {
        label: "English",
        data: [53, 32, 33, 52, 13, 44, 32],
        backgroundColor: '#00D0FF',
        borderColor: '#00D0FF',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: axisLabelsColors,
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          },
        },
        grid: {
          display: false, // Disable grid lines for x-axis
        },
      },
      y: {
        ticks: {
          color: axisLabelsColors,
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          },
        },
        grid: {
          borderColor: axisLabelsColors, // Grid line color
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '430px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
