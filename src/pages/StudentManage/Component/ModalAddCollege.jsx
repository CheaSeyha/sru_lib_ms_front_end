import React, { useState, useEffect } from "react";
import Modal from "../../../layout/components/Modal";
import BtnGredient from "../../Book/BtnGredient";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import ExcelStudent from "./ExcelStudent";
const ModalAddMajor = ({ isModalVisible, handleCloseModal, fetchmajor }) => {
  const [collegedata, setcollegedata] = useState([]);
  const [formData, setFormData] = useState({
    majorId: "",
    majorName: "",
    collegeId: "",
  });
  useEffect(() => {
    axios.get("/college").then((response) => {
      // Filter books where isActive is true
      setcollegedata(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Function to handle radio button changes for dateOfBirth
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
    };
    // try {
    axios
      .post("/major", submissionData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("បានបញ្ចូលជំនាញដោយជោគជ័យ!!!", {
          style: { fontFamily: " NotoSansKhmer-Regular, sans-serif" },
        });
        setFormData({
          majorId: "",
          majorName: "",
          collegeId: "",
        });
        handleCloseModal();
        fetchmajor(); // Refresh the list after adding the new book
      })
      .catch((error) => {
        // Handle error based on the response
        toast.error("មិនអាចបញ្ចួលបានទេ!!!.");
        console.log(error);
      });
  };
  return (
    <>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <div className="container w-full h-full space-y-5">
          <div className="header-modal flex items-center justify-between">
            {/* <input type="radio" id='guestRadio' name="entryType" value="guest" className="radio radio-accent" onChange={handleRadioChange} checked={!isStudent} /> */}
            <label className="font-noto font-semibold text-lg">
              បន្ថែមមហាវិទ្យាល័យ
            </label>
            {/* <div className="flex justify-end mt-0 w-2/3">
            </div> */}
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
              <div className="flex mt-5">
                <div className="w-full mr-1">
                  <div className="w-full font-noto font-semibold">
                    លេខជំនាញ​ :
                  </div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary font-noto"
                    name="majorId"
                    value={formData.majorId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mr-1 w-full">
                  <div className=" font-noto font-semibold">មហាវិទ្យាល័យ :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary font-noto"
                    name="majorName"
                    value={formData.majorName}
                    onChange={handleChange}
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
                {/* <button type='submit' className='text-xl text-accent'>Add</button> */}
              </BtnGredient>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default ModalAddMajor;
