import React, { useEffect, useState, useRef } from 'react';
import { useScanResultID } from '../../Context/ScanResultIDContext';
import axios from '../../../api/axios';
import toast, { Toaster } from 'react-hot-toast';

function FormConfirmEntry() {
    const { scanResultID, setScanResultID } = useScanResultID();
    const [stuName, setStuName] = useState('');
    const [major, setMajor] = useState('');
    const [yearStudy, setYearStudy] = useState('');
    const [checkPurpose, setCheckPurpose] = useState('');

    // Create a ref to store all checkbox elements
    const checkboxesRef = useRef([]);

    const handleCheckPurpose = (event) => {
        const { id, checked } = event.target;
        const value = id.replace('_', ' ');

        setCheckPurpose(prevValue => {
            const values = prevValue ? prevValue.split(', ') : [];
            if (checked) {
                if (!values.includes(value)) {
                    values.push(value);
                }
            } else {
                const index = values.indexOf(value);
                if (index > -1) {
                    values.splice(index, 1);
                }
            }
            return values.join(', ');
        });
    };

    const getDataApi = async () => {
        if (scanResultID) {
            try {
                const response = await axios.get("/student/" + scanResultID);
                setStuName(response.data.studentName);
                setMajor(response.data.majorId);
                setYearStudy(response.data.generation);
            } catch (error) {
                console.log("Error fetching student data");
            }
        }
    };

    const handleEntryExit = () => {
        if (scanResultID === 0) {
            toast.error("Please wait untill scan success")
        } else if (checkPurpose === '') {
            toast.error("Please Check Purepose")
        } else {
            handleClearFormData()
        }
        // Additional logic for entry/exit can be added here
    };

    const handleClearFormData = () => {
        toast.success("Student ID " + scanResultID + " Entry Success")
        setStuName('');
        setMajor('');
        setYearStudy('');
        setCheckPurpose('');
        //set ScanResult to 0 to make the component in CemeraScanQR Continue Scan 
        setScanResultID(0)
        // Uncheck all checkboxes
        checkboxesRef.current.forEach(checkbox => {
            checkbox.checked = false;
        });
    };

    useEffect(() => {
        getDataApi();
        checkboxesRef.current.forEach(checkbox => {
            checkbox.disabled = scanResultID === 0;
        });
    }, [scanResultID]);

    return (
        <>
            <div className="flex-1 flex flex-col confirmForm w-full h-fit bg-secondary rounded-[20px] p-5 overflow-auto scrollbar-hide">
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
                <div className="check-purpose text-accent mt-5">
                    <p className='font-bold'>Entry Purpose</p>
                    <div className="container-check-purpose grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-5">
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='Read_Book' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[0] = el} />
                            <label htmlFor="Read_Book" className='label-text text-[#32E2FF]'>Read Book</label>
                        </div>
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='Assignment' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[1] = el} />
                            <label htmlFor="Assignment" className='label-text text-[#32E2FF]'>Assignment</label>
                        </div>
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='Use_PC' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[2] = el} />
                            <label htmlFor="Use_PC" className='label-text text-[#32E2FF]'>Use PC</label>
                        </div>
                        <div className="check-purpose flex items-center space-x-2">
                            <input type="checkbox" id='Other' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[3] = el} />
                            <label htmlFor="Other" className='label-text text-[#32E2FF]'>Other</label>
                        </div>
                    </div>
                </div>
                <div className="flex-1 container-button h-full items-end mt-5 grid grid-cols-2 gap-2">
                    <button className="btn btn-primary" onClick={handleEntryExit}>Entry</button>
                    <button className="btn btn-outline border-blue-400 text-accent" onClick={handleClearFormData}>Cancel</button>
                </div>
                <Toaster position='bottom-center' />
            </div>
        </>
    );
}

export default FormConfirmEntry;
