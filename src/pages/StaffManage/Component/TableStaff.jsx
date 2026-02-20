import React, { useCallback, useEffect, useState } from "react";
import BtnGredient from "../../../layout/Component/BtnGredient";
import { UserPlus } from "lucide-react";
import {
  UserRoundPlus,
  X,
  Save,
  UserCheck,
  UserX,
  Trash2,
  SquarePen,
  EditIcon,
  ArrowDownToLine,
} from "lucide-react";
import Modal from "../../../layout/Component/Modal";
import useCRUDStaff from "../Hook/useCRUDStaff";
import useMajor from "../../../Hook/useMajor";
import useDegreeLevel from "../../../Hook/useDegreeLevel";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import axios from "../../../api/axios";
function TableStaff() {
  // Function to handle the "Select All" checkbox End
  const [showInactive, setShowInactive] = useState(false);
  const [searchStaff, setSearchStaff] = useState("");
  const [clickEvenModal, setClickEvenShowModal] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); //Modal For Add Staff
  const [EditDeletModalVisble, setEditDeletModalVisble] = useState(false); //Modal For Edit or delete
  const [selectedstaffIds, setSelectedstaffIds] = useState([]); // Get Select checkbox staff ID
  const [staffInfor, setStaffInfor] = useState({
    staffId: 0,
    staffName: "",
    gender: "",
    position: "",
    degreeLevel: "",
    major: [],
    studyYear: 0,
    shiftWork: "",
    isActive: true,
  });

  const clearStaffInfor = () => {
    setStaffInfor({
      staffId: 0,
      staffName: "",
      gender: "",
      position: "",
      degreeLevel: "",
      major: [],
      studyYear: 0,
      shiftWork: "",
      isActive: true,
    });
  };

  const {
    getAllStaffNoLoading,
    staffList,
    saveStaff,
    getAllStaff,
    deleteStaff,
    updateStaff,
    loading,
  } = useCRUDStaff();
  const [filteredStaff, setFilteredStaff] = useState([]);
  // const { majorData, loading, error } = useCollage();
  const { majorData } = useMajor();
  const [majorSelect, setmajorSelect] = useState([]);
  const { degreeLevel } = useDegreeLevel();
  // Update majorSelect state whenever majorData changes
  useEffect(() => {
    setFilteredStaff(staffList); // Update filteredStaff whenever staffList changes
    if (majorData.length > 0) {
      // Filter out majorSelects that are in staffInfor.major
      const filteredmajorSelect = majorData.filter(
        (data) => !staffInfor.major.includes(data.majorId),
      );
      setmajorSelect(filteredmajorSelect);
    }
  }, [staffList, majorData, staffInfor.major]);

  const handleGetmajorSelect = (event) => {
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
    setClickEvenShowModal(clickEven);
  };
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
    });
  };

  //Delete Modal SHow And Hide
  const handleDelteModalClose = () => {
    setEditDeletModalVisble(false);
    setSelectedstaffIds([]);
  };

  const handleDelteModalOpen = (staffId) => {
    setEditDeletModalVisble(true);
    //If < 1 Mean Sigle Select Of Staff ID TO Delete
    if (selectedstaffIds.length < 1) {
      // Add the new staffId to the existing array of selectedstaffIds
      setSelectedstaffIds((prevSelectedstaffIds) => [
        ...prevSelectedstaffIds,
        staffId,
      ]);
    }
    console.log(selectedstaffIds);
  };

  const handleExportToExcel = (data) => {
    // Define the headers
    const headers = [
      "អត្តលេខ", // staffId
      "នាម គោត្តនាម", // staffName
      "ភេទ", // gender
      "តួនាទី", // position
      "កម្រិតសិក្សា", // degreeLevel
      "ជំនាញ", // majorId
      "ឆ្នាំទី", // year
      "វេនធ្នើការ", // shiftWork
      "ស្ថានភាព", // isActive
    ];

    // Map data to match the headers
    const formattedData = data.map((item) => ({
      អត្តលេខ: item.staffId,
      "នាម គោត្តនាម": item.staffName,
      ភេទ: item.gender,
      តួនាទី: item.position,
      កម្រិតសិក្សា: item.degreeLevel,
      ជំនាញ: item.majorId.join(", "), // Convert array to string
      ឆ្នាំទី: item.year,
      វេនធ្នើការ: item.shiftWork,
      ស្ថានភាព: item.isActive ? "កំពុងបម្រើការ" : "ឈប់", // Format boolean
    }));

    // Create worksheet from formatted data
    const ws = XLSX.utils.json_to_sheet(formattedData, { header: headers });

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SRU_STAFF_DATA");

    // Write the workbook to a binary string and create a download link
    XLSX.writeFile(wb, "staff_data.xlsx");
  };

  const handelDelteStaff = async () => {
    try {
      // Create an array of promises for deletion
      const deletePromises = selectedstaffIds.map((data) => deleteStaff(data));

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Refetch and immediately use the updated list
      const updatedStaffList = await getAllStaffNoLoading();

      // Log the updated staff list
      console.log(
        "After deletion and fetching new staff list:",
        updatedStaffList,
      );

      // Close the delete modal
      setEditDeletModalVisble(false);

      // Show success message
      toast.success("ទិន្ន័យបុគ្គលិកបានលុបជោគជ័យ");
    } catch (error) {
      toast.error("បរាជ័យក្នុងការលុប");
    }
    setSelectedstaffIds([]);
  };

  //Handle Edit Modal
  const handleEditModalOpen = (updatestaffId) => {
    // Find the staff data by staffId
    const staffToUpdate = filteredStaff.find(
      (staff) => staff.staffId === updatestaffId,
    );
    //Convert Major Name To Major ID
    const majorName = staffToUpdate.majorId;
    const majorId = majorData
      .filter((majorData) => majorName.includes(majorData.majorName))
      .map((majorData) => majorData.majorId);

    if (staffToUpdate) {
      setStaffInfor({
        staffId: staffToUpdate.staffId,
        staffName: staffToUpdate.staffName,
        gender: staffToUpdate.gender,
        position: staffToUpdate.position,
        degreeLevel: staffToUpdate.degreeLevel,
        major: majorId,
        studyYear: staffToUpdate.year, // Ensure this is correct
        shiftWork: staffToUpdate.shiftWork,
        isActive: staffToUpdate.isActive,
      });
    } else {
      console.error("Staff not found for id:", updatestaffId);
    }

    setIsModalVisible(true); // Open the modal
    setClickEvenShowModal("កែប្រែព័ត៌មានបុគ្គលិក"); // Set the modal title or purpose
  };

  //Get Data Add Form--------------------
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStaffInfor((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const form = e.target;

    // Check if the form is valid
    if (form.checkValidity()) {
      if (clickEvenModal === "កែប្រែព័ត៌មានបុគ្គលិក") {
        try {
          const updateStaff = await axios.put("/library-staff", {
            staffId: staffInfor.staffId,
            staffName: staffInfor.staffName,
            gender: staffInfor.gender,
            position: staffInfor.position,
            degreeLevel: staffInfor.degreeLevel,
            majorId: staffInfor.major,
            year: staffInfor.studyYear,
            shiftWork: staffInfor.shiftWork,
            isActive: staffInfor.isActive,
          });
          if (updateStaff.data === "Update successful") {
            toast.success(`បុគ្គលិក​ ID ${staffInfor.staffId} កែព័ត៍មានជោគជ័យ`);
            handleCloseModal();
            getAllStaffNoLoading();
          } else {
            toast.error(
              "បរាជ័យក្នុងការកែប្រែព័ត៍មានបុគ្គលិក  ។សូមព្យាយាមម្តងទៀត",
            );
          }
        } catch (error) {
          toast.error(error);
        }
      } else {
        try {
          const saveStaffData = await saveStaff(staffInfor); // Pass staffInfor here
          // Refetch the staff list after successful submission
          await getAllStaffNoLoading();
          // Optionally clear the form or reset staffInfor
          setStaffInfor({
            staffName: "",
            gender: "",
            position: "",
            degreeLevel: "",
            major: "",
            studyYear: "",
            shiftWork: "",
            isActive: false,
          });
          setIsModalVisible(false);
          toast.success("បុគ្គលិកបានបញ្ចូលជោគជ័យ");
        } catch (error) {
          console.error("Error saving staff data:", error);
          toast.error("ការបញ្ចូលបរាជ័យ។សូមព្យាយាមម្តងទៀត..."); // Handle the error properly
        }
      }
    } else {
      // Display custom error messages if needed
      alert("Please fill out the form correctly.");
    }
  };

  //Get Data Add Form--------------------

  // Function to handle the "Select All" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // If checked, select all staff IDs
      const allstaffIds = filteredStaff.map((data) => data.staffId);
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
      setSelectedstaffIds((prevSelected) => [...prevSelected, staffId]);
    } else {
      // Remove the staff ID from the selected list
      setSelectedstaffIds((prevSelected) =>
        prevSelected.filter((id) => id !== staffId),
      );
    }
  };

  //Handle Search Input
  const handleSearchStaff = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchStaff(query);

    const filteredData = staffList.filter(
      (staff) =>
        staff.staffName.toLowerCase().includes(query) || // Search by name
        staff.staffId.toString().includes(query), // Search by ID
    );
    setFilteredStaff(filteredData);
  };

  // Toggle between showing active and inactive staff
  const handleShowExStaff = () => {
    setShowInactive(!showInactive);
  };

  // Filter staff based on the current state
  const displayedStaff = showInactive
    ? filteredStaff.filter((data) => !data.isActive) // Show only inactive staff if showInactive is true
    : filteredStaff.filter((data) => data.isActive);

  //Handle Search Input End
  const getDegreeLevelNameById = (id) => {
    const degree = degreeLevel.find((d) => d.degreeLevelId === id);
    return degree ? degree.degreeLevel : "មិនមាន"; // Return "មិនមាន" if not found
  };

  if (loading)
    return (
      <main className="flex justify-center items-center w-full h-full space-y-5">
        <span className="loading loading-dots text-accent loading-lg"></span>
      </main>
    );

  return (
    <>
      <div className="w-full h-full bg-secondary rounded-[20px] p-5 font-noto space-y-5 ">
        <div className="header flex  justify-between">
          <p>នាមសមាសភាពមន្ត្រីកំពុងបម្រើការងារនៅក្នុងបណ្ណាល័យ </p>
          <div className="button-container flex flex-col md:flex-row gap-2">
            <BtnGredient
              onClick={() => handleOpenModal("បំពេញព័ត៍មានបុគ្គលិកថ្មី")}
            >
              <UserPlus />
              <p className="hidden md:block">បន្ថែមបុគ្គលិកថ្មី</p>
            </BtnGredient>
            <button
              className="btn btn-primary"
              onClick={() => handleExportToExcel(staffList)}
            >
              <ArrowDownToLine />
              <p>ទាញយកទិន្ន័យបុគ្គលិក</p>
            </button>
            <button className="btn btn-primary" onClick={handleShowExStaff}>
              {showInactive ? <UserCheck /> : <UserX />}
              <p>{showInactive ? "បុគ្គលិកកំពុងបម្រើការ" : "អតិតបុគ្គលិក"}</p>
            </button>

            <label className="input input-bordered w-[190px] md:w-full flex items-center gap-2">
              <input
                id="searchStaff"
                type="text"
                className="w-full"
                placeholder="ស្វែងរកឈ្មោះ,ID"
                onChange={handleSearchStaff}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-8 w-8 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>

        <div className="table-container w-full h-[90%] overflow-auto scrollbar-hide">
          <table className="table ">
            <thead>
              <tr className="text-accent text-[15px] sticky top-0 bg-secondary">
                <td>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        id="checkkAll"
                        type="checkbox"
                        className="checkbox checkbox-accent"
                        checked={
                          selectedstaffIds.length === filteredStaff.length
                        }
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
                <th>ស្ថានភាព</th>
                <th>កែប្រ-លុប</th>
              </tr>
            </thead>
            <tbody>
              {displayedStaff.map((data) => (
                <tr
                  key={data.staffId}
                  className="text-[15px] hover:bg-primary cursor-pointer active:bg-primary"
                >
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
                  <td>{getDegreeLevelNameById(data.degreeLevel)}</td>
                  <td>
                    {data.majorId.length === 0
                      ? "មិនមាន"
                      : data.majorId.map((item, index) => (
                          <div key={index}>{index + 1 + "." + item}</div>
                        ))}
                  </td>
                  <td>{data.year === null ? "មិនមាន" : data.year}</td>
                  <td>{data.shiftWork}</td>
                  <td>{data.isActive ? "កំពុងបំរើការ" : "ឈប់"}</td>
                  <td className="space-x-2 grid place-items-center grid-cols-2 lg:block">
                    {selectedstaffIds.length > 1 ? (
                      ""
                    ) : (
                      <button
                        className="text-blue-500 active:scale-110"
                        onClick={() => handleEditModalOpen(data.staffId)}
                      >
                        <SquarePen />
                      </button>
                    )}
                    <button
                      className="text-red-500 active:scale-110"
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
        <Toaster position="bottom-center" />
      </div>

      {/* Add Edit Modal  */}
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <form
          onSubmit={handleFormSubmit}
          className="container w-full h-full space-y-5 font-noto"
        >
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
              <label htmlFor="staffName">នាម គោត្តនាម*</label>
              <input
                id="staffName"
                type="text"
                placeholder="នាម គោត្តនាម"
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
                  <option value="" disabled>
                    ជ្រើសរើសភេទ
                  </option>
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
                  <option value="" disabled>
                    ជ្រើសរើសមុខដំណែង
                  </option>
                  <option value="មន្ត្រីទទួលបន្ទុក">មន្ត្រីទទួលបន្ទុក</option>
                  <option value="ហាត់ការ">ហាត់ការ</option>
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
                  defaultValue={staffInfor.degreeLevel || ""}
                >
                  <option value="" disabled>
                    ជ្រើសរើសកម្រិតសិក្សា
                  </option>
                  {degreeLevel.map((data, index) => (
                    <option key={data.degreeLevelId} value={data.degreeLevelId}>
                      {data.degreeLevel}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 mt-2 w-full">
                <label htmlFor="studyYear">ឆ្នាំសិក្សា</label>
                <select
                  id="studyYear"
                  className="select select-bordered bg-secondary w-full"
                  onChange={handleInputChange}
                  defaultValue={staffInfor.studyYear || ""} // Ensure this is correctly set
                >
                  <option value="" disabled>
                    ជ្រើសរើសឆ្នាំសិក្សា
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
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
                onChange={handleGetmajorSelect} // Add selected major
              >
                <option>ជ្រើសរើសជំនាញ</option>
                {majorSelect.map((data) => (
                  <option key={data.majorId} value={data.majorId}>
                    {data.majorName}
                  </option>
                ))}
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
                      {majorData.find(
                        (majorSelect) => majorSelect.majorId === data,
                      )?.majorName || data}
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
                {["ពេញម៉ោង", "ព្រឹក-យប់", "រសៀល-យប់", "សៅរ៍-អាទិត្យ"].map(
                  (shift) => (
                    <div
                      key={shift}
                      className="check-purpose flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        id={shift}
                        required
                        name="shiftWork" // Ensure all radios share the same name to be mutually exclusive
                        className="radio border-[#32E2FF] radio-info radio-sm"
                        onChange={(e) =>
                          setStaffInfor({
                            ...staffInfor,
                            shiftWork: e.target.value,
                          })
                        } // Set the shiftWork directly
                        value={shift} // Set the value to the shift
                        checked={staffInfor.shiftWork === shift} // Check if the current shift matches the selected one
                      />
                      <label
                        htmlFor={shift}
                        className="label-text text-[#32E2FF]"
                      >
                        {shift}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <p>ស្ថានភាព</p>
              <div className="container-check-shiftTime flex gap-2">
                {["កំពុងបម្រើការ", "ឈប់"].map((label) => {
                  const isActive = label === "កំពុងបម្រើការ"; // True for 'កំពុងបម្រើការ', false for 'ឈប់'
                  return (
                    <div
                      key={label}
                      className="check-purpose flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        id={label}
                        required
                        name="isActive" // Ensure all radios share the same name to be mutually exclusive
                        className="radio border-[#32E2FF] radio-info radio-sm"
                        onChange={() =>
                          setStaffInfor({ ...staffInfor, isActive })
                        } // Set the isActive directly as a boolean
                        value={label} // The value is the label but stored as boolean in isActive
                        checked={staffInfor.isActive === isActive} // Check if the current isActive matches the boolean
                      />
                      <label
                        htmlFor={label}
                        className="label-text text-[#32E2FF]"
                      >
                        {label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-300"
          >
            {clickEvenModal === "កែប្រែព័ត៌មានបុគ្គលិក" ? (
              <EditIcon />
            ) : (
              <Save />
            )}
            រួចរាល់
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
          <p className="text-red-600">{selectedstaffIds.join(" - ")}</p>
        </div>
        <div className="contianer-btn">
          <button
            onClick={() => handelDelteStaff()}
            className="btn w-full font-noto rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#d45757] to-[#E7FBFF] hover:from-[#5e2626] hover:to-[#ffffff] transition-all ease-in-out duration-300"
          >
            <Trash2 />
            យល់ព្រម
          </button>
        </div>
      </Modal>
    </>
  );
}

export default TableStaff;
