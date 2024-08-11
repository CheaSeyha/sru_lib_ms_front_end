import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Sunrise } from 'lucide-react';



function TotalEntryCardForm() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className='w-full 2xl:w-[377px] h-full bg-secondary rounded-[20px] p-5 text-accent flex flex-col space-y-5'>
            <div className="header-card font-noto flex justify-between">
                <p>សរុបចំនួនចូលបណ្ណាល័យក្នុងខែនេះ</p>
                <div className='w-[90px]'>
                    <DatePicker
                        id='TotalEntry-date-picker'
                        key="TotalEntry-date-picker"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="MMM-yyyy"
                        showMonthYearPicker
                        className="w-full p-[10px] rounded-[5px] text-black"
                    />
                </div>
            </div>
            <div className="card-total-entry w-full h-[82px] bg-primary rounded-[10px] p-5 items-center flex">
                <div className="card-container flex items-center w-full h-full">
                    <p className='font-noto text-sm w-[40px]'>សរុបនិស្សិត</p>
                    <p className='font-bold text-[48px] bg-clip-text text-transparent bg-gradient-to-t from-accent to-[#00ccff] drop-shadow-md'>
                        100
                    </p>
                </div>
                <span className='line-gred w-[7px] rounded-lg h-full bg-gradient-to-t from-accent to-[#00ccff]'></span>
                <div className="card-container flex items-center w-full h-full ps-5">
                    <p className='font-noto text-sm w-[40px]'>និស្សិតស្រី</p>
                    <p className='font-bold text-[48px] bg-clip-text text-transparent bg-gradient-to-t from-accent to-[#00ccff]'>
                        45
                    </p>
                </div>
            </div>
            <div className="time-shift-card w-full flex flex-col h-full">
                <p className='h-[46px] font-noto'>សរុបតាមម៉ោង</p>
                <div className="card-container w-full flex-grow flex gap-5">
                    <div className="card-time w-full h-full grid  place-items-center bg-gradient-to-t text-black from-white to-[#a6ff00] rounded-[10px]">
                        <div className="icon">
                            <Sunrise />
                        </div>
                        <div className="amount text-[24px] font-bold">
                            34
                        </div>
                        <div className="text-time-shift font-noto ">
                            ពេលព្រឹក
                        </div>
                    </div>
                    <div className="card-time w-full h-full grid  place-items-center bg-gradient-to-t text-black from-white to-[#FFFDB5] rounded-[10px]">
                        <div className="icon">
                            <Sunrise />
                        </div>
                        <div className="amount text-[24px] font-bold">
                            34
                        </div>
                        <div className="text-time-shift font-noto ">
                            ពេលព្រឹក
                        </div>
                    </div>
                    <div className="card-time w-full h-full grid  place-items-center bg-gradient-to-t text-black from-white to-[#008D97] rounded-[10px]">
                        <div className="icon">
                            <Sunrise />
                        </div>
                        <div className="amount text-[24px] font-bold">
                            34
                        </div>
                        <div className="text-time-shift font-noto ">
                            ពេលព្រឹក
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default TotalEntryCardForm
