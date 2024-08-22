import React, { useState } from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from '../BtnGredient';
import excel from '../../../assets/image/excel.svg';
import add from '../../../assets/image/add.svg';
import { X } from 'lucide-react';
import axios from "../../../api/axios";
const ModalAdd = ({ isModalVisible, handleCloseModal }) => {
  const [formData, setFormData] = useState({
    bookId: '',
    bookTitle: '',
    bookQuan: '',
    languageId: '',
    collegeId: '',
    author: '',
    publicationYear: '',
    genre: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/book', formData)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };
  return (
    <>
        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <div className="container w-full h-full space-y-5">
                    <div className="header-modal flex items-center justify-between">
      
                            {/* <input type="radio" id='guestRadio' name="entryType" value="guest" className="radio radio-accent" onChange={handleRadioChange} checked={!isStudent} /> */}
                            <label>Add Book</label>
                            <div className="flex justify-end mt-0">
                        <BtnGredient className="rounded-" color={'from-[#ffffff] to-[#0b701a]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
                            <img src={excel} alt="excel" width={24} height={24} />
                                <p>Import form Excel</p>
                                </BtnGredient>
                        </div>
                        <button onClick={handleCloseModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
                            <X/>
                        </button>
                    </div>
                    </div>
                    
                      <>
                      <form onSubmit={handleSubmit}>
                    <div className="container w-full h-full space-y-5">
                    {/* Write here */}
                    <div className="w-full mt-5">
                      <div className="inline-block w-1/5">ID :</div>
                    <input type="text" className="input input-bordered inline-block w-4/5" name="bookId" value={formData.bookId} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Title :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" name="bookTitle" value={formData.bookTitle} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">College :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" name="collegeId" value={formData.collegeId} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Author :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Genre :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" name="genre" value={formData.genre} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Public Year :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" name="publicationYear" value={formData.publicationYear} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Quantity :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" name="bookQuan" value={formData.bookQuan} onChange={handleChange} required />
                    </div>
                    <div className="w-full">
                    <div>
        <label className="block text-sm font-medium text-accent">Choose Language</label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="languageId" 
              value="Eng" 
              checked={formData.languageId === 'Eng'} 
              onChange={handleChange} 
              required 
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-accent">English</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="languageId" 
              value="Kh" 
              checked={formData.languageId === 'Kh'} 
              onChange={handleChange} 
              required 
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-accent">Khmer</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="languageId" 
              value="Other" 
              checked={formData.languageId === 'Other'} 
              onChange={handleChange} 
              required 
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-accent">Other</span>
          </label>
        </div></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 content-center p-5">   
                <BtnGredient className="rounded-" color={'from-[#1b0bc6] to-[#0d849f]'} hover={'hover:from-[#0d849f] hover:to-[#1b0bc6]'}>
                        <img src={add} alt="add" width={30} height={30} />
                            <div type="submit" className='text-xl text-accent'>Add</div>
                            </BtnGredient>
                            </div>
                            </form></>
            </Modal>
    </>
  )
}

export default ModalAdd