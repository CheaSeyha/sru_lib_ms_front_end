import React, { useState } from 'react';
import { UserRoundPlus, X } from 'lucide-react';
import BtnGredient from './BtnGredient';
import Modal from '../../../layout/Component/Modal';
import axios from '../../../api/axios';
import useScanEntry from '../../Hook/useScanEntry';
import toast from 'react-hot-toast';

export default function TableStuEntry() {
    // State variables
    const [checkStuEntry, setCheckStuEntry] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isStudent, setIsStudent] = useState(true);
    const [studentID, setStudentID] = useState('');
    const [guestName, setGuestName] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [studentIDError, setStudentIDError] = useState(false);
    const [guestNameError, setGuestNameError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [positionError, setPositionError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState('');

    // Toggle modal visibility
    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);

    // Handle radio button changes
    const handleRadioChange = (event) => setIsStudent(event.target.value === 'student');

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
    function getFormValues(isStudent, studentID, guestName, gender, position, entryPurpose) {
        if (isStudent) {
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

    // Validate and check student entry by ID
    const checkStuEntryByID = async () => {
        let hasError = false;

        // Reset errors
        setStudentIDError(false);
        setGuestNameError(false);
        setGenderError(false);
        setPositionError(false);
        setFormErrorMessage('');

        // Validate fields
        if (isStudent && studentID.trim() === '') {
            setStudentIDError(true);
            hasError = true;
        }
        if (!isStudent) {
            if (guestName.trim() === '') {
                setGuestNameError(true);
                hasError = true;
            }
            if (gender.trim() === '') {
                setGenderError(true);
                hasError = true;
            }
            if (position.trim() === '') {
                setPositionError(true);
                hasError = true;
            }
        }

        if (hasError) return; // Exit if validation fails

        try {
            const response = await axios.get(`/student/${studentID}`);
            if (response.data) {
                console.log(response.data)
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
            setFormErrorMessage("Failed to fetch student data. Please check the student ID.");
        }
    };

    const { studetnEntryData } = useScanEntry();

    return (
        <>
            <div className="flex flex-col w-full h-full space-y-5 scrollbar-hide">
                <div className="text-table w-full h-[45px] flex justify-between">
                    <p>Student Entry Today</p>
                    <BtnGredient onClick={handleOpenModal}>
                        <UserRoundPlus />
                        <p>Guest Entry</p>
                    </BtnGredient>
                </div>
                <div className="flex-1 w-full h-full overflow-auto 2xl:scrollbar-hide grid items-start">
                    <table className="table tectav overflow-auto">
                        {/* Table Head */}
                        <thead className='text-accent'>
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
                                checked={isStudent}
                            />
                            <label htmlFor="studentRadio">Student</label>
                            <input
                                type="radio"
                                id='guestRadio'
                                name="entryType"
                                value="guest"
                                className="radio radio-accent"
                                onChange={handleRadioChange}
                                checked={!isStudent}
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
                    {isStudent ? (
                        <div className="form-entry grid gap-2">
                            <label htmlFor="studentID">Student ID</label>
                            <input
                                type="text"
                                id='studentID'
                                value={studentID}
                                onChange={handleStudentIDChange}
                                placeholder="Student ID"
                                className={`input input-bordered w-full bg-base-300 ${studentIDError ? 'border-red-500' : ''}`}
                            />
                            {studentIDError && (
                                <p className="text-red-500 text-sm mt-1">Student ID is required</p>
                            )}
                        </div>
                    ) : (
                        <div className="form-entry grid gap-2">
                            <label htmlFor="guestName">Guest Name</label>
                            <input
                                type="text"
                                id="guestName"
                                value={guestName}
                                onChange={handleGuestNameChange}
                                placeholder="Guest Name"
                                className={`input input-bordered w-full bg-base-300 ${guestNameError ? 'border-red-500' : ''}`}
                            />
                            {guestNameError && (
                                <p className="text-red-500 text-sm mt-1">Guest Name is required</p>
                            )}

                            <label htmlFor="gender">Select Gender</label>
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

                            <label htmlFor="position">Select Position</label>
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
                                    id='read_book'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                />
                                <label htmlFor="read_book" className='label-text text-[#32E2FF]'>Read Book</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id='assignment'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                />
                                <label htmlFor="assignment" className='label-text text-[#32E2FF]'>Assignment</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id='usePC'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                />
                                <label htmlFor="usePC" className='label-text text-[#32E2FF]'>Use PC</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id='other'
                                    className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                />
                                <label htmlFor="other" className='label-text text-[#32E2FF]'>Other</label>
                            </div>
                        </div>
                    </div>
                    {formErrorMessage && (
                        <p className="text-red-500 text-sm mt-1">{formErrorMessage}</p>
                    )}
                    <button
                        onClick={checkStuEntryByID}
                        className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-300"
                    >
                        {checkStuEntry ? "Entry" : "Check"}
                    </button>
                </div>
            </Modal>
        </>
    );
}
