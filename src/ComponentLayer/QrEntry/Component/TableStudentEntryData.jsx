import React from 'react'
import { Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DateTimeCard from './DateTimeCard';
function HeadTextForTableData() {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will navigate to the previous URL in the history stack
    };


    //fake data 
    const fakeDataStudent = [
        {
            id: '200435',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: false,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: false,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: false,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: false,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: false,
        },
        {
            id: '200246',
            stuName: 'John Wicks',
            gender: 'M',
            mejor: 'CS',
            studyYear: '04',
            entryTimes: '07:20 AM',
            exitTimes: 'N/A',
            activity: 'Read Book',
            status: true,
        }
    ];
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
                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Gender</th>
                                    <th>Major</th>
                                    <th>Study Year</th>
                                    <th>Entry Times</th>
                                    <th>Exit Times</th>
                                    <th>Purpose</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {fakeDataStudent.map((e, index) => (
                                    <tr key={index} className="hover:bg-primary">
                                        <th>{index}</th>
                                        <th>{e.id}</th>
                                        <td>{e.stuName}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.major}</td>
                                        <td>{e.studyYear}</td>
                                        <td>{e.entryTimes}</td>
                                        <td>{e.exitTimes}</td>
                                        <td>{e.activity}</td>
                                        <td className='text-white'>
                                            <span className={`w-fit h-fit px-3 rounded-lg ${e.status ? 'bg-blue-600' : 'bg-red-600'}`}>
                                                {e.status ? "IN" : "OUT"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HeadTextForTableData