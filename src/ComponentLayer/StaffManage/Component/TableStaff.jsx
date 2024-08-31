import React, { useCallback, useEffect, useState } from 'react'
import BtnGredient from '../../../layout/Component/BtnGredient'
import { UserPlus } from 'lucide-react'
import { UserRoundPlus, X, Save, Trash2, SquarePen, EditIcon } from 'lucide-react';
import Modal from '../../../layout/Component/Modal'
import useCollage from '../../../Hook/useCollege';
import useCRUDStaff from '../Hook/useCRUDStaff'

//Staff Data
const StaffData = [
    {
        staffId: 300134,
        staffName: "សាស្ត្រាចារ្យជំនួយ ប៉ែន ឌីណា",
        gender: "ប្រុស",
        position: "មន្ត្រីទទួលបន្ទុក",
        degreeLevel: "បរិញ្ញាប័ត្រជាន់ខ្ពស់",
        major: ["វិទ្យាសាស្ត្រនយោបាយ", "វិទ្យាសាស្ត្រអប់រំ"],
        studyYear: "",
        shiftWork: "ពេញម៉ោង",
    },
    {
        staffId: 300001,
        staffName: "ណន ស្រីស្រស់",
        gender: "ស្រី",
        position: "ហាត់ការ",
        degreeLevel: "បរិញ្ញាបត្រ",
        major: ["អក្សរសាស្ត្រអង់គ្លេស"],
        studyYear: "៣",
        shiftWork: "ព្រឹក-យប់",
    }
]


