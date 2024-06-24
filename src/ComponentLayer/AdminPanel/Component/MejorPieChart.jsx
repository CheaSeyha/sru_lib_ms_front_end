import React from 'react';
import Chart from 'react-apexcharts';

function MejorPieChart({ DataMejorVisitor }) {

  // Function to abbreviate major names
  const abbreviateMajorName = (name) => {
    return name
      .split(' ')
      .map(word => word[0].toUpperCase())
      .join('');
  };

  // Extract labels and series data from DataMejorVisitor
  const fullNamelabelData = DataMejorVisitor.map(item => item.majorName); // Use majorName instead of mejorName
  const labelData = DataMejorVisitor.map(item => abbreviateMajorName(item.majorName));
  const seriesData = DataMejorVisitor.map(item => item.totalAmount);

  return (
    <>
      <div className="PieChart-Uni flex justify-center w-full h-full bg-secondary rounded-[20px]">
        <Chart
          type='donut'
          width="100%"
          height="100%"
          series={seriesData}
          options={{
            noData: {
              text: "No Data",
            },
            labels: labelData,
            stroke: {
              show: false
            },
            dataLabels: {
              enabled: false
            },
            colors: ['#3B82F6', '#F59E0B', '#1442B8', '#B83B14', '#14B842'], // Color of pie chart
            plotOptions: {
              pie: {
                donut: {
                  size: '73%',
                  labels: {
                    value: {
                      color: "#82B4FF",
                    },
                    show: true,
                    total: {
                      label: 'Total',
                      color: '#82B4FF',
                      show: true,
                      formatter: () => {
                        const labels = labelData; // Your labels
                        return labels.length.toString(); // Convert the length of labels to string
                      }
                    }
                  }
                }
              }
            },
            legend: {
              width: 80, // Set number to make text label show vertical
              horizontalAlign: "left", // Change text position
              position: "bottom", // Show label under pie chart
              inverseOrder: true, // Show number mix number first
              labels: {
                colors: "text-accent", // Text total color
                useSeriesColors: false, // Change color of label like pie chart color
              },
            },
            tooltip: {
              y: {
                formatter: function (val, { seriesIndex }) {
                  return `${fullNamelabelData[seriesIndex]}: ${val}`;
                }
              }
            }
          }}
        />
      </div>
    </>
  );
}

export default MejorPieChart;
