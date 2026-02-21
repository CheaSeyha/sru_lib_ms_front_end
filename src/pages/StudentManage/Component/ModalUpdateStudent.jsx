import React, { useState, useEffect } from "react";
import Modal from "../../../layout/components/Modal";
import BtnGredient from "../../Book/BtnGredient";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import toast, { Toaster } from "react-hot-toast";
const ModalUpdateStudent = ({
  isModalVisible,
  handleCloseModal,
  fetchstudent,
  rowSelected,
  setRowSelected,
}) => {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    dateOfBirth: "",
    gender: "",
    generation: "",
    majorId: "",
    degreeLevelId: "",
  });
  const [collegeData, setCollegeData] = useState([]);
  useEffect(() => {
    axios.get("/major").then((response) => {
      // Filter books where isActive is true
      setCollegeData(response.data);
    });
  }, []);
  const [degreedata, setdegreedata] = useState([]);
  useEffect(() => {
    axios.get("/degree-level").then((response) => {
      // Filter books where isActive is true
      setdegreedata(response.data);
    });
  }, []);
  const [majordata, setmajordata] = useState([]);
  useEffect(() => {
    axios.get("/major").then((response) => {
      // Filter books where isActive is true
      setmajordata(response.data);
    });
  }, []);

  useEffect(() => {
    if (rowSelected && rowSelected.length > 0) {
      const selectedStudent = rowSelected[0];
      setFormData({
        studentId: selectedStudent.studentId || "",
        studentName: selectedStudent.studentName || "",
        dateOfBirth: selectedStudent.dateOfBirth || "",
        gender: selectedStudent.gender || "",
        generation: selectedStudent.generation || "",
        majorId:
          majordata.find((row) => row.majorName === selectedStudent.majorName)
            .majorId || "",
        degreeLevelId:
          degreedata.find(
            (row) => row.degreeLevel === selectedStudent.degreeLevel,
          ).degreeLevelId || "",
      });
    }
  }, [rowSelected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateResponse = await axios.put(
        `/student/${formData.studentId}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (updateResponse.status === 202 || updateResponse.status === 200) {
        toast.success("អ្នកបានកែរប្រែព័ត៌មានសិស្សបានដោយជោគជ័យ!!!", {
          style: { fontFamily: " NotoSansKhmer-Regular, sans-serif" },
        });
        fetchstudent();
        setRowSelected([]);
      } else {
        toast.error("Failed to update book. Please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the book:", error);
      toast.error("An error occurred while updating the book.");
    }
    console.log(formData);
  };
  return (
    <>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <div className="container w-full h-full space-y-5">
          <div className="header-modal flex items-center justify-between">
            {/* <input type="radio" id='guestRadio' name="entryType" value="guest" className="radio radio-accent" onChange={handleRadioChange} checked={!isStudent} /> */}
            <label className="font-noto text-[20px]">កែសម្រួលសៀវភៅ</label>
            <div className="flex justify-end mt-0 w-1/3"></div>
            <button
              onClick={handleCloseModal}
              className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
            >
              <X />
            </button>
          </div>
        </div>
        <>
          <form onSubmit={handleSubmit}>
            <div className="container w-full h-full space-y-5">
              {/* Write here */}
              <div className="flex">
                <div className="w-full mt-5 mr-1">
                  <div className="w-full font-noto font-semibold">
                    អត្តលេខ :
                  </div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary font-noto"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="w-full mt-5 ml-1">
                  <div className=" w-full font-noto font-semibold">ឈ្មោះ :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary font-noto"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-full mr-1">
                  <div className=" w-full font-noto font-semibold">
                    កម្រិត :
                  </div>
                  <select
                    name="degreeLevelId"
                    value={formData.degreeLevelId}
                    onChange={handleChange}
                    className="select select-bordered w-full font-noto bg-secondary"
                  >
                    {/* <option value="ST">English</option>
    <option value="ST">Khmer</option>
    <option value="ST">Other</option> */}
                    <option disabled className="refresh" value="">
                      ជ្រើសរើសកម្រិតសិក្សា
                    </option>
                    {degreedata.map((e, index) => (
                      <option key={index} value={e.degreeLevelId}>
                        {e.degreeLevelId === "ac"
                          ? "បរិញ្ញាប័ត្ររង"
                          : e.degreeLevelId === "bc"
                            ? "បរិញ្ញាប័ត្រ"
                            : "អនុបណ្ឌិត"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full font-noto font-semibold">
                    ថ្ងៃ ខែ ឆ្នាំកំណើត :
                  </div>
                  <input
                    type="date"
                    className="input input-bordered  w-full bg-secondary font-noto"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="mr-1 w-1/2">
                  <div className=" font-noto font-semibold">ជំនាញ :</div>
                  <select
                    name="majorId"
                    value={formData.majorId}
                    onChange={handleChange}
                    className="select select-bordered w-full font-noto bg-secondary"
                  >
                    {/* <option value="ST">English</option>
    <option value="ST">Khmer</option>
    <option value="ST">Other</option> */}
                    <option disabled className="refresh" value="">
                      ជ្រើសរើសជំនាញ
                    </option>
                    {majordata.map((e, index) => (
                      <option key={index} value={e.majorId}>
                        {e.majorName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=" ml-1 w-1/4">
                  <div className=" w-full font-noto font-semibold">ភេទ :</div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full font-noto bg-secondary"
                  >
                    {/* <option value="ST">English</option>
    <option value="ST">Khmer</option>
    <option value="ST">Other</option> */}
                    <option disabled className="refresh" value="">
                      ជ្រើសរើសភេទ
                    </option>
                    <option value="Male">ប្រុស</option>
                    <option value="Female">ស្រី</option>
                  </select>
                </div>
                <div className="w-1/4 ml-1">
                  <div className=" w-full font-noto font-semibold">
                    ជំនាន់ :
                  </div>
                  <input
                    type="number"
                    className="input input-bordered  w-full bg-secondary font-noto"
                    name="generation"
                    value={formData.generation}
                    onChange={handleChange}
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
                <label className="text-xl font-noto">កែប្រែព័ត៌មាន</label>
                {/* <button type='submit' className='text-xl text-accent'>Add</button> */}
              </BtnGredient>
            </div>
          </form>
        </>
        {/* <>
          <form onSubmit={handleSubmit}>
            <div className="container w-full h-full space-y-5 font-noto">
     
              <div className='flex'>
                <div className="w-full mt-5 mr-1">
                  <div className="w-full font-semibold">លេខសម្គាល់ :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary" 
                  name="studentId" value={formData.studentId} onChange={handleInputChange} readOnly/>
                </div>
                <div className="w-full mt-5 ml-1">
                  <div className=" w-full font-semibold">ចំណងជើង :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary" 
                  name="studentName" value={formData.studentName} onChange={handleInputChange}/>
                </div>
              </div>
              <div className='flex'>
                <div className="w-full mr-1">
                  <div className=" w-full font-semibold">មហាវិទ្យាល័យ :</div>
                  <select
        name="degreeLevel"
        value={formData.degreeLevel}
        onChange={handleInputChange}
    
        className="input input-bordered w-full bg-secondary"
    >
 
    <option disabled className="refresh" value="">
                ជ្រើសរើសមហាវិទ្យាល័យ
              </option>
    {collegeData.map((e, index) => (
                      <option key={index} value={e.degreeLevel}>{e.collegeName}</option>
                    ))}

</select>
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full font-semibold">អ្នកនិពន្ធ :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary" 
                  name="generation" value={formData.generation || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className='flex'>
                <div className="w-full mr-1">
                  <div className=" w-full font-semibold">ប្រភេទ :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary" 
                  name="majorId" value={formData.majorId} onChange={handleInputChange}/>
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full font-semibold">ឆ្នាំបោះពុម្ព :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary" 
                  name="publicationYear" value={formData.publicationYear || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className='flex'>
                <div className="w-full mr-1">
                  <div className=" w-full font-semibold">ចំនួន :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary" 
                  name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </div>
                <div className="w-full">
                  <div className='ml-1'>
                    <label className="w-full font-semibold">ភាសា</label>
                    <div className="mt-3">
                      <label className="inline-flex items-center w-1/2">
                        <input
                          type="radio"
                          name="gender"
                          value="eng"
                          checked={formData.gender === 'eng'}
                          onChange={handleInputChange}
                        
                          className="form-radio h-7 text-blue-600 bg-secondary"
                        />
                        <span className="ml-2 text-accent">អង់គ្លេស</span>
                      </label>
                      <label className="inline-flex items-center w-1/2">
                        <input
                          type="radio"
                          name="gender"
                          value="kh"
                          checked={formData.gender === 'kh'}
                          onChange={handleInputChange}
                        
                          className="form-radio h-7 text-blue-600"
                        />
                        <span className="ml-2 text-accent">ខ្មែរ</span>
                      </label>
                    </div></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 content-center pt-5 pb-5">
              <BtnGredient type='submit' className="rounded-" color={'from-[#00d0ffb1] to-[#E7FBFF]'} 
              hover={'from-[#00D9FF] to-[#a5cef3]'}>
                <label className='text-xl'>Update</label>
              </BtnGredient>
            </div>
          </form></> */}
      </Modal>
    </>
  );
};

export default ModalUpdateStudent;
