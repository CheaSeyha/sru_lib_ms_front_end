import React, { useState } from 'react';
import Modal from '../../../layout/Component/Modal';
import { X } from 'lucide-react';

function BtnGredient({ btnType, Icon }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isStudent, setIsStudent] = useState(true); // State to track if student or guest entry is selected
    const [studentID, setStudentID] = useState('');
    const [guestName, setGuestName] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleRadioChange = (event) => {
        setIsStudent(event.target.value === 'student');
    };

    const handleStudentIDChange = (event) => {
        setStudentID(event.target.value);
    };

    const handleGuestNameChange = (event) => {
        setGuestName(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };

    function getCheckboxValues() {
        const checkboxes = document.querySelectorAll('.checkbox:checked');
        const entryPurpose = {};
        checkboxes.forEach((checkbox) => {
            entryPurpose[checkbox.id] = true;
        });
        return entryPurpose;
    }

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

    const handleEntry = () => {
        const entryPurpose = getCheckboxValues();
        const formValues = getFormValues(isStudent, studentID, guestName, gender, position, entryPurpose);
        console.log(formValues);
    };

    return (
        <>
            <button onClick={handleOpenModal} className="btn rounded-[50px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-300">
                <div className="iconContainer">
                    {Icon}
                </div>
                <p>{btnType}</p>
            </button>
            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <div className="container w-full h-full space-y-5">
                    <div className="header-modal flex items-center justify-between">
                        <div className="radio-container flex space-x-3">
                            <input type="radio" id='studentRadio' name="entryType" value="student" className="radio radio-accent" onChange={handleRadioChange} checked={isStudent} />
                            <label htmlFor="studentRadio">Student</label>
                            <input type="radio" id='guestRadio' name="entryType" value="guest" className="radio radio-accent" onChange={handleRadioChange} checked={!isStudent} />
                            <label htmlFor="guestRadio">Guest Entry</label>
                        </div>
                        <button onClick={handleCloseModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
                            <X />
                        </button>
                    </div>
                    {isStudent ? (
                        <div className="form-entry grid gap-2">
                            <label htmlFor="studentID">Student ID</label>
                            <input type="text" id='studentID' value={studentID} onChange={handleStudentIDChange} placeholder="Student ID" className="input input-bordered w-full bg-base-300" />
                        </div>
                    ) : (
                        <div className="form-entry grid gap-2">
                            <label htmlFor="guestName">Guest Name</label>
                            <input type="text" id="guestName" value={guestName} onChange={handleGuestNameChange} placeholder="Guest Name" className="input input-bordered w-full bg-base-300" />
                            <label htmlFor="gender">Select Gender</label>
                            <select id="gender" value={gender} onChange={handleGenderChange} className="select select-bordered w-full bg-base-300">
                                <option disabled value="">Select Gender</option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                            </select>
                            <label htmlFor="position">Select Position</label>
                            <select id="position" value={position} onChange={handlePositionChange} className="select select-bordered w-full bg-base-300">
                                <option disabled value="">Select Position</option>
                                <option value="teacher">Teacher</option>
                                <option value="normalGuest">Normal Guest</option>
                            </select>
                        </div>
                    )}
                    <div className="check-purpose text-accent mt-5">
                        <p className='font-bold'>Entry Purpose</p>
                        <div className="container-check-purpose grid grid-cols-2 sm:grid-cols-4 gap-5 pt-5">
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
                    <button onClick={handleEntry} className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-300">
                        Entry
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default BtnGredient
