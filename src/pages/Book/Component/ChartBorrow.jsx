import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { useThemeSwitch } from "../../../context/ThemeSwitchContext";
const ChartBorrow = () => {
  const { theme } = useThemeSwitch();
  // Precompute colors based on the theme
  const axisLabelsColors = useMemo(() => {
    return theme === "dark" ? "#ffffff" : "#000000";
  }, [theme]);

  const options = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 430,
      },
      title: {
        text: "ចំនួនសងនិងខ្ចីសៀវភៅប្រចាំថ្ងៃ",
        align: "left",
        style: {
          fontFamily: "NotoSansKhmer-Regular",
          color: axisLabelsColors, // Title color
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: theme, // Use "dark" or "light" for theme-based styling
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        labels: {
          style: {
            colors: axisLabelsColors, // White for dark theme, black for light theme
            fontSize: "12px",
            fontFamily: "Arial, sans-serif",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: axisLabelsColors, // White for dark theme, black for light theme
            fontSize: "12px",
            fontFamily: "Arial, sans-serif",
          },
        },
      },
      legend: {
        show: true,
        position: "top", // Position of the legend (top, right, bottom, left)
        labels: {
          colors: axisLabelsColors, // Legend text color
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
        },
      },
      colors: ["#ff2828", "#2833ff"],
    }),
    [axisLabelsColors, theme],
  );

  const series = [
    {
      name: "ខ្ចី",
      data: [12, 8, 6, 9, 4, 3, 7],
    },
    {
      name: "សង",
      data: [9, 6, 10, 5, 2, 7, 3],
    },
  ];

  return (
    <div id="chart" className=" w-full h-full">
      <Chart
        options={options}
        series={series}
        type="bar"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};
export default ChartBorrow;
