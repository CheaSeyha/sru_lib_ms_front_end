import React, { useState } from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from '../BtnGredient';
import { X } from 'lucide-react';
import useScanEntry from '../../Hook/useScanEntry';
import axios from "../../../api/axios";
import toast, { Toaster } from 'react-hot-toast';
const ModalLst = ({ isModalVisible, closeModal, entry,fetchBooks }) => {
  if (!entry) return null;
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleChange = (event) => {
    setSelectedQuantity(event.target.value);
  };
  const [selectedStudent, setSelectedStudent] = useState();

  const handleChangestudent = (event) => {
    setSelectedStudent(event.target.value);
  };
  const { studetnEntryData } = useScanEntry();
  const submitData = {
    studentId: selectedStudent,
    bookId: entry.bookId,
    bookQuan: selectedQuantity
  };
  const handleClick = (event) => {
    axios.post('/borrow', submitData, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      toast.success('Borrow successfully!');
      fetchBooks(); 
    })
      .catch(error => {
        toast.error('Please select student!')
        console.error('Backend Error:', error.response.data);
      });
  };
  return (
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        <div className="container w-full h-full space-y-5">
          <div className="header-modal flex items-center justify-between">
            <label className='text-[24px]'>Borrow Book</label>
            <button onClick={closeModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
              <X />
            </button>
          </div>
        </div>
          <div className="container w-full h-full space-y-5 pt-5">
            {/* Write here */}
            <div className="flex">
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">ID :</div>
                <div className="inline-block"><p>{entry.bookId}</p></div>
              </div>
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">Title :</div>
                <div className="inline-block"><p>{entry.bookTitle}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">College :</div>
                <div className="inline-block"><p>{entry.collegeId}</p></div>
              </div>
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">Language :</div>
                <div className="inline-block"><p>{entry.languageId}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">Genre :</div>
                <div className="inline-block"><p>{entry.genre}</p></div>
              </div>
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">Author :</div>
                <div className="inline-block"><p>{entry.author ?? 'N/A'}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">Public :</div>
                <div className="inline-block"><p>{entry.publicationYear ?? 'N/A'}</p></div>
              </div>
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">Total Qty:</div>
                <div className="inline-block"><p>{entry.bookQuan}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="inline-block w-2/5 font-bold">Student</div>
                <div className="inline-block w-4/5 pt-5">
                  <select id="stuId" onChange={handleChangestudent} className="select select-bordered inline-block bg-base-300 w-full pr-5">
                    <option disabled className="refresh" value="" selected>Select Student</option>
                    {studetnEntryData.map((e, index) => (
                      <option key={index} value={e.studentId}>{e.studentId} {e.studentName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="inline-block w-full font-bold">Quantity</div>
                <div className="inline-block w-4/5 pt-5">
                  <select id="quantity" value={selectedQuantity} onChange={handleChange} className="select select-bordered inline-block bg-base-300 w-full">
                    <option disabled value="">Select quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 content-center pt-5 bg-">
            <BtnGredient onClick={handleClick} className="content-center" color={'from-[#00d0ffb1] to-[#E7FBFF]'} hover={'hover:from-[#8cfc9d] hover:to-[#cabef8] hover:scale-90'}>
              <p>Borrow</p>
            </BtnGredient>
          </div>
        <Toaster position='bottom-center' />
      </Modal>
  )
};

export default ModalLst;