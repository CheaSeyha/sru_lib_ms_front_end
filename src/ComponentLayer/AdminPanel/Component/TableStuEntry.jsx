import React from 'react'
import { UserRoundPlus } from 'lucide-react'
import BtnGredient from './BtnGredient'
export default function TableStuEntry() {
    // Fake Data of student Name entry 
    const EntryTableData =
        [
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: false
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: false
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            },
            {
                stuName: "John Wick",
                mejor: "CS",
                studyYear: 4,
                entryTime: "7:20",
                purpose: "Read book",
                status: true
            }
        ]
    return (
        <>
            <div className="flex flex-col w-full h-full space-y-5 scrollbar-hide">
                <div className="text-table w-full h-[45px] flex justify-between">
                    <p>Student Entry To Day </p>
                    <BtnGredient btnType="Guest Entry" Icon={<UserRoundPlus />} />
                </div>
                <div className="flex-1 w-full h-full overflow-auto scrollbar-hide grid items-end">
                    <table className="table tectav">
                        {/* head */}
                        <thead className='text-accent'>
                            <tr>    
                                <th>NO</th>
                                <th>Student Name</th>
                                <th>Mejor</th>
                                <th>Year</th>
                                <th>Entry Times</th>
                                <th>Purpose</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {EntryTableData.map((entry, index) => (
                                <tr key={index} className='hover:bg-primary cursor-pointer active:bg-primary'>
                                    <th>{index + 1}</th>
                                    <td>{entry.stuName}</td>
                                    <td>{entry.mejor}</td>
                                    <td>{entry.studyYear}</td>
                                    <td>{entry.entryTime}</td>
                                    <td>{entry.purpose}</td>
                                    <td><span className={`${entry.status ? "bg-blue-400 " : "bg-red-400 "}px-2 rounded-lg text-white`}>{entry.status ? "IN" : "OUT"}</span></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}
