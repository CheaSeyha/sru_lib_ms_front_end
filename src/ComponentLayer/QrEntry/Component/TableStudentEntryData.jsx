import React from 'react'
import { Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DateTimeCard from './DateTimeCard';
function HeadTextForTableData({ studentEntryData }) {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will navigate to the previous URL in the history stack
    };

    return (
        <>
            <div className="hidden sm:flex flex-col table-container w-full space-y-5 h-full bg-secondary rounded-[20px] p-5 text-accent overflow-auto">
                <div className="header-text flex justify-between w-full h-[46px]">
                    <p className="font-bold">Recent Student Entry</p>
                    <div className="container-button-date-time-back flex space-x-3">
                        <DateTimeCard />
                        <button className="back-button px-5 rounded-[10px] border hover:border-blue-400 transition-colors ease-in-out duration-300 group" onClick={handleBack}>
                            <Undo2 className="text-current group-hover:text-blue-400 transition-colors ease-in-out duration-300" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full overflow-auto">
                    <div className="min-h-full overflow-auto">
                        <table className="table min-w-full">
                            {/* head */}
                            <thead className='text-accent'>
                                <tr>
                                    <th>#</th>
                                    <th>Studetn ID</th>
                                    <th>Studetn Name</th>
                                    <th>Mejor Name</th>
                                    <th>Entry Times</th>
                                    <th>Exiting Times</th>
                                    <th>Entry Purpose</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {studentEntryData.map((e, index) => (
                                    <tr key={index} className="hover:bg-primary">
                                        <th>{index + 1}</th>
                                        <td>{e.studentId}</td>
                                        <td>{e.studentName}</td>
                                        <td>{e.major}</td>
                                        <td>{e.entryTimes}</td>
                                        <td>{e.exitingTimes === null ? "N/A" : e.exitingTimes}</td>
                                        <td>{e.purpose}</td>
                                        <td className='text-white'>
                                            <span className={`w-fit h-fit px-3 rounded-lg ${e.exitingTimes === null ? 'bg-blue-600' : 'bg-red-600'}`}>
                                                {e.exitingTimes === null ? "IN" : "OUT"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="join self-end">
                    <button className="join-item btn btn-md">«</button>
                    <button className="join-item btn btn-md">1</button>
                    <button className="join-item btn btn-md">»</button>
                </div>
            </div>

        </>
    )
}

export default HeadTextForTableData