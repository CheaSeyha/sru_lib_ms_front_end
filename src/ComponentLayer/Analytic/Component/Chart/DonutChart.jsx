import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, labelsKey, dataKey, dataSetLabel, colors }) => {
    const [chartConfig, setChartConfig] = useState({ labels: [], data: [] });

    useEffect(() => {
        const labels = data.map(item => item[labelsKey]);
        const chartData = data.map(item => item[dataKey]);

        setChartConfig({ labels, data: chartData });
    }, [data, labelsKey, dataKey]);

    const chartData = {
        labels: chartConfig.labels,
        datasets: [
            {
                label: dataSetLabel || "Dataset",
                data: chartConfig.data,
                backgroundColor: colors, // Use passed colors
                hoverOffset: 4,
                borderColor: 'transparent', // Hide the border color
            },
        ],
    };

    const options = {
        cutout: '70%', // Adjust thickness of the donut
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((sum, value) => sum + value, 0);
                        const currentValue = dataset.data[tooltipItem.dataIndex];
                        const percentage = ((currentValue / total) * 100).toFixed(2);

                        return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
                    },
                },
                enabled: true, // Ensure tooltip is enabled
            },
            legend: {
                display: false, // Hide the legend
            },
        },
    };

    return (
        <Doughnut
            data={chartData}
            options={options}
        />
    );
};

export default DonutChart;
