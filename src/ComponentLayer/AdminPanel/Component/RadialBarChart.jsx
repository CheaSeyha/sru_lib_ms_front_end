import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialBarChart = ({ bookLange, totalBook, bookAvaible }) => {

  const borrowBook = totalBook - bookAvaible
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
                  color: "#A855F7",
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
          tooltip: {
            enabled: true,
            y: {
              title: {
                formatter: function () {
                  return 'Borrow book';
                }
              },
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
