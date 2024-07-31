import React from 'react';
import { Line } from 'react-chartjs-2';
import { useThemeSwitch } from '../../../Context/ThemeSwitchContext'
import 'tailwindcss/tailwind.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const ChartBackup = () => {
  const { theme } = useThemeSwitch();
  const colortext=theme === 'dark' ? '#FFFFFF' : '#12363C';
  const colorgrid=theme === 'dark' ? '#cbcbcb6b' : '#DDDDDD';
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Certificates',
        data: [5, 4, 7, 3, 8, 8, 5],
        borderColor: '#1414b4',
        backgroundColor: '#1414b4',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Book',
        data: [3, 2, 6, 5, 6, 7, 4],
        borderColor: '#249e11',
        backgroundColor: '#249e11',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Borrow',
        data: [5,6,2,4,6,8,7],
        borderColor: '#ff5656',
        backgroundColor: '#ff5656',
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
        text: 'Backup Chart',
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

export default ChartBackup;
