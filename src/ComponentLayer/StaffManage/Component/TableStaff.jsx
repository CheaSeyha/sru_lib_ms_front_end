import React, { useState } from 'react'
import BtnGredient from '../../../layout/Component/BtnGredient'
import { UserPlus } from 'lucide-react'
import { UserRoundPlus, X, Save } from 'lucide-react';
import Modal from '../../../layout/Component/Modal'

function TableStaff() {
    // Function to handle the "Select All" checkbox End
    const [searchStaff, setSearchStaff] = useState("")
    const [clickEvenModal, setClickEvenShowModal] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)
    //Staff Data
    const StaffData = [
        {
            staffID: 300134,
            staffName: "សាស្ត្រាចារ្យជំនួយ ប៉ែន ឌីណា",
            gender: "ប្រុស",
            position: "មន្ត្រីទទួលបន្ទុក",
            degreeLevel: "បរិញ្ញាប័ត្រជាន់ខ្ពស់",
            major: "១. វិទ្យាសាស្ត្រនយោបាយ ២.វិទ្យាសាស្ត្រអប់រំ",
            studyYear: "",
            shiftWork: "ពេញម៉ោង",
        },
        {
            staffID: 200155,
            staffName: "ដេ​ម៉ូ ដាតា",
            gender: "ប្រុស",
            position: "និស្សិតហាត់ការ",
            degreeLevel: "បរិញ្ញាប័ត្រ",
            major: "វិទ្យាសាស្ត្រកុំព្យូទ័រ",
            studyYear: 3,
            shiftWork: "ព្រឹក-រសៀល",
        },
        ,
        {
            staffID: 200153,
            staffName: "សំ​​ សួន",
            gender: "ប្រុស",
            position: "និស្សិតហាត់ការ",
            degreeLevel: "បរិញ្ញាប័ត្រ",
            major: "វិទ្យាសាស្ត្រកុំព្យូទ័រ",
            studyYear: 3,
            shiftWork: "ព្រឹក-រសៀល",
        }
    ]
    const [filteredStaff, setFilteredStaff] = useState(StaffData);



    // Toggle modal visibility
    const handleOpenModal = (clickEven) => {
        setIsModalVisible(true);
        setClickEvenShowModal(clickEven)
    }
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        const form = e.target;

        // Check if the form is valid
        if (form.checkValidity()) {
            // Proceed with form submission or any action
            alert('Form submitted successfully!');
        } else {
            // Display custom error messages if needed
            alert('Please fill out the form correctly.');
        }
    }


    // Function to handle the "Select All" checkbox
    const [selectedStaffIDs, setSelectedStaffIDs] = useState([]);

    // Function to handle the "Select All" checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // If checked, select all staff IDs
            const allStaffIDs = StaffData.map(data => data.staffID);
            setSelectedStaffIDs(allStaffIDs);
        } else {
            // If unchecked, clear the selection
            setSelectedStaffIDs([]);
        }
    };

    // Function to handle individual row checkbox
    const handleSelectSingle = (staffID) => (e) => {
        if (e.target.checked) {
            // Add the staff ID to the selected list
            setSelectedStaffIDs(prevSelected => [...prevSelected, staffID]);
        } else {
            // Remove the staff ID from the selected list
            setSelectedStaffIDs(prevSelected => prevSelected.filter(id => id !== staffID));
        }
    };

    //Handle Search Input 
    const handleSearchStaff = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchStaff(query);

        const filteredData = StaffData.filter((staff) =>
            staff.staffName.toLowerCase().includes(query) ||  // Search by name
            staff.staffID.toString().includes(query)          // Search by ID
        );

        setFilteredStaff(filteredData);
    };

    //Handle Search Input End

    return (
        <>
            <div className='w-full h-full bg-secondary rounded-[20px] p-5 font-noto space-y-5 '>
                <div className="header flex  justify-between">
                    <p>នាមសមាសភាពមន្ត្រីកំពុងបម្រើការងារនៅក្នុងបណ្ណាល័យ </p>
                    <div className="button-container flex flex-col md:flex-row gap-2">
                        <BtnGredient onClick={() => handleOpenModal("បញ្ចូលបុគ្គលិកថ្មី")}>
                            <UserPlus />
                            <p className='hidden md:block'>បញ្ចូលបុគ្គលិក</p>
                        </BtnGredient>
                        <label className="input input-bordered w-[190px] md:w-full flex items-center gap-2">
                            <input
                                id='searchStaff'
                                type="text"
                                className="w-full"
                                placeholder="ស្វែងរក"
                                onChange={handleSearchStaff}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-8 w-8 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                </div>

                <div className="table-container w-full overflow-auto">
                    <table className="table">
                        <thead>
                            <tr className='text-accent text-[15px]'>
                                <td>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <input
                                                id='checkkAll'
                                                type="checkbox"
                                                className="checkbox checkbox-accent"
                                                checked={selectedStaffIDs.length === StaffData.length}
                                                onChange={handleSelectAll}
                                            />
                                        </label>
                                    </div>
                                </td>
                                <th>អត្តលេខ</th>
                                <th>នាម គោត្តនាម</th>
                                <th>ភេទ</th>
                                <th>តួនាទី</th>
                                <th>កម្រិតសិក្សា</th>
                                <th>ជំនាញ</th>
                                <th>ឆ្នាំទី</th>
                                <th>វេនធ្នើការ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.map((data) => (
                                <tr key={data.staffID} className='text-[15px] hover:bg-primary cursor-pointer active:bg-primary'>
                                    <td>
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <input
                                                    id={data.staffID}
                                                    type="checkbox"
                                                    className="checkbox checkbox-accent"
                                                    checked={selectedStaffIDs.includes(data.staffID)}
                                                    onChange={handleSelectSingle(data.staffID)}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                    <td>{data.staffID}</td>
                                    <td>{data.staffName}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.position}</td>
                                    <td>{data.degreeLevel}</td>
                                    <td>{data.major}</td>
                                    <td>{data.studyYear === "" ? "N/A" : data.studyYear}</td>
                                    <td className='hover:bg-yellow-50'>{data.shiftWork}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Optional: Display selected IDs */}
                    <div>
                        <h3>Selected Staff IDs:</h3>
                        <p>{selectedStaffIDs.join(', ') || 'No staff selected'}</p>
                    </div>
                </div>

            </div>

            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <form onSubmit={handleFormSubmit} className="container w-full h-full space-y-5 font-noto">
                    <div className="header-modal flex justify-between">
                        <div className="radio-container flex space-x-3">
                            <p>{clickEvenModal}</p>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                        >
                            <X />
                        </button>
                    </div>
                    <div className="modal-form">
                        <div className="input-container w-full">
                            <label htmlFor="staffName" className=''>ឈ្មោះ*</label>
                            <input
                                id='staffName'
                                type="text"
                                placeholder="ឈ្មោះ"
                                className="input input-bordered my-2 bg-secondary w-full"
                                required
                                minLength="3"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="input-container grid w-full gap-2">
                                <label htmlFor="gender" className=''>ភេទ*</label>
                                <select
                                    id="gender"
                                    required
                                    className="select select-bordered bg-secondary w-full"
                                    defaultValue=""
                                >
                                    <option value="" disabled>ជ្រើសរើសភេទ</option>
                                    <option value="ប្រុស">ប្រុស</option>
                                    <option value="ស្រី">ស្រី</option>
                                </select>

                            </div>
                            <div className="input-container grid w-full gap-2">
                                <label htmlFor="position" className=''>មុខដំណែង*</label>
                                <select
                                    id="position"
                                    required
                                    className="select select-bordered bg-secondary w-full"
                                    defaultValue=""
                                >
                                    <option value="" disabled>មុខដំណែង</option>
                                    <option value="មន្ត្រីទទួលបន្ទុក">មន្ត្រីទទួលបន្ទុក</option>
                                    <option value="និស្សិតហាត់ការ">និស្សិតហាត់ការ</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 ">
                            <div className="space-y-2 mt-2 w-full">
                                <label htmlFor="degreeLvl" className=''>កម្រិតសិក្សា</label>
                                <select
                                    id="degreeLvl"
                                    required
                                    className="select select-bordered bg-secondary w-full"
                                    defaultValue=""
                                >
                                    <option value="" disabled>ជ្រើសរើសកម្រិតសិក្សា</option>
                                    <option value="បណ្ឌិត">បណ្ឌិត</option>
                                    <option value="អនុបណ្ឌិត">អនុបណ្ឌិត</option>
                                    <option value="បរិញ្ញាប័ត្រជាន់ខ្ពស់">បរិញ្ញាប័ត្រជាន់ខ្ពស់</option>
                                    <option value="បរិញ្ញាប័ត្រ">បរិញ្ញាប័ត្រ</option>
                                    <option value="បរិញ្ញាប័ត្ររង">បរិញ្ញាប័ត្ររង</option>
                                </select>

                            </div>
                            <div className="space-y-2 mt-2 w-full">
                                <label htmlFor="stdYear" className=''>ឆ្នាំសិក្សា*</label>
                                <select
                                    id="stdYear"
                                    className="select select-bordered bg-secondary w-full"
                                    defaultValue=""
                                >
                                    <option value="" disabled>ជ្រើសរើសឆ្នាំសិក្សា</option>
                                    <option value="១">១</option>
                                    <option value="២">២</option>
                                    <option value="៣">៣</option>
                                    <option value="៤">៤</option>
                                </select>

                            </div>
                        </div>

                        <div className="space-y-2 mt-2">
                            <label htmlFor="majorName" className=''>ជំនាញ*</label>
                            <input
                                id='majorName'
                                type="text"
                                placeholder="ជំនាញ"
                                className="input input-bordered my-2 bg-secondary w-full"
                                required
                                minLength="3"
                            />
                        </div>
                        <div className="space-y-2 mt-2">
                            <p>វេនធ្នើការ*</p>
                            <div className="container-check-shiftTime grid grid-cols-3 md:flex md:justify-between gap-2">
                                <div className="check-purpose flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id='ពេញម៉ោង'
                                        className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    />
                                    <label htmlFor="ពេញម៉ោង" className='label-text text-[#32E2FF]'>ពេញម៉ោង</label>
                                </div>
                                <div className="check-purpose flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id='ព្រឹក'
                                        className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    />
                                    <label htmlFor="ព្រឹក" className='label-text text-[#32E2FF]'>ព្រឹក</label>
                                </div>
                                <div className="check-purpose flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id='រសរៀល'
                                        className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    />
                                    <label htmlFor="រសរៀល" className='label-text text-[#32E2FF]'>រសរៀល</label>
                                </div>
                                <div className="check-purpose flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id='យប់'
                                        className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    />
                                    <label htmlFor="យប់" className='label-text text-[#32E2FF]'>យប់</label>
                                </div>
                                <div className="check-purpose flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id='សៅរ៍-អាទិត្យ'
                                        className="checkbox border-[#32E2FF] checkbox-info checkbox-sm"
                                    />
                                    <label htmlFor="សៅរ៍-អាទិត្យ" className='label-text text-[#32E2FF]'>សៅរ៍-អាទិត្យ</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-300"
                    >
                        <Save />
                        បញ្ចូល
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default TableStaff