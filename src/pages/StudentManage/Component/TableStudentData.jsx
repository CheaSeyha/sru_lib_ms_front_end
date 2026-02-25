import React, { useState, useEffect } from "react";
import Modal from "../../../layout/components/Modal";
import BtnGredient from "../../../layout/components/BtnGredient";
import BtnGredient1 from "../../Book/BtnGredient";
import {
  UserPlus,
  X,
  ArrowDownWideNarrow,
  School,
  Trash2,
  Pencil,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../api/axios";
import ModalAddStudent from "./ModalAddStudent";
import ModalAddMajor from "./ModalAddMajor";
import ModalUpdateStudent from "./ModalUpdateStudent";
import ModalDeleteMajor from "./ModalDeleteMajor";
import ModalDeleteCollege from "./ModalDeleteCollege";
import { useAuth } from "@/context/AuthProvider";

function TableStudentData() {
  const { userInfor } = useAuth();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalMajor, setIsShowModalMajor] = useState(false);
  const [isModalCollege, setIssModalCollege] = useState(false);
  const [generation, setGeneration] = useState([]);
  const [student, setStudent] = useState([]);
  const [major, setMajor] = useState([]);
  const [college, setColege] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalDeleteMajor, setIsModalDeleteMajor] = useState(false);
  const [isModalDeleteCollege, setIsModalDeleteCollege] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [selectedRows, setSelectedRows] = useState([]);
  const [isRightMousePressed, setIsRightMousePressed] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);
  const [formDataCollege, setFormDataCollege] = useState({
    collegeId: "",
    collegeName: "",
  });

  // Combined fetch function
  const fetchData = async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const [studentResponse, majorResponse, collegeResponse] =
        await Promise.all([
          axios.get("/student"),
          axios.get("/major"),
          axios.get("/college"),
        ]);

      // Process student data
      const flatData = studentResponse.data.flat();
      setStudent(flatData);
      const uniquegen = [
        ...new Set(studentResponse.data.map((stu) => stu.generation)),
      ];
      setGeneration(uniquegen);

      // Process major data
      setMajor(majorResponse.data);

      // Process college data
      setColege(collegeResponse.data);
    } catch (error) {
      console.error("There was an error fetching data!", error);
      toast.error("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false after all fetches are complete
    }
  };

  useEffect(() => {
    fetchData(); // Fetch all data when the component mounts
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = student.filter(
    (item) =>
      item.studentId
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.studentName
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.majorName
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const handleCloseModal = () => {
    setIsShowModal(false);
    setIssModalCollege(false);
    setIsModalDeleteMajor(false);
    setIsModalDeleteCollege(false);
  };

  const handleCloseModalUpdate = () => {
    setIsModalUpdate(false);
  };

  const handleCloseModalMajor = () => {
    setIsShowModalMajor(false);
  };

  const handleChangeCollge = (e) => {
    const { name, value } = e.target;
    setFormDataCollege({
      ...formDataCollege,
      [name]: value,
    });
  };

  const handleSubmitCollege = async (e) => {
    e.preventDefault();
    const submissionDataCollege = {
      ...formDataCollege,
    };
    try {
      await axios.post("/college", submissionDataCollege, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("បានបញ្ចូលមហាវិទ្យាល័យដោយជោគជ័យ!!!", {
        style: { fontFamily: " NotoSansKhmer-Regular, sans-serif" },
      });
      setFormDataCollege({
        collegeId: "",
        collegeName: "",
      });
      fetchData(); // Refresh the list after adding the new college
    } catch (error) {
      toast.error("មិនអាចបញ្ចួលបានទេ!!!.");
      console.log(error);
    }
  };

  const handleMouseDown = (entry, event) => {
    if (event.button === 2) {
      setIsRightMousePressed(true);
      toggleRowSelection(entry);
    }
  };

  const handleMouseOver = (entry) => {
    if (isRightMousePressed) {
      toggleRowSelection(entry);
    }
  };

  const handleMouseUp = () => {
    setIsRightMousePressed(false);
  };

  const toggleRowSelection = (entry) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.some(
        (row) => row.studentId === entry.studentId,
      );
      if (isSelected) {
        return prevSelectedRows.filter(
          (row) => row.studentId !== entry.studentId,
        );
      } else {
        return [...prevSelectedRows, entry];
      }
    });
  };

  const handledelete = async () => {
    for (let i = 0; i < selectedRows.length; i++) {
      try {
        await axios.post(`/student/delete/${selectedRows[i].studentId}`);
        toast.success(
          `បានលុបសិស្សអត្តលេខ ${selectedRows[i].studentId} ដោយជោគជ័យ!!!`,
          { style: { fontFamily: " NotoSansKhmer-Regular, sans-serif" } },
        );
      } catch (error) {
        console.error(
          `Error deleting student with ID: ${selectedRows[i].studentId}`,
          error,
        );
      }
    }
    setSelectedRows([]);
    fetchData(); // Refresh the list after deletion
  };

  const handleDeleteMajor = (entry) => {
    setDeleteEntry(entry);
    setIsModalDeleteMajor(true);
  };

  const handleDeleteCollege = (entry) => {
    setDeleteEntry(entry);
    setIsModalDeleteCollege(true);
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <main className="flex justify-center items-center w-full h-full space-y-5">
          <span className="loading loading-dots text-accent loading-lg"></span>
        </main>
      ) : (
        <>
          <div className="w-full h-full flex flex-col gap-5">
            {/* Header Content */}
            <div className="header flex flex-col-reverse xl:flex-row lg:flex-row md:flex-col-reverse">
              <div className="button-container md:w-full w-full flex flex-row md:flex-row gap-2">
                <label className="input input-bordered w-full md:w-[300px] flex items-center gap-2">
                  <input
                    id="searchStaff"
                    type="text"
                    className="w-full"
                    placeholder="ស្វែងរកអត្តលេខ​ ឬឈ្មោះ"
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                {userInfor.role === "ADMIN" ||
                userInfor.role === "SUPER_ADMIN" ? (
                  <BtnGredient onClick={() => setIsShowModal(true)}>
                    <UserPlus />
                    <p className="hidden md:block">បន្ថែមនិស្សិតថ្មី</p>
                  </BtnGredient>
                ) : null}
              </div>
              {userInfor.role === "ADMIN" ||
              userInfor.role === "SUPER_ADMIN" ? (
                <>
                  <div className="w-full">
                    <div className="w-3/5 text-right">
                      {selectedRows.length > 0 && (
                        <div className="inline-block pr-2">
                          <BtnGredient1
                            className="w-full h-full"
                            onClick={handledelete}
                            color={"from-[#ff0000] to-[#E7FBFF]"}
                            hover={"hover:from-[#E7FBFF] hover:to-[#ff0000]"}
                          >
                            <Trash2 />
                            <p className="font-noto">លុប</p>
                          </BtnGredient1>
                        </div>
                      )}
                      {selectedRows.length === 1 && (
                        <div className="inline-block pl-2">
                          <BtnGredient1
                            className="w-full h-full pr-5"
                            onClick={() => setIsModalUpdate(true)}
                            color={"from-[#1aff00] to-[#E7FBFF]"}
                            hover={"hover:from-[#E7FBFF] hover:to-[#1aff00]"}
                          >
                            <Pencil />
                            <p className="font-noto">កែសម្រួល</p>
                          </BtnGredient1>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="text-right w-full space-x-5">
                      <BtnGredient onClick={() => setIsShowModalMajor(true)}>
                        <ArrowDownWideNarrow />
                        <p className="hidden md:block">បន្ថែមជំនាញ</p>
                      </BtnGredient>
                      <BtnGredient onClick={() => setIssModalCollege(true)}>
                        <School />
                        <p className="hidden md:block">បន្ថែមមហាវិទ្យាល័យ</p>
                      </BtnGredient>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {/* Table Data */}
            <div className="table-container overflow-y-auto gap-5 flex-1 flex-col lg:flex-row md:flex-col flex w-full items-start">
              {/* Table Student */}
              <div className="table-container w-full h-[700px] md:h-full overflow-auto rounded-[10px] border border-primary shadow-xl">
                <table
                  className="table tectav min-w-full divide-y divide-gray-200"
                  onContextMenu={(e) => e.preventDefault()}
                  onMouseUp={handleMouseUp}
                >
                  <thead>
                    <tr className="sticky top-0 text-left text-sm bg-secondary text-accent">
                      <td>ល.រ</td>
                      <td>អត្តលេខ</td>
                      <td>ឈ្មោះ</td>
                      <td>ភេទ</td>
                      <td>ថ្ងៃ ខែ ឆ្នាំកំណើត</td>
                      <td>កម្រិត</td>
                      <td>ជំនាញ</td>
                      <td>ជំនាន់</td>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((entry, index) => (
                      <tr
                        key={entry.studentId}
                        onClick={() => setSelectedRows([])}
                        onMouseDown={(e) => handleMouseDown(entry, e)}
                        onMouseOver={() => handleMouseOver(entry)}
                        className={`hover:bg-primary ${
                          selectedRows.some(
                            (row) => row.studentId === entry.studentId,
                          )
                            ? "bg-primary"
                            : ""
                        } text-sm cursor-pointer active:bg-primary`}
                      >
                        <td>{index + 1}</td>
                        <td>{entry.studentId}</td>
                        <td>{entry.studentName}</td>
                        <td>{entry.gender}</td>
                        <td>{entry.dateOfBirth}</td>
                        <td>{entry.degreeLevel}</td>
                        <td>{entry.majorName}</td>
                        <td>{entry.generation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Table College and Major */}
              <div className="grid grid-rows-2 gap-5 w-full lg:w-[500px] h-[700px] md:h-full">
                <div className="table-container scrollbar-hide overflow-auto border border-primary shadow-xl rounded-[10px]">
                  <table className="table">
                    <thead>
                      <tr className="sticky top-0 text-left text-sm bg-secondary text-accent">
                        <td>ល.រ</td>
                        <td>លេខ</td>
                        <td>ឈ្មោះជំនាញ</td>
                        <td>មហា.វិ</td>
                      </tr>
                    </thead>
                    <tbody>
                      {major.map((entry, index) => (
                        <tr
                          key={entry.majorId}
                          onClick={() => handleDeleteMajor(entry)}
                          className="hover:bg-primary cursor-pointer active:bg-primary"
                        >
                          <td>{index + 1}</td>
                          <td>{entry.majorId}</td>
                          <td>{entry.majorName}</td>
                          <td>{entry.collegeId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-container scrollbar-hide overflow-auto rounded-[10px] border border-primary shadow-xl">
                  <table className="table">
                    <thead>
                      <tr className="sticky top-0 text-left text-sm bg-secondary text-accent">
                        <td>ល.រ</td>
                        <td>លេខមហាវិទ្យាល័យ</td>
                        <td>ឈ្មោះមហាវិទ្យាល័យ</td>
                      </tr>
                    </thead>
                    <tbody>
                      {college.map((entry, index) => (
                        <tr
                          key={entry.collegeId}
                          onClick={() => handleDeleteCollege(entry)}
                          className="text-[15px] hover:bg-primary cursor-pointer active:bg-primary"
                        >
                          <td>{index + 1}</td>
                          <td>{entry.collegeId}</td>
                          <td>{entry.collegeName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <ModalDeleteCollege
            isModalVisible={isModalDeleteCollege}
            handleCloseModal={handleCloseModal}
            fetchcollege={fetchData}
            entry={deleteEntry}
          />

          <ModalDeleteMajor
            isModalVisible={isModalDeleteMajor}
            handleCloseModal={handleCloseModal}
            fetchmajor={fetchData}
            entry={deleteEntry}
          />

          <ModalAddStudent
            isModalVisible={isShowModal}
            handleCloseModal={handleCloseModal}
            fetchstudent={fetchData} // if modal expects fetchstudent
          />

          <ModalAddMajor
            isModalVisible={isShowModalMajor}
            handleCloseModal={handleCloseModalMajor}
            fetchmajor={fetchData}
          />

          <ModalUpdateStudent
            isModalVisible={isModalUpdate}
            handleCloseModal={handleCloseModalUpdate}
            fetchstudent={fetchData}
            rowSelected={selectedRows}
            setRowSelected={setSelectedRows}
          />
          {/* ModalCollege */}
          <Modal isVisible={isModalCollege} onClose={handleCloseModal}>
            <div className="container w-full h-full space-y-5">
              <div className="header-modal flex items-center justify-between">
                <label className="font-noto font-semibold text-lg">
                  បន្ថែមមហាវិទ្យាល័យ
                </label>
                <button
                  onClick={handleCloseModal}
                  className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                >
                  <X />
                </button>
              </div>
              <form onSubmit={handleSubmitCollege}>
                <div className="container w-full h-full space-y-5">
                  <div className="flex mt-5">
                    <div className="w-2/5 mr-1">
                      <div className="w-full font-noto font-semibold">
                        លេខមហាវិទ្យាល័យ :
                      </div>
                      <input
                        type="text"
                        className="input input-bordered w-full bg-secondary font-noto"
                        name="collegeId"
                        value={formDataCollege.collegeId}
                        onChange={handleChangeCollge}
                        required
                      />
                    </div>
                    <div className="mr-1 w-full">
                      <div className="font-noto font-semibold">
                        មហាវិទ្យាល័យ :
                      </div>
                      <input
                        type="text"
                        className="input input-bordered w-full bg-secondary font-noto"
                        name="collegeName"
                        value={formDataCollege.collegeName}
                        onChange={handleChangeCollge}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 content-center pt-5 pb-5">
                  <BtnGredient
                    type="submit"
                    className="rounded-"
                    color={"from-[#00d0ffb1] to-[#E7FBFF]"}
                    hover={"from-[#00D9FF] to-[#a5cef3]"}
                  >
                    <label className="text-xl font-noto">បញ្ចូល</label>
                  </BtnGredient>
                </div>
              </form>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default TableStudentData;
