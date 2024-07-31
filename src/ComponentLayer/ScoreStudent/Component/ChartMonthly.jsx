import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { color } from 'framer-motion';
import { useThemeSwitch } from '../../../Context/ThemeSwitchContext'
const ChartMonthly = () => {
  const { theme } = useThemeSwitch();
  const colortext=theme === 'dark' ? '#ffffff' : '#12363C';
  const data = {
    labels: ['Jan', 'Feb', 'March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Certificate Monthly',
        data: [12,31,15,14,6,34,20,14,32,26,30,10],
        backgroundColor:'#4dff29d5',
        borderColor:'#000000',
        borderWidth: 1,
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
        text: 'Certificate Monthly',
        color: colortext,

        font: {
          size: 24,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        ticks: {
          color: colortext, // Set the y-axis labels color to white
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
  };

  return (
    <div className='w-full h-full bg-secondary p-5 rounded-[20px]'>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default ChartMonthly;
