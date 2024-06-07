import React from 'react';
import { Timer, CalendarDays } from 'lucide-react';

const DateTimeCard = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('en-GB'); // Adjust the format as needed

    return (
        <div className="date-time-card drop-shadow-xl w-fit hidden lg:flex justify-center items-center px-5 rounded-[10px] h-full bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] text-black space-x-2">
            <Timer />
            <p className='font-bold'>{currentTime}</p>
            <span className='w-[2px] h-[20px] bg-black'></span>
            <p className='font-bold'>{currentDate}</p>
            <CalendarDays />
        </div>
    );
};

export default DateTimeCard;
