import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialBarChart = ({ bookLange, totalBook, borrowBook }) => {
  const remainBookPercent = (totalBook - borrowBook) / totalBook * 100

  return (
    <>
      <ReactApexChart 
        options={{
          colors: ["#A855F7"],
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  color: "#FFFFFF",
                  formatter: function (val) {
                    return `${totalBook}`;
                  }
                }
              },
              hollow: {
                size: '65%',
              }
            },
          },
          labels: [bookLange],
          tooltip:{
            enabled: true,
            y: {
              formatter: function () {
                return `${borrowBook}`;
              }
            }
          }
        }} 
        series={[remainBookPercent.toFixed(2)]} // Pass the percentage value as series data
        type="radialBar" 
        height={160} />
    </>
  );
};

export default RadialBarChart;
