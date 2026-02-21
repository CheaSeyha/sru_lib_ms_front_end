import React, { useState, useEffect } from "react";
import Modal from "../../../layout/components/Modal";
import BtnGredient from "../BtnGredient";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import ExcelImported from "./ExcelImported";
import toast, { Toaster } from "react-hot-toast";
const ModalUpdateBook = ({
  isModalVisible,
  handleCloseModal,
  fetchBooks,
  rowSelected,
  setRowSelected,
}) => {
  const [formData, setFormData] = useState({
    bookId: "",
    bookTitle: "",
    bookQuan: "",
    languageId: "",
    author: "",
    publicationYear: "",
    genre: "",
    collegeId: "",
  });
  const [collegeData, setCollegeData] = useState([]);
  useEffect(() => {
    axios.get("/college").then((response) => {
      // Filter books where isActive is true
      setCollegeData(response.data);
    });
  }, []);
  useEffect(() => {
    if (rowSelected && rowSelected.length > 0) {
      const selectedBook = rowSelected[0];
      setFormData({
        bookId: selectedBook.bookId || "",
        bookTitle: selectedBook.bookTitle || "",
        bookQuan: selectedBook.bookQuan || "",
        languageId: selectedBook.languageId || "",
        author: selectedBook.author || "",
        publicationYear: selectedBook.publicationYear || "",
        genre: selectedBook.genre || "",
        collegeId: selectedBook.collegeId || "",
      });
    }
  }, [rowSelected]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateResponse = await axios.put("/book", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (updateResponse.status === 202 || updateResponse.status === 200) {
        toast.success("Book updated successfully!");
        fetchBooks();
        handleCloseModal();
        setRowSelected([]);
      } else {
        toast.error("Failed to update book. Please try again.");
      }
    } catch (error) {
      console.error("There was an error updating the book:", error);
      toast.error("An error occurred while updating the book.");
    }
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
            <div className="container w-full h-full space-y-5 font-noto">
              {/* Write here */}
              <div className="flex">
                <div className="w-full mt-5 mr-1">
                  <div className="w-full font-semibold">លេខសម្គាល់ :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary"
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
                <div className="w-full mt-5 ml-1">
                  <div className=" w-full font-semibold">ចំណងជើង :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-full mr-1">
                  <div className=" w-full font-semibold">មហាវិទ្យាល័យ :</div>
                  <select
                    name="collegeId"
                    value={formData.collegeId}
                    onChange={handleInputChange}
                    required
                    className="input input-bordered w-full bg-secondary"
                  >
                    {/* <option value="ST">English</option>
    <option value="ST">Khmer</option>
    <option value="ST">Other</option> */}
                    <option disabled className="refresh" value="">
                      ជ្រើសរើសមហាវិទ្យាល័យ
                    </option>
                    {collegeData.map((e, index) => (
                      <option key={index} value={e.collegeId}>
                        {e.collegeName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full font-semibold">អ្នកនិពន្ធ :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary"
                    name="author"
                    value={formData.author || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-full mr-1">
                  <div className=" w-full font-semibold">ប្រភេទ :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full font-semibold">ឆ្នាំបោះពុម្ព :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary"
                    name="publicationYear"
                    value={formData.publicationYear || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-full mr-1">
                  <div className=" w-full font-semibold">ចំនួន :</div>
                  <input
                    type="text"
                    className="input input-bordered  w-full bg-secondary"
                    name="bookQuan"
                    value={formData.bookQuan}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full">
                  <div className="ml-1">
                    <label className="w-full font-semibold">ភាសា</label>
                    <div className="mt-3">
                      <label className="inline-flex items-center w-1/2">
                        <input
                          type="radio"
                          name="languageId"
                          value="eng"
                          checked={formData.languageId === "eng"}
                          onChange={handleInputChange}
                          required
                          className="form-radio h-7 text-blue-600 bg-secondary"
                        />
                        <span className="ml-2 text-accent">អង់គ្លេស</span>
                      </label>
                      <label className="inline-flex items-center w-1/2">
                        <input
                          type="radio"
                          name="languageId"
                          value="kh"
                          checked={formData.languageId === "kh"}
                          onChange={handleInputChange}
                          required
                          className="form-radio h-7 text-blue-600"
                        />
                        <span className="ml-2 text-accent">ខ្មែរ</span>
                      </label>
                    </div>
                  </div>
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
                <label className="text-xl">Update</label>
                {/* <button type='submit' className='text-xl text-accent'>Add</button> */}
              </BtnGredient>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default ModalUpdateBook;
