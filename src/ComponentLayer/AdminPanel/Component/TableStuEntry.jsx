import React, { useEffect, useState } from 'react';
import { UserRoundPlus, X } from 'lucide-react';
import BtnGredient from './BtnGredient';
import Modal from '../../../layout/Component/Modal';
import axios from '../../../api/axios';
import useScanEntry from '../../Hook/useScanEntry';
import toast, { Toaster } from 'react-hot-toast';
import { Search, ShieldAlert, ShieldCheck } from 'lucide-react';
import useCheckStudentEntryExit from '../../Hook/useCheckStudentEntryExit'



export default function TableStuEntry({ getCardDataApi,refreshCardData }) {
    // State variables
    const [stuEntryInfor, setstuEntryInfor] = useState({
        studentName: '',
        majorName: '',
        generation: ''
    })//get student entry after search
    const [disbleEntryBtn, setDisbleEntryBTN] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkRadio, setCheckRadio] = useState(true);
    const [studentID, setStudentID] = useState('');
    const [guestName, setGuestName] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [studentIDError, setStudentIDError] = useState(false);
    const [studentIDErrorMsx, setStudentIDErrorMsx] = useState("Student ID is required");
    const [studentIDErrorColor, setStudentIDErrorColor] = useState(true);//Defualt color is red and if false show green
    const [guestNameError, setGuestNameError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [positionError, setPositionError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [areDisabled, setAreDisabled] = useState(true);//set disbale enable checkbox for check purepose
    const [timeoutId, setTimeoutId] = useState(null);

    // Toggle modal visibility
    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => {
        clearForm();
        setCheckRadio(true)
        setIsModalVisible(false);

    };


    // Handle radio button changes
    const handleRadioChange = (event) => {
        setCheckRadio(event.target.value === 'student')
        if (checkRadio) {
            setAreDisabled(false)
            setDisbleEntryBTN(false)
            console.log("enable")
        } else {
            setDisbleEntryBTN(true)
            clearForm()
        }
    };
    //useHook
    const { studetnEntryData, fetchRecentEntryData } = useScanEntry();
    const { handleCheckScanEntryExit, handleSaveEntry, handleSearchStudent } = useCheckStudentEntryExit()
    const { checkPurpose, setCheckPurpose, } = useScanEntry()

    // Handle input changes
    const handleStudentIDChange = (event) => setStudentID(event.target.value);
    const handleGuestNameChange = (event) => setGuestName(event.target.value);
    const handleGenderChange = (event) => setGender(event.target.value);
    const handlePositionChange = (event) => setPosition(event.target.value);

    // Function to get checked checkboxes
    function getCheckboxValues() {
        const checkboxes = document.querySelectorAll('.checkbox:checked');
        const entryPurpose = {};
        checkboxes.forEach((checkbox) => {
            entryPurpose[checkbox.id] = true;
        });
        return entryPurpose;
    }

    // Function to get form values based on entry type
    function getFormValues(checkRadio, studentID, guestName, gender, position, entryPurpose) {
        if (checkRadio) {
            return {
                studentID,
                entryPurpose
            };
        } else {
            return {
                guestName,
                gender,
                position,
                entryPurpose
            };
        }
    }
    const clearAllCheckboxes = () => {
        const checkboxes = document.querySelectorAll('.container-check-purpose input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };
    //Clear Form Modal 
    const clearForm = () => {
        setDisbleEntryBTN(true)
        setGuestNameError(false);
        setGenderError(false);
        setPositionError(false);
        setStudentIDError(false)
        setStudentIDErrorColor(true)
        setStudentIDErrorMsx("Student ID is required")
        setStudentID('');
        setGuestName('');
        setGender('');
        setCheckPurpose("");
        setPosition('');
        setAreDisabled(true); // Disable checkboxes
        setFormErrorMessage("")
        setstuEntryInfor({
            studentName: '',
            majorName: '',
            generation: ''
        })

        clearAllCheckboxes()
    };

    const handleCheckPurpose = (event) => {
        const { id, checked } = event.target;
        // Convert id to Title Case with a space between words
        const value = id.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());

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

    const startTimeout = () => {
        clearTimeout(timeoutId); // Clear previous timeout if any
        const id = setTimeout(() => {
            clearForm()
        }, 3000); // 1 minute timeout
        setTimeoutId(id); // Save timeout ID to state
    };

    let currentIntervalId = null;
    let currentTimeoutId = null;

    function showMessageErrorSuccess(studentID, message, countdownDuration = 5) {
        // Clear existing countdown if any
        if (currentIntervalId) {
            clearInterval(currentIntervalId);
        }
        if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
        }

        let remainingTime = countdownDuration;

        // Function to update the countdown message
        const updateCountdownMessage = () => {
            setStudentIDErrorMsx(`${message} ${remainingTime}`);
        };

        // Initial setup
        setStudentIDErrorColor(false); // Show green on text error
        setStudentID(""); // Clear old student ID after update
        fetchRecentEntryData();

        // Start the countdown
        updateCountdownMessage(); // Initial call to set the message
        currentIntervalId = setInterval(() => {
            remainingTime -= 1;
            if (remainingTime > 0) {
                updateCountdownMessage();
            }
        }, 1000);

        // Set Student ID error to false after countdown duration
        currentTimeoutId = setTimeout(() => {
            clearInterval(currentIntervalId); // Stop the interval
            setStudentIDError(false); // Show error
            setStudentIDErrorColor(true)
            setStudentIDErrorMsx(''); // Clear the message after countdown
            clearForm()
            currentIntervalId = null;
            currentTimeoutId = null;
        }, countdownDuration * 1000); // Convert seconds to milliseconds
    }

    // Validate and check student entry by ID
    const handleEntry = async () => {
        if (!checkRadio) {
            const checks = [
                { condition: guestName.trim() === '', action: () => setGuestNameError(true), reset: () => setGuestNameError(false) },
                { condition: gender.trim() === '', action: () => setGenderError(true), reset: () => setGenderError(false) },
                { condition: position.trim() === '', action: () => setPositionError(true), reset: () => setPositionError(false) },
                {
                    condition: checkPurpose === '', action: () => {
                        setFormErrorMessage("Please Check Purpose Before Entry");
                    }, reset: () => setFormErrorMessage("")
                }
            ];

            let hasError = false;
            checks.forEach(check => {
                if (check.condition) {
                    check.action();
                    hasError = true;
                } else {
                    check.reset();
                }
            });

            if (!hasError) {
                setGuestNameError(false);
                setGenderError(false);
                setPositionError(false);
                setFormErrorMessage("");
            }
        } else {
            if (checkPurpose === '') {
                toast.error("Please Check Entry Purpose")
            } else {
                const saveEntry = await handleSaveEntry(studentID, checkPurpose)
                if (saveEntry.status === 'error') {
                    toast.error(saveEntry.message)
                } else {
                    refreshCardData()
                    fetchRecentEntryData()//get new table data
                    clearForm()
                    toast.success(saveEntry.message)
                }
            }

        }

    };

    const handelSearchStudent = async () => {
        if (studentID !== "") {
            const searchStu = await handleSearchStudent(studentID); // search student
            if (searchStu.status === "not found") { // If student not found
                setStudentIDErrorMsx(`Student ID ${studentID} Not Found, Try Different ID...`);
                setStudentIDErrorColor(true)
                setStudentID("");
            } else if (searchStu.status === "success") { // if student found
                const checkEntryExit = await handleCheckScanEntryExit(studentID);
                if (checkEntryExit.status === "entry") { // Show Student info and wait for user check purpose
                    setstuEntryInfor(searchStu.data); // get info of student from searchStu
                    console.log(stuEntryInfor.data);
                    setStudentIDErrorMsx(`Student ID ${studentID} Found, Check Purpose To Entry`);
                    setStudentIDErrorColor(false); // show green on text error
                    setDisbleEntryBTN(false); // Enable Button Entry
                    setAreDisabled(false); // enable check box
                } else { // Update Student Exit
                    showMessageErrorSuccess(studentID, `Student ID ${studentID} Exited Success.`, 5);
                }
            } else {
                setStudentIDErrorMsx(searchStu.message);
                setStudentID("");
            }
            setStudentIDError(true); // show Error 
        } else {
            setStudentIDError(true);
        }
    };
    return (
        <>
            <div className="flex flex-col w-full font-noto  h-full space-y-5 scrollbar-hide">
                <div className="text-table w-full h-[45px] flex justify-between">
                    <p>អ្នកចូលក្នុងថ្ងៃនេះ</p>
                    <BtnGredient onClick={handleOpenModal}>
                        <UserRoundPlus />
                        <p>Add Entry</p>
                    </BtnGredient>
                </div>
                <div className="flex-1 w-full h-full overflow-auto 2xl:scrollbar-hide grid items-start">
                    <table className="table tectav overflow-auto">
                        {/* Table Head */}
                        <thead className='text-accent sticky top-0 bg-secondary'>
                            <tr>
                                <th>NO</th>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Entry Times</th>
                                <th>Exiting Times</th>
                                <th>Purpose</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Rows */}
                            {studetnEntryData.map((entry, index) => (
                                <tr key={index} className='hover:bg-primary cursor-pointer active:bg-primary'>
                                    <th>{index + 1}</th>
                                    <td>{entry.studentId}</td>
                                    <td>{entry.studentName}</td>
                                    <td>{entry.entryTimes}</td>
                                    <td>{entry.exitingTimes === null ? "N/A" : entry.exitingTimes}</td>
                                    <td>{entry.purpose}</td>
                                    <td className='text-white'>
                                        <span className={`w-fit h-fit px-3 rounded-lg ${entry.exitingTimes === null ? 'bg-blue-600' : 'bg-red-600'}`}>
                                            {entry.exitingTimes === null ? "IN" : "OUT"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Toaster
                    position="bottom-center"
                />
            </div>

            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <div className="container w-full h-full space-y-5">
                    <div className="header-modal flex items-center justify-between">
                        <div className="radio-container flex space-x-3">
                            <input
                                type="radio"
                                id='studentRadio'
                                name="entryType"
                                value="student"
                                className="radio radio-accent"
                                onChange={handleRadioChange}
                                checked={checkRadio}
                            />
                            <label htmlFor="studentRadio">Student</label>
                            <input
                                type="radio"
                                id='guestRadio'
                                name="entryType"
                                value="guest"
                                className="radio radio-accent"
                                onChange={handleRadioChange}
                                checked={!checkRadio}
                            />
                            <label htmlFor="guestRadio">Guest Entry</label>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                        >
                            <X />
                        </button>
                    </div>
                    {checkRadio ? (
                        <div className="form-entry grid gap-2">
                            <label htmlFor="studentID">Student ID*</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    id='studentID'
                                    value={studentID}
                                    onChange={handleStudentIDChange}
                                    placeholder="Student ID"
                                    className={`input input-bordered w-full bg-base-300  ${studentIDError ? (studentIDErrorColor ? "border-red-500" : "border-green-400") : ''}`}
                                />
                                <button onClick={handelSearchStudent} className="btn text-accent"><Search /></button>
                            </div>
                            {studentIDError && (
                                <p className={`text-sm mt-1 flex items-center ${studentIDErrorColor ? "text-red-500 " : "text-green-400"}`}>{studentIDErrorColor ? <ShieldAlert /> : <ShieldCheck />}{studentIDErrorMsx} </p>
                            )}
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
                                <label htmlFor="majorName">Major Name</label>
                                <input
                                    readOnly={true}
                                    type="text"
                                    value={stuEntryInfor.majorName}
                                    id='majorName'
                                    placeholder="Major Name"
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
                    ) : (
                        <div className="form-entry grid gap-2">
                            <label htmlFor="guestName">Guest Name*</label>
                            <input
                                type="text"
                                id="guestName"
                                value={guestName}
                                onChange={handleGuestNameChange}
                                placeholder="Guest Name"
                                className={`input input-bordered w-full bg-base-300 ${guestNameError ? 'border-red-500' : ''}`}
                            />
                            {guestNameError && (
                                <p className="text-red-500 text-sm mt-1">Guest Name is required*</p>
                            )}

                            <label htmlFor="gender">Select Gender*</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={handleGenderChange}
                                className={`select select-bordered w-full bg-base-300 ${genderError ? 'border-red-500' : ''}`}
                            >
                                <option disabled value="">Select Gender</option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                            </select>
                            {genderError && (
                                <p className="text-red-500 text-sm mt-1">Gender is required</p>
                            )}

                            <label htmlFor="position">Select Position*</label>
                            <select
                                id="position"
                                value={position}
                                onChange={handlePositionChange}
                                className={`select select-bordered w-full bg-base-300 ${positionError ? 'border-red-500' : ''}`}
                            >
                                <option disabled value="">Select Position</option>
                                <option value="teacher">Teacher</option>
                                <option value="normalGuest">Normal Guest</option>
                            </select>
                            {positionError && (
                                <p className="text-red-500 text-sm mt-1">Position is required</p>
                            )}
                        </div>
                    )}
                    <div className="check-purpose text-accent mt-5">
                        <p className='font-bold'>Entry Purpose</p>
                        <div className="container-check-purpose grid grid-cols-2 sm:grid-cols-4 gap-5 pt-5">
                            <div className="check-purpose flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id='Reading'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    disabled={areDisabled}
                                    onChange={handleCheckPurpose}
                                />
                                <label htmlFor="Reading" className='label-text text-[#32E2FF]'>Read Book</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id='Assignment'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    disabled={areDisabled}
                                    onChange={handleCheckPurpose}
                                />
                                <label htmlFor="Assignment" className='label-text text-[#32E2FF]'>Assignment</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id='Use_PC'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    disabled={areDisabled}
                                    onChange={handleCheckPurpose}
                                />
                                <label htmlFor="Use_PC" className='label-text text-[#32E2FF]'>Use PC</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id='Other'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    disabled={areDisabled}
                                    onChange={handleCheckPurpose}
                                />
                                <label htmlFor="Other" className='label-text text-[#32E2FF]'>Other</label>
                            </div>
                        </div>
                    </div>
                    {formErrorMessage && (
                        <p className="text-red-500 text-sm mt-1">{formErrorMessage}</p>
                    )}
                    <button
                        disabled={disbleEntryBtn}
                        onClick={handleEntry}
                        className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-300"
                    >
                        Entry
                    </button>
                </div>
            </Modal>
        </>
    );
}
