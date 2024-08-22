import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useThemeSwitch } from '../../../../Context/ThemeSwitchContext';

const BarChart = () => {
  const { theme } = useThemeSwitch();

  // Precompute colors based on the theme
  const axisLabelsColors = useMemo(() => {
    return theme === "dark" ? "#ffffff" : "#000000";
  }, [theme]);

  const options = useMemo(() => ({
    chart: {
      type: 'bar',
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: theme, // Use "dark" or "light" for theme-based styling
    },
    xaxis: {
      categories: ["ENG", "BUS", "IT", "Agri", "LAW", "Other", "News"],
      labels: {
        style: {
          colors: axisLabelsColors, // White for dark theme, black for light theme
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: axisLabelsColors, // White for dark theme, black for light theme
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
      },
    },
    colors: ['#2845FF', '#00D0FF'],
  }), [axisLabelsColors]);

  const series = [
    {
      name: "Khmer",
      data: [44, 55, 41, 64, 22, 43, 21],
    },
    {
      name: "English",
      data: [53, 32, 33, 52, 13, 44, 32],
    },
  ];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={"100%"} />
    </div>
  );
};

export default BarChart;
