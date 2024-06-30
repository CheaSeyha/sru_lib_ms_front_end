import React, { useEffect, useState, useRef } from 'react';
import { useScanResultID } from '../../Context/ScanResultIDContext';
import axios from '../../../api/axios';
import toast, { Toaster } from 'react-hot-toast';

function FormConfirmEntry() {
    const { scanResultID, setScanResultID } = useScanResultID();
    const [checkPurpose, setCheckPurpose] = useState('');
    // State Handle For Student Entry And Exit With Defualt Value
    const [stuEntryInfor, setStuEntryInfor] = useState(
        {
            studentId: 0,
            studentName: "",
            gender: "",
            dateOfBirth: "",
            degreeLevel: "",
            majorName: "",
            generation: ""
        }
    );
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

    // Function to fetch student data after scanning a card
    const scanResultData = async () => {
        // Check if scanResultID is truthy (not undefined, null, or false)
        if (scanResultID) {
            try {
                // Display a loading toast while fetching data
                const response = await toast.promise(
                    axios.get("/student/" + scanResultID),
                    {
                        loading: 'Fetching student data...', // Loading message
                        success: (response) => { // Success callback
                            // Update state with fetched student information
                            setStuEntryInfor(response.data);
                            console.log("Student data fetched successfully:", response.data);
                        },
                        error: (error) => { // Error callback
                            console.error("Error fetching student data:", error); // Log error to console
                            toast.error("Error fetching student data. Please try again."); // Display error toast
                        }
                    }
                );
            } catch (error) {
                // Catch any errors that occur during the API call
                console.error("Error fetching student data:", error);
                toast.error("Error fetching student data. Please try again.");
            }
        }
    };

    // Function to handle submission of entry/exit data
    const handleSubmitEntryExit = async () => {
        // Async function to save attendance data
        const saveAttendance = async () => {
            // Prepare payload with data to submit
            const payload = {
                studentId: stuEntryInfor.studentId,
                entryTimes: "08:07:01",
                purpose: checkPurpose,
                date: "2024-06-22"
            };

            console.log("Payload:", payload); // Log the payload before sending

            try {
                // Send POST request to save attendance data
                const response = await axios.post("/att", payload);
                return response.data; // Resolve promise with response data
            } catch (error) {
                throw error; // Throw the error to be caught by the calling function
            }
        };

        // Validation checks before submitting data
        if (scanResultID === 0) {
            toast.error("Please wait until scan success"); // Display error toast if scanResultID is 0
        } else if (checkPurpose === '') {
            toast.error("Please check purpose"); // Display error toast if checkPurpose is empty
        } else {
            try {
                // Use toast.promise to handle submission with loading, success, and error states
                await toast.promise(
                    saveAttendance(),
                    {
                        loading: 'Submitting...', // Display loading message during submission
                        success: (response) => {
                            // Display success toast upon successful submission
                            toast.success(`Student ID ${stuEntryInfor.studentId} Entry Success`);
                            console.log("Data submitted successfully:", response); // Log successful response
                        },
                        error: (error) => {
                            // Error handling based on different error scenarios
                            if (error.response) {
                                const status = error.response.status;
                                if (status === 500) {
                                    toast.error("Server error. Please try again later.");
                                } else {
                                    toast.error(`Error ${status}. Please try again later.`);
                                }
                            } else if (error.request) {
                                toast.error("No response from server. Please check your network connection.");
                            } else {
                                toast.error("An unexpected error occurred. Please try again later.");
                            }
                        }
                    }
                );
                handleClearFormData(); // Clear form data after successful submission
            } catch (error) {
                // Handle any additional error handling or retry logic if needed
                console.error("Error submitting entry/exit data:", error);
                toast.error("Failed to submit data. Please try again later.");
            }
        }
    };

    const handleClearFormData = () => {
        setScanResultID(0)
        setStuEntryInfor(
            {
                studentId: 0,
                studentName: "",
                gender: "",
                dateOfBirth: "",
                degreeLevel: "",
                majorName: "",
                generation: ""
            }
        )
        setCheckPurpose('')
        // Uncheck all checkboxes
        checkboxesRef.current.forEach(checkbox => {
            checkbox.checked = false;
        });
    };

    useEffect(() => {
        scanResultData();
        checkboxesRef.current.forEach(checkbox => {
            checkbox.disabled = scanResultID === 0;
        });
    }, [scanResultID]);

    return (
        <>
            <div className="flex-1 flex flex-col confirmForm w-full h-fit bg-secondary rounded-[20px] p-5 overflow-auto scrollbar-hide">
                <div className="form-data space-y-2 text-accent">
                    <div className="flex-1 headConfirmForm text-accent h-[46px] flex justify-between">
                        <p className='font-bold'>Student ID <span className='text-blue-400'>{stuEntryInfor.studentId === 0 ? "" : stuEntryInfor.studentId}</span></p>
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
                    <button className="btn btn-primary hover:border-white" onClick={handleSubmitEntryExit}>Entry</button>
                    <button className="btn btn-outline border-blue-400 text-accent" onClick={handleClearFormData}>Cancel</button>
                </div>
                <Toaster position='bottom-center' />
            </div>
        </>
    );
}

export default FormConfirmEntry;
