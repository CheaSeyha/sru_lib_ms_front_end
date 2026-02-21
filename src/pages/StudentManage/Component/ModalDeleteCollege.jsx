import React, { useState, useEffect } from "react";
import Modal from "../../../layout/components/Modal";
import BtnGredient from "../../Book/BtnGredient";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import ExcelStudent from "./ExcelStudent";
const ModalDeleteCollege = ({
  isModalVisible,
  handleCloseModal,
  fetchcollege,
  entry,
}) => {
  if (!entry) return null;
  // Function to handle radio button changes for dateOfBirth
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    axios
      .delete(`/college/${entry.collegeId}`)
      .then((response) => {
        toast.success(`បានបានលុបជំនាញ${entry.collegeName}ដោយជោគជ័យ!!!`, {
          style: { fontFamily: " NotoSansKhmer-Regular, sans-serif" },
        });

        fetchcollege(); // Refresh the list after adding the new book
        handleCloseModal();
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
              លុបមហាវិទ្យាល័យ
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
              <div className="flex">
                <div className="w-full mr-1">
                  <div className=" w-full font-noto text-xl">
                    តើអ្នកពិតជាចង់លុបមហាវិទ្យាល័យ​ {entry.collegeName}{" "}
                    មែនដែរឬទេ?:
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 content-center pt-5 pb-5">
              <BtnGredient
                type="submit"
                className="rounded-"
                color={"from-[#ff0000] to-[#fe8383]"}
                hover={"from-[#fe8383] to-[#ff0000]"}
              >
                <label className="text-xl font-noto">បាទ/ចា៎ស</label>
                {/* <button type='submit' className='text-xl text-accent'>Add</button> */}
              </BtnGredient>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default ModalDeleteCollege;
