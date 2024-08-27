import React, { useState } from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from '../BtnGredient';
import { X } from 'lucide-react';
import axios from "../../../api/axios";
import ExcelImported from './ExcelImported';
import toast, { Toaster } from 'react-hot-toast';
const ModalAdd = ({ isModalVisible, handleCloseModal,fetchBooks }) => {
  const [formData, setFormData] = useState({
    bookId: "",
    bookTitle: "",
    bookQuan: "",
    languageId: "",
    collegeId: "",
    author: "",
    publicationYear: "",
    genre: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For author and publicationYear, set to null if empty
    if (name === 'author' || name === 'publicationYear') {
      setFormData({
        ...formData,
        [name]: value.trim() === '' ? null : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  // Function to handle radio button changes for languageId
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = [{
      ...formData,
      // Explicitly set author and publicationYear to null if they are empty strings
      author: formData.author === '' ? null : formData.author,
      publicationYear:
        formData.publicationYear === '' ? null : Number(formData.publicationYear),
      // Convert bookQuan to a number if necessary
      bookQuan: Number(formData.bookQuan),
    },];
    // try {
       axios.post('/book', submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
          toast.success('Form submitted successfully!'); 
          fetchBooks(); // Refresh the list after adding the new book
      })
      .catch(error => {
        // Handle error based on the response
        if (error.response) {
          console.error('Backend Error:', error.response.data);
          if (error.response.status === 400) {
            toast.error('Validation error, please check your input.');
          } else if (error.response.status === 500) {
            toast.error('Server error, please try again later.');
          } else {
            toast.error('There was an error submitting the form.');
          }
        } else {
          console.error('Submission Error:', error.message);
          toast.error('There was an error submitting the form.');
        }
      });
  };
  return (
    <>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <div className="container w-full h-full space-y-5">
          <div className="header-modal flex items-center justify-between">
            {/* <input type="radio" id='guestRadio' name="entryType" value="guest" className="radio radio-accent" onChange={handleRadioChange} checked={!isStudent} /> */}
            <label>Add Book</label>
            <div className="flex justify-end mt-0 w-2/3">
              <ExcelImported fetchBooks={fetchBooks}/>
            </div>
            <button onClick={handleCloseModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
              <X />
            </button>
          </div>
        </div>
        <>
          <form onSubmit={handleSubmit}>
            <div className="container w-full h-full space-y-5">
              {/* Write here */}
              <div className='flex'>
                <div className="w-full mt-5 mr-1">
                  <div className="w-full">ID :</div>
                  <input type="text" className="input input-bordered  w-full" name="bookId" value={formData.bookId} onChange={handleChange} required />
                </div>
                <div className="w-full mt-5 ml-1">
                  <div className=" w-full">Title :</div>
                  <input type="text" className="input input-bordered  w-full" name="bookTitle" value={formData.bookTitle} onChange={handleChange} required />
                </div>
              </div>
              <div className='flex'>
                <div className="w-full mr-1">
                  <div className=" w-full ">College :</div>
                  <input type="text" className="input input-bordered  w-full" name="collegeId" value={formData.collegeId} onChange={handleChange} required />
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full">Author :</div>
                  <input type="text" className="input input-bordered  w-full" name="author" value={formData.author || ''} onChange={handleChange} />
                </div>
              </div>
              <div className='flex'>
                <div className="w-full mr-1">
                  <div className=" w-full">Genre :</div>
                  <input type="text" className="input input-bordered  w-full" name="genre" value={formData.genre} onChange={handleChange} required />
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full">Public Year :</div>
                  <input type="text" className="input input-bordered  w-full" name="publicationYear" value={formData.publicationYear || ''} onChange={handleChange} />
                </div>
              </div>
              <div className='flex'>
                <div className="w-full mr-1">
                  <div className=" w-full">Quantity :</div>
                  <input type="text" className="input input-bordered  w-full" name="bookQuan" value={formData.bookQuan} onChange={handleChange} required />
                </div>
                <div className="w-full">
                  <div className='ml-1'>
                    <label className="w-full">Choose Language</label>
                    <div className="mt-3">
                      <label className="inline-flex items-center w-1/3">
                        <input
                          type="radio"
                          name="languageId"
                          value="eng"
                          checked={formData.languageId === 'eng'}
                          onChange={handleChange}
                          required
                          className="form-radio h-7 text-blue-600"
                        />
                        <span className="ml-2 text-accent">english</span>
                      </label>
                      <label className="inline-flex items-center w-1/3">
                        <input
                          type="radio"
                          name="languageId"
                          value="kh"
                          checked={formData.languageId === 'kh'}
                          onChange={handleChange}
                          required
                          className="form-radio h-7 text-blue-600"
                        />
                        <span className="ml-2 text-accent">Khmer</span>
                      </label>
                      <label className="inline-flex items-center w-1/3">
                        <input
                          type="radio"
                          name="languageId"
                          value="other"
                          checked={formData.languageId === 'other'}
                          onChange={handleChange}
                          required
                          className="form-radio h-7 text-blue-600"
                        />
                        <span className="ml-2 text-accent">other</span>
                      </label>
                    </div></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 content-center pt-5 pb-5">
              <BtnGredient type='submit' className="rounded-" color={'from-[#00d0ffb1] to-[#E7FBFF]'} hover={'from-[#00D9FF] to-[#a5cef3]'}>
                <label className='text-xl'>Add</label>
                {/* <button type='submit' className='text-xl text-accent'>Add</button> */}
              </BtnGredient>
            </div>
          </form></>
        <Toaster position='bottom-center' />
      </Modal>
    </>
  )
}

export default ModalAdd