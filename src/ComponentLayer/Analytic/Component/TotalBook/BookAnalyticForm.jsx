import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';

function BookAnalyticForm() {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    return (
        <div className='h-full text-white rounded-[20px]'>
            <div className="bg-secondary rounded-[20px] p-5 space-y-5 text-accent">
                <div className="book-form font-noto w-full flex justify-between">
                    <p>ទិន្ន័យសៀវភៅ</p>
                    <div className="date-picker ">
                        <Datepicker
                            showShortcuts={true}
                            showFooter={true}
                            value={value}
                            onChange={newValue => setValue(newValue)}
                        />
                    </div>
                </div>
                <div className="BarChart-Contianer flex flex-col md:flex-row h-[800px] md:h-[497px]">
                    <BarChart/>
                    <LineChart/>
                </div>
            </div>
        </div>
    )
}

export default BookAnalyticForm