import React, { useEffect, useState, useRef } from 'react';
import { useScanResultID } from '../../Context/ScanResultIDContext';
import axios from '../../../api/axios';
import toast, { Toaster } from 'react-hot-toast';

function FormConfirmEntry({ checkPurpose, setCheckPurpose, disCheckPur, stuEntryInfor, handleClearFormData, handleSaveEntry }) {
    const { scanResultID, setScanResultID } = useScanResultID();
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

    // // Function to handle submission of entry/exit data
    // const handleSubmitEntryExit = async () => {
    //     // Async function to save attendance data
    //     // Function to handle submission of entry/exit data
    //     const saveAttendance = async () => {
    //         try {
    //             // Send POST request to save attendance data
    //             const response = await axios.post('/entry', null, {
    //                 params: {
    //                     studentId: Number(stuEntryInfor.studentId),
    //                     purpose: checkPurpose
    //                 }
    //             });
    //             return response.data; // Resolve promise with response data
    //         } catch (error) {
    //             throw error; // Throw the error to be caught by the calling function
    //         }
    //     };

    //     // Validation checks before submitting data
    //     if (scanResultID === 0) {
    //         toast.error("Please wait until scan success"); // Display error toast if scanResultID is 0
    //     } else if (checkPurpose === '') {
    //         toast.error("Please check purpose"); // Display error toast if checkPurpose is empty
    //     } else {
    //         try {
    //             // Use toast.promise to handle submission with loading, success, and error states
    //             await toast.promise(
    //                 saveAttendance(),
    //                 {
    //                     loading: 'Submitting...', // Display loading message during submission
    //                     success: (response) => {
    //                         // Display success toast upon successful submission
    //                         toast.success(`Student ID ${stuEntryInfor.studentId} Entry Success`);
    //                         console.log("Data submitted successfully:", response); // Log successful response
    //                     },
    //                     error: (error) => {
    //                         // Error handling based on different error scenarios
    //                         if (error.response) {
    //                             const status = error.response.status;
    //                             if (status === 500) {
    //                                 toast.error("Server error. Please try again later.");
    //                             } else {
    //                                 toast.error(`Error ${status}. Please try again later.`);
    //                             }
    //                         } else if (error.request) {
    //                             toast.error("No response from server. Please check your network connection.");
    //                         } else {
    //                             toast.error("An unexpected error occurred. Please try again later.");
    //                         }
    //                     }
    //                 }
    //             );
    //             handleClearFormData(); // Clear form data after successful submission
    //         } catch (error) {
    //             // Handle any additional error handling or retry logic if needed
    //             console.error("Error submitting entry/exit data:", error);
    //             toast.error("Failed to submit data. Please try again later.");
    //         }
    //     }
    // };

    useEffect(() => {//Disble enale Check Purpose
        checkboxesRef.current.forEach(checkbox => {
            checkbox.disabled = disCheckPur;
            if (checkbox) {
                checkbox.checked = false;
            }
        });
    }, [disCheckPur]);
    return (
        <>
            <div className="flex-1 flex flex-col confirmForm w-full h-fit bg-secondary rounded-[20px] p-5 overflow-auto scrollbar-hide">
                <div className="form-data space-y-2 text-accent">
                    <div className="flex-1 headConfirmForm text-accent h-[46px] flex justify-between">
                        <p className='font-bold'>Student ID <span className='text-blue-400'>{stuEntryInfor.studentId === 0 ? "N/A" : stuEntryInfor.studentId}</span></p>
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="studentName">Student Name</label>
                        <input
                            readOnly={true}
                            type="text"
                            value={stuEntryInfor.studentName}
                            id='studentName'
                            placeholder="Student Name"
                            className="input input-bordered bg-primary w-full"
                        />
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="majorName">Mejor Name</label>
                        <input
                            readOnly={true}
                            type="text"
                            value={stuEntryInfor.majorName}
                            id='majorName'
                            placeholder="Mejor Name"
                            className="input input-bordered bg-primary w-full"
                        />
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="yearStudy">Generation</label>
                        <input
                            readOnly={true}
                            type="text"
                            value={stuEntryInfor.generation}
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
                    <button className="btn btn-primary hover:border-white" onClick={handleSaveEntry} >Entry</button>
                    <button className="btn btn-outline border-blue-400 text-accent" onClick={handleClearFormData}>Cancel</button>
                </div>
                <Toaster position='bottom-center' />
            </div>
        </>
    );
}

export default FormConfirmEntry;
