import React from 'react'
import {Undo2} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DateTimeCard from './DateTimeCard';
function HeadTextForTableData() {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will navigate to the previous URL in the history stack
    };

    return (
        <>
            <div className="flex-1 table-container w-full h-full bg-secondary rounded-[20px] p-5 text-accent">
                <div className="header-text flex justify-between">
                    <p className='font-bold'>Recent Student Entry</p>
                    <div className="container-button-date-time-back flex space-x-3">
                        <DateTimeCard/>
                        <button className="back-button border px-5 rounded-[10px] hover:border-blue-400 transition-colors ease-in-out duration-300 group" onClick={handleBack}>
                            <Undo2 className='text-current group-hover:text-blue-400 transition-colors ease-in-out duration-300' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeadTextForTableData