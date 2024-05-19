import React from 'react'
import Chart from 'react-apexcharts';

function MejorPieChart() {
  return (
    <>
      <div className="PieChart-Uni flex flex-col w-full h-full bg-secondary rounded-[20px] p-5">
        <div className="chart ">
          <div className="text-table w-full h-[45px] flex">
            <p>Mejor Vistor</p>
          </div>
          <div className="container-piechart w-full h-full justify-center items-center border ">
            <Chart
              type='donut'
              width="100%"
              series={[34, 26, 73, 35, 56]}
              options={{
                labels: ['CS', 'PA', 'BUS', 'MATH', 'ENG'],
                stroke: {
                  show: false
                },
                // show % on piechart 
                dataLabels: {
                  enabled: false
                },
                // Color of pie chart 
                color: ['#3B82F6', '#F59E0B', '#1442B8', '#B83B14', '#14B842'],
                // Show Text in Total amount of student 
                plotOptions: {
                  pie: {
                    donut: {
                      //show total amount of vitsitor
                      labels: {
                        value: {
                          color: "#FFFFFF",
                        },
                        show: true,
                        //Text 'Totoal Mejor'
                        total: {
                          label: "Total Mejor",
                          color: "#82B4FF",
                          show: true,
                        }
                      }
                    }
                  }
                },
                legend: {
                  position: "bottom",
                  labels: {
                    colors: "text-accent",
                    useSeriesColors: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>



  )
}

export default MejorPieChart