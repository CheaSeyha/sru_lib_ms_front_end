import React, { useEffect, useState } from 'react';
import { useScanResultID } from '../../Context/ScanResultIDContext';
import axios from '../../../api/axios';

function FormConfirmEntry() {
    // Call data from context to show Id of student after scan
    const { scanResultID } = useScanResultID();
    const [stuName, setStuName] = useState('');
    const [major, setMajor] = useState('');
    const [yearStudy, setYearStudy] = useState('');

    const getDataApi = async () => {
        if (scanResultID) {
            try {
                const response = await axios.get("/student/" + scanResultID);
                setStuName(response.data.studentName);
                setMajor(response.data.majorId);
                setYearStudy(response.data.generation);
            } catch (error) {
                console.log("Error");
            }
        }
    };

    useEffect(() => {
        getDataApi();
    }, [scanResultID]);

    return (
        <>
            <div className="flex-1 flex flex-col confirmForm w-full h-fit bg-secondary rounded-[20px] p-5 overflow-auto scrollbar-hide">
                {/* form data of student  */}
                <div className="form-data space-y-2 text-accent">
                    <div className="flex-1 headConfirmForm text-accent h-[46px] flex justify-between">
                        <p className='font-bold'>Student ID <span className='text-blue-400'>{scanResultID || ""}</span></p>
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="studentName">Student Name</label>
                        <input
                            readOnly={true}
                            type="text"
                            value={stuName}
                            id='studentName'
                            placeholder="Student Name"
                            className="input input-bordered bg-primary w-full"
                        />
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="major">Major</label>
                        <input
                            readOnly={true}
                            type="text"
                            value={major}
                            id='major'
                            placeholder="Major"
                            className="input input-bordered bg-primary w-full"
                        />
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="yearStudy">Generation</label>
                        <input
                            readOnly={true}
                            type="text"
                            value={yearStudy}
                            id='yearStudy'
                            placeholder="Generation"
                            className="input input-bordered bg-primary w-full"
                        />
                    </div>
                </div>
                {/* form data of student  */}
                {/* check purpose to entry form */}
                <div className="check-purpose text-accent mt-5">
                    <p className='font-bold'>Entry Purpose</p>
                    <div className="container-check-purpose grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-5">
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='read_book' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" />
                            <label htmlFor="read_book" className='label-text text-[#32E2FF]'>Read Book</label>
                        </div>
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='assignment' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" />
                            <label htmlFor="assignment" className='label-text text-[#32E2FF]'>Assignment</label>
                        </div>
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='usePC' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" />
                            <label htmlFor="usePC" className='label-text text-[#32E2FF]'>Use PC</label>
                        </div>
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='other' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" />
                            <label htmlFor="other" className='label-text text-[#32E2FF]'>Other</label>
                        </div>
                    </div>
                </div>
                {/* check purpose to entry form */}
                {/* confirm button */}
                <div className="flex-1 container-button h-full items-end mt-5 grid grid-cols-2 gap-2">
                    <button className="btn btn-primary">Entry</button>
                    <button className="btn btn-outline border-blue-400 text-accent">Cancel</button>
                </div>
                {/* confirm button */}
            </div>
        </>
    );
}

export default FormConfirmEntry;
