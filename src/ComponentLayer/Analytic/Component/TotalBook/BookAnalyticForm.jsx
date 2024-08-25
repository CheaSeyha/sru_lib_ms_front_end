import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';
import BookBorrowedPieChart from './BookBorrowedPieChart';

function BookAnalyticForm() {


    return (
        <div className='h-full text-white rounded-[20px] space-y-5 '>
            <div className="BarChart-Contianer grid grid-cols-1 lg:grid-cols-2 h-full gap-5 w-full">
                <div className="chart w-full h-[497px] bg-secondary p-5 rounded-[20px]">
                    <BarChart />
                </div>
                <div className="chart w-full h-[497px] bg-secondary p-5 rounded-[20px]">
                    <LineChart />
                </div>
                <div className="chart w-full h-[497px] bg-secondary p-5 rounded-[20px]">
                    <BookBorrowedPieChart />
                </div>
            </div>
        </div>
    )
}

export default BookAnalyticForm