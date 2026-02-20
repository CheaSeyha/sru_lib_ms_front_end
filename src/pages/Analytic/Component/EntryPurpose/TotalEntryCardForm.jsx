import React, { useState, useRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Sunrise, Sun, CloudMoon } from 'lucide-react';



function TotalEntryCardForm({studentEntryByTime}) {

    

    return (
        <div className='w-full h-full bg-secondary rounded-[20px] p-5 text-accent flex flex-col space-y-5'>
            <div className="container h-full w-full flex flex-col gap-5">
                <div className="header-card font-noto flex justify-between">
                    <p>សរុបចំនួនចូលបណ្ណាល័យក្នុងខែនេះ</p>
                </div>
                <div className="card-total-entry w-full h-full bg-primary rounded-[10px] p-5 items-center flex">
                    <div className="card-container grid place-items-center items-center w-full h-full">
                        <p className='font-noto text-sm'>សរុបនិស្សិត</p>
                        <p className='font-bold text-[48px] bg-clip-text text-transparent bg-gradient-to-t from-accent to-[#00ccff] drop-shadow-md'>
                            {studentEntryByTime.totalAttend}
                        </p>
                    </div>
                    <span className='line-gred w-[7px] rounded-lg h-full bg-gradient-to-t from-accent to-[#00ccff]'></span>
                    <div className="card-container grid place-items-center items-center w-full h-full">
                        <p className='font-noto text-sm '>និស្សិតស្រី</p>
                        <p className='font-bold text-[48px] bg-clip-text text-transparent bg-gradient-to-t from-accent to-[#00ccff]'>
                            {studentEntryByTime.totalFemale}
                        </p>
                    </div>
                </div>
            </div>
            <div className="time-shift-card w-full flex flex-col h-full ">
                <p className='h-[46px] font-noto'>សរុបតាមម៉ោង</p>
                <div className="card-container w-full flex-grow flex gap-5">
                    <div className="card-time shadow-xl transition-all hover:translate-y-[-5px] hover:scale-105 w-full h-full grid  place-items-center bg-gradient-to-t text-black from-white to-[#a6ff00] rounded-[10px]">
                        <div className="icon">
                            <Sunrise />
                        </div>
                        <div className="amount text-[24px] font-bold">
                            {studentEntryByTime.morning}
                        </div>
                        <div className="text-time-shift font-noto ">
                            ព្រឹក
                        </div>
                    </div>
                    <div className="card-time shadow-xl transition-all hover:translate-y-[-5px] hover:scale-105 w-full h-full grid  place-items-center bg-gradient-to-t text-black from-white to-[#FFFDB5] rounded-[10px]">
                        <div className="icon">
                            <Sun />
                        </div>
                        <div className="amount text-[24px] font-bold">
                            {studentEntryByTime.afternoon}
                        </div>
                        <div className="text-time-shift font-noto ">
                            រសៀល
                        </div>
                    </div>
                    <div className="card-time shadow-xl transition-all hover:translate-y-[-5px] hover:scale-105 w-full h-full grid  place-items-center bg-gradient-to-t text-black from-white to-[#008D97] rounded-[10px]">
                        <div className="icon">
                            <CloudMoon />
                        </div>
                        <div className="amount text-[24px] font-bold">
                            {studentEntryByTime.evening}
                        </div>
                        <div className="text-time-shift font-noto ">
                            យប់
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TotalEntryCardForm
