import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { color } from 'framer-motion';
import { useThemeSwitch } from '../../../Context/ThemeSwitchContext'
import 'tailwindcss/tailwind.css';
const ChartBorrow = () => {
  const { theme } = useThemeSwitch();
  const colortext=theme === 'dark' ? '#FFFFFF' : '#12363C';
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Borrow',
        data: [10, 12, 17, 9, 15, 19, 21],
        backgroundColor:'#ff3636',
        borderColor:'#000000',
      },
      {
        label: 'Return',
        data: [12,31,15,14,6,34,20],
        backgroundColor:'#3c32ff',
        borderColor:'#000000',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Borrow',
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
          color: colortext, 
        },
        grid: {
          color: theme === 'dark' ? '#cbcbcb6b' : '#DDDDDD',
        },
      },
      x: {
        ticks: {
          color: colortext, // Set the x-axis labels color to white
        },
        grid: {
          color: theme === 'dark' ? '#cbcbcb6b' : '#DDDDDD',
        },
      },
    },
    maintainAspectRatio: false,
    categoryPercentage: 0.8, // Adjust to make bars wider/narrower
    barPercentage: 1, // Adjust to make bars wider/narrower
  };

  return (
    <div className='w-full h-full bg-secondary p-5 rounded-[20px]'>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default ChartBorrow;
