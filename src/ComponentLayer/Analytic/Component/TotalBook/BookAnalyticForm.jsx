import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';

function BookAnalyticForm() {


    return (
        <div className='h-full text-white rounded-[20px] space-y-5 '>
            <div className="BarChart-Contianer flex flex-col lg:flex-row h-[800px] lg:h-[497px] gap-5 w-full">
                <div className="chart w-full h-full bg-secondary p-5 rounded-[20px]">
                    <BarChart />
                </div>
                <div className="chart w-full h-full bg-secondary p-5 rounded-[20px]">
                    <LineChart />
                </div>
            </div>
        </div>
    )
}

export default BookAnalyticForm