function TableStaff() {
    // Function to handle the "Select All" checkbox End
    const [searchStaff, setSearchStaff] = useState("")
    const [clickEvenModal, setClickEvenShowModal] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)//Modal For Add Staff
    const [EditDeletModalVisble, setEditDeletModalVisble] = useState(false)//Modal For Edit or delete
    const [selectedstaffIds, setSelectedstaffIds] = useState([]);// Get Select checkbox staff ID
    const [staffInfor, setStaffInfor] = useState({
        staffId: 0,
        staffName: "",
        gender: "",
        position: "",
        degreeLevel: "",
        major: [],
        studyYear: "",
        shiftWork: "",
    })


    const { staffList } = useCRUDStaff()
    const [filteredStaff, setFilteredStaff] = useState([]);


    const { collageName, loading, error } = useCollage();
    const [college, setCollege] = useState([]);

    // Update college state whenever collageName changes
    useEffect(() => {
        setFilteredStaff(staffList)
        if (collageName.length > 0) {
            // Filter out colleges that are in staffInfor.major
            const filteredCollege = collageName.filter(
                (data) => !staffInfor.major.includes(data.collegeId)
            );
            setCollege(filteredCollege);
        }
    }, [collageName, staffInfor.major]);

    const handleGetCollege = (event) => {
        const value = event.target.value;

        setStaffInfor((prevStaffInfor) => {
            const updatedMajor = [...prevStaffInfor.major];
            if (!updatedMajor.includes(value)) {
                updatedMajor.push(value); // Add selected major to the list
            }

            return {
                ...prevStaffInfor,
                major: updatedMajor, // Update the state with the new major list
            };
        });
    };

    // Function to handle removing a major
    const handleRemoveMajor = (majorToRemove) => {
        setStaffInfor((prevStaffInfor) => ({
            ...prevStaffInfor,
            major: prevStaffInfor.major.filter((major) => major !== majorToRemove),
        }));
    };












    // Toggle modal visibility Add And Delete
    const handleOpenModal = (clickEven) => {
        setIsModalVisible(true);
        setClickEvenShowModal(clickEven)
    }
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setStaffInfor({
            staffId: 0,
            staffName: "",
            gender: "",
            position: "",
            degreeLevel: "",
            major: "",
            studyYear: "",
            shiftWork: "",
        })
    };

    //Delete Modal SHow And Hide
    const handleDelteModalClose = () => {
        setEditDeletModalVisble(false)
        setSelectedstaffIds([])
    }

    const handleDelteModalOpen = (staffId) => {
        setEditDeletModalVisble(true);
        //If < 1 Mean Sigle Select Of Staff ID TO Delete
        if (selectedstaffIds.length < 1) {
            // Add the new staffId to the existing array of selectedstaffIds
            setSelectedstaffIds(prevSelectedstaffIds => [...prevSelectedstaffIds, staffId]);
        }
    }

    //Handle Edit Modal
    const handleEditModalOpen = (updatestaffId) => {
        // Find the staff data by staffId
        const staffToUpdate = filteredStaff.find(staff => staff.staffId === updatestaffId);
        if (staffToUpdate) {
            // Update the state with the selected staff data
            setStaffInfor({
                staffId: staffToUpdate.staffId,
                staffName: staffToUpdate.staffName,
                gender: staffToUpdate.gender,
                position: staffToUpdate.position,
                degreeLevel: staffToUpdate.degreeLevel,
                major: staffToUpdate.majorId,
                studyYear: staffToUpdate.studyYear,
                shiftWork: staffToUpdate.shiftWork,
            });
        }

        setIsModalVisible(true); // Open the modal
        setClickEvenShowModal("កែទិន្ន័យ"); // Set the modal title or purpose
        console.log(updatestaffId); // Log the ID (for debugging purposes)
    }

    //Get Data Add Form--------------------
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setStaffInfor((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        const form = e.target;

        // Check if the form is valid
        if (form.checkValidity()) {
            // Proceed with form submission or any action
            console.log(staffInfor)
        } else {
            // Display custom error messages if needed
            alert('Please fill out the form correctly.');
        }
    }

    //Get Data Add Form--------------------

    // Function to handle the "Select All" checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // If checked, select all staff IDs
            const allstaffIds = StaffData.map(data => data.staffId);
            setSelectedstaffIds(allstaffIds);
        } else {
            // If unchecked, clear the selection
            setSelectedstaffIds([]);
        }
    };

    // Function to handle individual row checkbox
    const handleSelectSingle = (staffId) => (e) => {
        if (e.target.checked) {
            // Add the staff ID to the selected list
            setSelectedstaffIds(prevSelected => [...prevSelected, staffId]);
        } else {
            // Remove the staff ID from the selected list
            setSelectedstaffIds(prevSelected => prevSelected.filter(id => id !== staffId));
        }
    };

    //Handle Search Input 
    const handleSearchStaff = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchStaff(query);

        const filteredData = StaffData.filter((staff) =>
            staff.staffName.toLowerCase().includes(query) ||  // Search by name
            staff.staffId.toString().includes(query)          // Search by ID
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
                                                checked={selectedstaffIds.length === StaffData.length}
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
                                <th>កែប្រ-លុប</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.map((data) => (
                                <tr key={data.staffId} className='text-[15px] hover:bg-primary cursor-pointer active:bg-primary'>
                                    <td>
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <input
                                                    id={data.staffId}
                                                    type="checkbox"
                                                    className="checkbox checkbox-accent"
                                                    checked={selectedstaffIds.includes(data.staffId)}
                                                    onChange={handleSelectSingle(data.staffId)}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                    <td>{data.staffId}</td>
                                    <td>{data.staffName}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.position}</td>
                                    <td>{data.degreeLevel === "" ? "មិនមាន" : data.degreeLevel}</td>
                                    <td>
                                        {data.majorId.length === 0 ? (
                                            "មិនមាន"
                                        ) : (
                                            data.majorId.map((item, index) => (
                                                <div key={index}>{(index+1)+"."+item}</div>
                                            ))
                                        )}
                                    </td>
                                    <td>{data.year === "" ? "មិនមាន" : data.studyYear}</td>
                                    <td>{data.shiftWork}</td>
                                    <td className='space-x-2 grid  place-items-center grid-cols-2 lg:block'>
                                        {selectedstaffIds.length > 1 ? "" : (
                                            <button className='text-blue-500 active:scale-110' onClick={() => handleEditModalOpen(data.staffId)}>
                                                <SquarePen />
                                            </button>
                                        )}
                                        <button
                                            className='text-red-500 active:scale-110'
                                            onClick={() => handleDelteModalOpen(data.staffId)}
                                        >
                                            <Trash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Add Edit Modal  */}
            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <form onSubmit={handleFormSubmit} className="container w-full h-full space-y-5 font-noto">
                    <div className="header-modal flex justify-between">
                        <div className="radio-container flex space-x-3">
                            <p>{clickEvenModal}</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                        >
                            <X />
                        </button>
                    </div>
                    <div className="modal-form">
                        <div className="input-container w-full">
                            <label htmlFor="staffName">ឈ្មោះ*</label>
                            <input
                                id='staffName'
                                type="text"
                                placeholder="ឈ្មោះ"
                                value={staffInfor.staffName}
                                className="input input-bordered my-2 bg-secondary w-full"
                                required
                                onChange={handleInputChange}
                                minLength="3"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="input-container grid w-full gap-2">
                                <label htmlFor="gender">ភេទ*</label>
                                <select
                                    id="gender"
                                    required
                                    className="select select-bordered bg-secondary w-full"
                                    onChange={handleInputChange}
                                    defaultValue={staffInfor.gender}
                                >
                                    <option value="" disabled>ជ្រើសរើសភេទ</option>
                                    <option value="ប្រុស">ប្រុស</option>
                                    <option value="ស្រី">ស្រី</option>
                                </select>
                            </div>
                            <div className="input-container grid w-full gap-2">
                                <label htmlFor="position">មុខដំណែង*</label>
                                <select
                                    id="position"
                                    required
                                    className="select select-bordered bg-secondary w-full"
                                    onChange={handleInputChange}
                                    defaultValue={staffInfor.position}
                                >
                                    <option value="" disabled>ជ្រើសរើសមុខដំណែង</option>
                                    <option value="មន្ត្រីទទួលបន្ទុក">មន្ត្រីទទួលបន្ទុក</option>
                                    <option value="និស្សិតហាត់ការ">និស្សិតហាត់ការ</option>
                                    <option value="អ្នកអានាម័យ">អ្នកអានាម័យ</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2 mt-2 w-full">
                                <label htmlFor="degreeLevel">កម្រិតសិក្សា</label>
                                <select
                                    id="degreeLevel"
                                    className="select select-bordered bg-secondary w-full"
                                    onChange={handleInputChange}
                                    defaultValue={staffInfor.degreeLevel}
                                >
                                    <option value="" disabled>ជ្រើសរើសកម្រិតសិក្សា</option>
                                    <option value="បណ្ឌិត">បណ្ឌិត</option>
                                    <option value="អនុបណ្ឌិត">អនុបណ្ឌិត</option>
                                    <option value="បរិញ្ញាប័ត្រជាន់ខ្ពស់">បរិញ្ញាប័ត្រជាន់ខ្ពស់</option>
                                    <option value="បរិញ្ញាប័ត្រ">បរិញ្ញាប័ត្រ</option>
                                    <option value="បរិញ្ញាប័ត្ររង">បរិញ្ញាប័ត្ររង</option>
                                    <option value="">រំលង</option>
                                </select>
                            </div>
                            <div className="space-y-2 mt-2 w-full">
                                <label htmlFor="studyYear">ឆ្នាំសិក្សា</label>
                                <select
                                    id="studyYear"
                                    className="select select-bordered bg-secondary w-full"
                                    onChange={handleInputChange}
                                    defaultValue={staffInfor.studyYear}
                                >
                                    <option value="" disabled>ជ្រើសរើសឆ្នាំសិក្សា</option>
                                    <option value="១">១</option>
                                    <option value="២">២</option>
                                    <option value="៣">៣</option>
                                    <option value="៤">៤</option>
                                    <option value="">រំលង</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 mt-2">
                            <label htmlFor="major">ជំនាញ</label>
                            {/* Dropdown to select a major */}
                            <select
                                id="major"
                                className="select select-bordered bg-secondary w-full"
                                onChange={handleGetCollege} // Add selected major
                            >
                                <option>ជ្រើសរើសជំនាញ</option>
                                {college.length > 0 ? (
                                    college.map((data) => (
                                        <option key={data.collegeId} value={data.collegeId}>
                                            {data.collegeName}
                                        </option>
                                    ))
                                ) : (
                                    <option>No colleges available</option>
                                )}
                            </select>

                            {/* Render selected majors */}
                            <div className="w-full h-fit bg-secondary p-5 rounded-[10px] border mt-2 flex flex-wrap gap-2">
                                {staffInfor.major.length > 0 ? (
                                    staffInfor.major.map((data, index) => (
                                        <button
                                            type="button"
                                            key={index}
                                            className="btn text-accent h-fit w-fit bg-primary rounded-full"
                                            onClick={() => handleRemoveMajor(data)} // Remove major on click
                                        >
                                            {collageName.find(college => college.collegeId === data)?.collegeName || data}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-primary">សូមជ្រើសរើសជំនាញ</p>
                                )}
                            </div>

                        </div>
                        <div className="space-y-2 mt-2">
                            <p>វេនធ្នើការ*</p>
                            <div className="container-check-shiftTime grid grid-cols-2 md:flex md:justify-between gap-2">
                                {['ពេញម៉ោង', 'ព្រឹក-យប់', 'រសៀល-យប់', 'សៅរ៍-អាទិត្យ'].map((shift) => (
                                    <div key={shift} className="check-purpose flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id={shift}
                                            required
                                            name="shiftWork" // Ensure all radios share the same name to be mutually exclusive
                                            className="radio border-[#32E2FF] radio-info radio-sm"
                                            onChange={(e) => setStaffInfor({ ...staffInfor, shiftWork: e.target.value })} // Set the shiftWork directly
                                            value={shift} // Set the value to the shift
                                            checked={staffInfor.shiftWork === shift} // Check if the current shift matches the selected one
                                        />
                                        <label htmlFor={shift} className="label-text text-[#32E2FF]">{shift}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-300"
                    >
                        {clickEvenModal === "កែទិន្ន័យ" ? <EditIcon /> : <Save />}
                        {clickEvenModal === "កែទិន្ន័យ" ? "កែទិន្ន័យ" : "បញ្ចូលថ្មី"}
                    </button>
                </form>
            </Modal>


            {/* MOdal Delete Ask User for Confirm When User Click  */}
            <Modal isVisible={EditDeletModalVisble} onClose={handleDelteModalClose}>
                <div className="header-modal flex justify-between font-noto">
                    <div className="radio-container flex space-x-3">
                        <p>តើពិតអ្នកពិតជាចង់លុបទិន្ន័យបុគ្គលិក?</p>
                    </div>
                    <button
                        onClick={handleDelteModalClose}
                        className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                    >
                        <X />
                    </button>
                </div>
                <div className="modal-form font-noto text-center p-10">
                    <p>អត្តលេខបុគ្គលិកដែលត្រូវលុបចេញ</p>
                    <br></br>
                    <p className='text-red-600'>{selectedstaffIds.join(' - ')}</p>
                </div>


                <div className="contianer-btn">
                    <button
                        className="btn w-full font-noto rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#d45757] to-[#E7FBFF] hover:from-[#5e2626] hover:to-[#ffffff] transition-all ease-in-out duration-300"
                    >
                        <Trash2 />
                        យល់ព្រម
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default TableStaff