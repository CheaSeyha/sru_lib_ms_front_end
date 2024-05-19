import React from 'react'
import Chart from 'react-apexcharts';

function MejorPieChart() {
  return (
    <div className='border'>
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
                labels: {
                  show: true,
                  total: {
                    color: "#82B4FF",
                    show: true,
                  }
                }
              }
            }
          },
        }}
      />

    </div>
  )
}

export default MejorPieChart