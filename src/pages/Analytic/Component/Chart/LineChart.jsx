import React, { useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";
import { useThemeSwitch } from "../../../../context/ThemeSwitchContext";

// Function to convert "YYYY-MM" to month name
const getMonthName = (month) => {
  const [year, monthNum] = month.split("-");
  const date = new Date(year, monthNum - 1); // Month is zero-indexed in JavaScript Date
  return date.toLocaleString("default", { month: "long" });
};

const LineChart = ({ bookIncomeData }) => {
  const { theme } = useThemeSwitch();
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (bookIncomeData) {
      // Convert month numbers to month names
      const months = bookIncomeData.map((data) => getMonthName(data.month));
      setCategories(months);

      // Extract donation and universityFunding data
      const donationData = bookIncomeData.map((data) => data.donation || 0); // Default to 0 if missing
      const universityFundingData = bookIncomeData.map(
        (data) => data.universityFunding || 0,
      ); // Default to 0 if missing

      setSeries([
        { name: "Donation", data: donationData },
        { name: "University Funding", data: universityFundingData },
      ]);
    }
  }, [bookIncomeData]);

  // Precompute colors based on the theme
  const axisLabelsColors = useMemo(() => {
    return theme === "dark" ? "#ffffff" : "#000000";
  }, [theme]);

  const gridColor = useMemo(() => {
    return theme === "dark"
      ? ["#19555F", "transparent"]
      : ["#f3f3f3", "transparent"];
  }, [theme]);

  const options = useMemo(
    () => ({
      series: series,
      chart: {
        height: 430,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "ប្រភពដែលសៀវភៅទទួលបាន",
        align: "left",
        style: {
          fontFamily: "NotoSansKhmer-Regular",
          color: axisLabelsColors, // Title color
        },
      },
      grid: {
        row: {
          colors: gridColor, // Alternating row colors
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: axisLabelsColors, // X-axis labels color
            fontSize: "12px",
            fontFamily: "Arial, sans-serif",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: axisLabelsColors, // Y-axis labels color
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
      tooltip: {
        shared: true,
        intersect: false,
        theme: theme, // Use "dark" or "light" for theme-based styling
      },
      colors: ["#2845FF", "#00D0FF"], // Customize colors as needed
    }),
    [axisLabelsColors, gridColor, series, categories, theme],
  );

  return (
    <div id="chart" className="w-full h-full">
      <Chart
        options={options}
        series={series}
        type="line"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default LineChart;
