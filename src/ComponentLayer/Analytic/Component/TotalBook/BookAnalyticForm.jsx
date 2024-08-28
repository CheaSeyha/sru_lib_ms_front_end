import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';
import BookBorrowedPieChart from './BookBorrowedPieChart';
import MostBorrowBookTable from './MostBorrowBookTable';

function BookAnalyticForm() {

    const mySeriesData = [
        {
            name: "Donations",
            data: [26, 12, 23, 15, 16, 10, 24, 46, 8]
        },
        {
            name: "University Funding",
            data: [16, 36, 26, 17, 38, 27, 17, 24, 16]
        },
        {
            name: "Thesis Income",
            data: [3, 5, 8, 9, 11, 13, 16, 11, 13]
        }
    ];

    const myCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const myTitle = 'ប្រភពដែលសៀវភៅទទួលបាន';


    return (
        <div className='h-full text-white rounded-[20px] space-y-5 '>
            <div className="BarChart-Contianer grid grid-cols-1 lg:grid-cols-2 h-[full] gap-5 w-full">
                <div className="chart w-full h-[350px] md:h-[497px] bg-secondary p-5 rounded-[20px]">
                    <BarChart />
                </div>
                <div className="chart w-full h-[350px] md:h-[497px] bg-secondary p-5 rounded-[20px]">
                    <LineChart
                        seriesData={mySeriesData}
                        categories={myCategories}
                        title={myTitle}
                    />
                </div>
            </div>
            <div className="BarChart-Contianer grid grid-cols-1 xl:grid-cols-2 h-full gap-5 w-full">
                <div className="chart w-full h-fit lg:h-[497px] bg-secondary p-5 rounded-[20px]">
                    <BookBorrowedPieChart />
                </div>
                <div className="chart w-full h-[497px] bg-secondary p-5 rounded-[20px]">
                    <MostBorrowBookTable />
                </div>
            </div>
        </div>
    )
}

export default BookAnalyticForm