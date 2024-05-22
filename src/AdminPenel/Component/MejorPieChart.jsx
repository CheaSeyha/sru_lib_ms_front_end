import React from 'react';
import Chart from 'react-apexcharts';

function MejorPieChart() {
  const labels = ['CS', 'PA', 'BUS', 'MATH', 'ENG'];

  return (
    <>
      <div className="PieChart-Uni flex justify-center w-full h-full bg-secondary rounded-[20px]">
        <Chart
          type='donut'
          width="100%"
          height="100%"
          series={[34, 26, 73, 35, 56]}
          options={{
            noData: "No Data",
            labels: labels,
            stroke: {
              show: false
            },
            // show % on piechart 
            dataLabels: {
              enabled: false
            },
            // Color of pie chart 
            colors: ['#3B82F6', '#F59E0B', '#1442B8', '#B83B14', '#14B842'],
            // Show Text in Total amount of student 
            plotOptions: {
              pie: {
                donut: {
                  size: '73%',
                  labels: {
                    value: {
                      color: "#82B4FF",
                    },
                    show: true,
                    //Text 'Total Mejor'
                    total: {
                      label: "Total",
                      color: "#82B4FF",
                      show: true,
                      formatter: () => labels.length // Display total number of labels
                    }
                  }
                }
              }
            },
            legend: {
              //set number make text label show vertical 
              width: 100,
              //make text position 
              horizontalAlign: "left",
              //show label under piechart
              position: "bottom",
              //show number mix number first
              inverseOrder: true,
              labels: {
                //Text Total Color
                colors: "text-accent",
                //change color of label like piechart color
                useSeriesColors: false,
                formatter: function(val, opts) {
                  // Show the total number of labels in the legend
                  return `${val} (Total Labels: ${labels.length})`;
                }
              }
            },
          }}
        />
      </div>
    </>
  );
}

export default MejorPieChart;
