import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useThemeSwitch } from '../../../../Context/ThemeSwitchContext';

const LineChart = ({ seriesData = [], categories = [], title = '' }) => {
    const { theme } = useThemeSwitch();

    // Precompute colors based on the theme
    const axisLabelsColors = useMemo(() => {
        return theme === "dark" ? "#ffffff" : "#000000";
    }, [theme]);

    const gridColor = useMemo(() => {
        return theme === "dark" ? ['#19555F', 'transparent'] : ['#f3f3f3', 'transparent'];
    }, [theme]);

    const options = useMemo(() => ({
        series: seriesData,
        chart: {
            height: 430,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: title,
            align: 'left',
            style: {
                fontFamily: "NotoSansKhmer-Regular",
                color: axisLabelsColors, // Title color
            }
        },
        grid: {
            row: {
                colors: gridColor, // Alternating row colors
                opacity: 0.5
            },
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: axisLabelsColors, // X-axis labels color
                    fontSize: '12px',
                    fontFamily: 'Arial, sans-serif',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: axisLabelsColors, // Y-axis labels color
                    fontSize: '12px',
                    fontFamily: 'Arial, sans-serif',
                },
            },
        },
        legend: {
            show: true,
            position: 'top', // Position of the legend (top, right, bottom, left)
            labels: {
                colors: axisLabelsColors, // Legend text color
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: theme, // Use "dark" or "light" for theme-based styling
        },
        colors: ['#2845FF', '#00D0FF', '#FF5722', '#FFE100'], // Customize colors as needed
    }), [axisLabelsColors, gridColor, seriesData, categories, title, theme]);

    return (
        <div id="chart" className='w-full h-full'>
            <Chart options={options} series={seriesData} type="line" width={"100%"} height={"100%"} />
        </div>
    );
};

export default LineChart;
