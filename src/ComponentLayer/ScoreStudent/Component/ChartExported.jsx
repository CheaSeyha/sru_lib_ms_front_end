import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useThemeSwitch } from '../../../Context/ThemeSwitchContext'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartExported = () => {
  const { theme } = useThemeSwitch();
  const colortext=theme === 'dark' ? '#FFFFFF' : '#12363C';
  const colorgrid=theme === 'dark' ? '#cbcbcb6b' : '#DDDDDD';
  const data = {
    labels: ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"],
    datasets: [
      {
        label: 'University',
        data: [33,43,45,32,98,76,43,78,85,12,34,55],
        borderColor: '#ff5656',
        backgroundColor: '#ff5656',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Donation',
        data: [12,34,56,33,54,65,67,8,86,56,45,34],
        borderColor: '#ffff56',
        backgroundColor: '#ffff56',
        fill: false,
        tension: 0.1,
      },
    ],
    
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels:{
          color:colortext,
        }
      },
      title: {
        display: true,
        text: 'Book income',
        color: colortext,
        font: {
          size: 24,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color:colortext,
        },
        grid: {
          color: colorgrid,
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color:colortext,
        },
        grid: {
          color: colorgrid,
        },
      },
    },
  };

  return <Line data={data} options={options}/>;
};

export default ChartExported;
