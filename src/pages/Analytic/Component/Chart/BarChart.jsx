import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useThemeSwitch } from "../../../../context/ThemeSwitchContext";

const BarChart = ({ chartData }) => {
  const { theme } = useThemeSwitch();
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (chartData) {
      // Extract college names for categories
      const colleges = chartData.map((college) => college.collegeName);
      setCategories(colleges);

      // Extract book data for both languages (with fallback for missing data)
      const khmerData = chartData.map(
        (college) => college.bookEachLanguage.kh || 0,
      ); // Default to 0 if missing
      const englishData = chartData.map(
        (college) => college.bookEachLanguage.eng || 0,
      ); // Default to 0 if missing

      setSeries([
        { name: "សៀវភៅភាសាខ្មែរ", data: khmerData },
        { name: "សៀវភៅភាសាអង់គ្លេស", data: englishData },
      ]);
    }
  }, [chartData]);

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
        text: "ទនិ្នន័យសៀវភៅតាមមហាវិទ្យាល័យនីមួយៗ",
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
        categories: categories,
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
      colors: ["#2845FF", "#00D0FF"],
    }),
    [axisLabelsColors, theme, categories],
  );

  return (
    <div id="chart" className="w-full h-full">
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

export default BarChart;
