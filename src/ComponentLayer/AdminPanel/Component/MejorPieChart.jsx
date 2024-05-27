import React from 'react'
import Chart from 'react-apexcharts';

function MejorPieChart({DataMejorVisitor}) {

  // Extract labels and series data from DataMejorVisitor
  const labelData = DataMejorVisitor.map(item => item.mejorName);
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
            noData: "No Data",
            labels: labelData,
            stroke: {
              show: false
            },
            dataLabels: {// show % on piechart 
              enabled: false
            },
            color: ['#3B82F6', '#F59E0B', '#1442B8', '#B83B14', '#14B842'],// Color of pie chart 
            plotOptions: {// Show Text in Total amount of student 
              pie: {
                donut: {
                  size: 73,
                  labels: {//show total amount of vitsitor
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
              width: 100,//set number make text label show vitical 
              horizontalAlign: "left",//make text position 
              position: "bottom",//show label under piechart
              inverseOrder: true, //show number mix number first
              labels: {
                colors: "text-accent",//Text Total Color
                useSeriesColors: false,//change color of lable like piechart color
              },
            },
          }}
        />
      </div>
    </>



  )
}

export default MejorPieChart