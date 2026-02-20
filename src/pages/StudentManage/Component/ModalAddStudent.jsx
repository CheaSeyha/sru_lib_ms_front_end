import React, { useState, useEffect } from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from '../../Book/BtnGredient';
import { X } from 'lucide-react';
import axios from "../../../api/axios";
import toast, { Toaster } from 'react-hot-toast';
import ExcelStudent from './ExcelStudent';
const ModalAddStudent = ({ isModalVisible, handleCloseModal, fetchStudent }) => {
  const [degreedata, setdegreedata] = useState([]);
  const [majordata, setmajordata] = useState([]);
  const dateToday = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    gender: "",
    dateOfBirth: "",
    degreeLevelId: "",
    majorId: "",
    generation: "",
  });
  useEffect(() => {
    axios.get('/degree-level')
      .then(response => {
        // Filter books where isActive is true
        setdegreedata(response.data);
      });
  }, []);
  useEffect(() => {
    axios.get('/major')
      .then(response => {
        // Filter books where isActive is true
        setmajordata(response.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For majorId and publicationYear, set to null if empty
    if (name === 'majorId' || name === 'publicationYear') {
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
  // Function to handle radio button changes for dateOfBirth
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      // Convert studentId to a number if necessary
      studentId: Number(formData.studentId),
      generation: Number(formData.generation),
    };
    // try {
    axios.post('/student', submissionData, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      toast.success('បានបញ្ចូលសៀវភៅដោយជោគជ័យ!!!', { style: { fontFamily: ' NotoSansKhmer-Regular, sans-serif' } });
      setFormData({
        studentId: "",
        studentName: "",
        gender: "",
        dateOfBirth: "",
        degreeLevelId: "",
        majorId: "",
        publicationYear: "",
        generation: ""
      })
      fetchStudent(); // Refresh the list after adding the new book
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
            <label className='font-noto font-semibold text-lg'>បន្ថែមនិស្សិតថ្មី</label>
            <div className="flex justify-end mt-0 w-2/3">
              <ExcelStudent fetchStudent={fetchStudent} />
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
                  <div className="w-full font-noto font-semibold">អត្តលេខ :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary font-noto" name="studentId" value={formData.studentId} onChange={handleChange} required />
                </div>
                <div className="w-full mt-5 ml-1">
                  <div className=" w-full font-noto font-semibold">ឈ្មោះ :</div>
                  <input type="text" className="input input-bordered  w-full bg-secondary font-noto" name="studentName" value={formData.studentName} onChange={handleChange} required />
                </div>
              </div>
              <div className='flex'>
                <div className="w-full mr-1">
                  <div className=" w-full font-noto font-semibold">កម្រិត :</div>
                  <select
                    name="degreeLevelId"
                    value={formData.degreeLevelId}
                    onChange={handleChange}
                    required
                    className="select select-bordered w-full font-noto bg-secondary"
                  >
                    {/* <option value="ST">English</option>
    <option value="ST">Khmer</option>
    <option value="ST">Other</option> */}
                    <option disabled className="refresh" value="">
                      ជ្រើសរើសកម្រិតសិក្សា
                    </option>
                    {degreedata.map((e, index) => (
                      <option key={index} value={e.degreeLevelId}>{e.degreeLevelId === 'ac' ? 'បរិញ្ញាប័ត្ររង' : e.degreeLevelId === 'bc' ? 'បរិញ្ញាប័ត្រ' : 'អនុបណ្ឌិត'}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full ml-1">
                  <div className=" w-full font-noto font-semibold">ថ្ងៃ ខែ ឆ្នាំកំណើត :</div>
                  <input type="date" className="input input-bordered  w-full bg-secondary font-noto" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleChange} />
                </div>
              </div>
              <div className='flex'>
                <div className="mr-1 w-1/2">
                  <div className=" font-noto font-semibold">ជំនាញ :</div>
                  <select
                    name="majorId"
                    value={formData.majorId}
                    onChange={handleChange}
                    required
                    className="select select-bordered w-full font-noto bg-secondary"
                  >
                    {/* <option value="ST">English</option>
    <option value="ST">Khmer</option>
    <option value="ST">Other</option> */}
                    <option disabled className="refresh" value="">
                      ជ្រើសរើសជំនាញ
                    </option>
                    {majordata.map((e, index) => (
                      <option key={index} value={e.majorId}>{e.majorName}</option>
                    ))}
                  </select>
                </div>
                <div className=" ml-1 w-1/4">
                  <div className=" w-full font-noto font-semibold">ភេទ :</div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="select select-bordered w-full font-noto bg-secondary"
                  >
                    {/* <option value="ST">English</option>
    <option value="ST">Khmer</option>
    <option value="ST">Other</option> */}
                    <option disabled className="refresh" value="">
                      ជ្រើសរើសភេទ
                    </option>
                    <option value='ប្រុស'>ប្រុស</option>
                    <option value='ស្រី'>ស្រី</option>
                  </select>
                </div>
                <div className="w-1/4 ml-1">
                  <div className=" w-full font-noto font-semibold">ជំនាន់ :</div>
                  <input type="number" className="input input-bordered  w-full bg-secondary font-noto" name="generation" value={formData.generation} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 content-center pt-5 pb-5">
              <BtnGredient type='submit' className="rounded-" color={'from-[#00d0ffb1] to-[#E7FBFF]'} hover={'from-[#00D9FF] to-[#a5cef3]'}>
                <label className='text-xl font-noto'>បញ្ចូល</label>
                {/* <button type='submit' className='text-xl text-accent'>Add</button> */}
              </BtnGredient>
            </div>
          </form></>
      </Modal>
    </>
  )
}

export default ModalAddStudent