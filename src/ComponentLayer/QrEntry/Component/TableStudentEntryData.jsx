import React from 'react';
import { Undo2 } from 'lucide-react';
import DateTimeCard from './DateTimeCard';
import useTableData from '../../Hook/useTableData';

function TableStudentEntryData({ studentEntryData }) {
    const {
        handleBack,
        filter,
        setFilter,
        currentRecords,
        handlePageChange,
        currentPage,
        totalPages,
        pageButtons,
    } = useTableData(studentEntryData);

    return (
        <div className="hidden sm:flex flex-col table-container w-full space-y-5 h-full bg-secondary rounded-[20px] p-5 text-accent overflow-auto">
            <div className="header-text flex justify-between w-full h-[46px]">
                <p className="font-bold">Recent Student Entry</p>
                <div className="container-button-date-time-back flex space-x-3">
                    {/* Filter Section */}
                    <div className="filter-data flex gap-5 items-center">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="select select-info border-none"
                        >
                            <option value="all">Show All</option>
                            <option value="in">In Only</option>
                            <option value="out">Out Only</option>
                        </select>
                    </div>
                    {/* Show Date Time  */}
                    <DateTimeCard />
                    <button
                        className="back-button px-5 rounded-[10px] border hover:border-blue-400 transition-colors ease-in-out duration-300 group"
                        onClick={handleBack}
                    >
                        <Undo2 className="text-current group-hover:text-blue-400 transition-colors ease-in-out duration-300" />
                    </button>
                </div>
            </div>
            <div className="flex-1 w-full overflow-x-auto scrollbar-hide">
                <div className="min-h-full overflow-y-auto">
                    <div className="relative">
                        <table className="table min-w-full">
                            <thead className="sticky top-0 bg-secondary text-accent">
                                <tr>
                                    <th>#</th>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Major Name</th>
                                    <th>Entry Times</th>
                                    <th>Exiting Times</th>
                                    <th>Entry Purpose</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* rows */}
                                {currentRecords.map((e, index) => (
                                    <tr key={index} className="hover:bg-primary">
                                        <th>{(currentPage - 1) * 16 + index + 1}</th>
                                        <td>{e.studentId}</td>
                                        <td>{e.studentName}</td>
                                        <td>{e.major}</td>
                                        <td>{e.entryTimes}</td>
                                        <td>{e.exitingTimes === null ? 'N/A' : e.exitingTimes}</td>
                                        <td>{e.purpose}</td>
                                        <td className="text-white">
                                            <span className={`w-fit h-fit px-3 rounded-lg ${e.exitingTimes === null ? 'bg-blue-600' : 'bg-red-600'}`}>
                                                {e.exitingTimes === null ? 'IN' : 'OUT'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="join self-end">
                    <button
                        className="join-item btn btn-sm text-accent"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {pageButtons.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`join-item btn btn-sm text-accent ${currentPage === pageNumber ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        className="join-item btn btn-sm text-accent"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
}

export default TableStudentEntryData;
