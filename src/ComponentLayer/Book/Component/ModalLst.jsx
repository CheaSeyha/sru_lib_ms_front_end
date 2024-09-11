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
      toast.success('ខ្ចីសៀវភៅដោយជោគជ័យ!',{style:{fontFamily:' NotoSansKhmer-Regular, sans-serif'}});
      fetchBooks(); 
    })
      .catch(error => {
        toast.error('សូមជ្រើសរើសនិស្សិត!!!',{style:{fontFamily:' NotoSansKhmer-Regular, sans-serif'}})
        console.error('Backend Error:', error.response.data);
      });
  };
  return (
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        <div className="container w-full h-full space-y-5">
          <div className="header-modal flex items-center justify-between">
            <label className='text-[24px] font-noto'>ខ្ចីសៀវភៅ</label>
            <button onClick={closeModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
              <X />
            </button>
          </div>
        </div>
          <div className="container w-full h-full space-y-5 pt-5 font-noto">
            {/* Write here */}
            <div className="flex">
              <div className="w-full">
                <div className=" w-2/5 font-semibold">លេខសម្គាល់ :</div>
                <div className=" input-bordered"><p>{entry.bookId}</p></div>
              </div>
              <div className="w-full">
                <div className=" w-2/5 font-semibold">ចំណងជើង :</div>
                <div className=""><p>{entry.bookTitle}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className=" w-2/5 font-semibold">មហាវិទ្យាល័យ :</div>
                <div className=""><p>{entry.collegeId}</p></div>
              </div>
              <div className="w-full">
                <div className=" w-2/5 font-semibold">ភាសា :</div>
                <div className=""><p>{entry.languageId}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className=" w-2/5 font-semibold">ប្រភេទ :</div>
                <div className=""><p>{entry.genre}</p></div>
              </div>
              <div className="w-full">
                <div className=" w-2/5 font-semibold">អ្នកនិពន្ធ :</div>
                <div className=""><p>{entry.author ?? 'N/A'}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className=" w-2/5 font-semibold">ឆ្នាំបោះពុម្ព :</div>
                <div className=""><p>{entry.publicationYear ?? 'N/A'}</p></div>
              </div>
              <div className="w-full">
                <div className=" w-2/5 font-semibold">ចំនួនសរុប :</div>
                <div className=""><p>{entry.bookQuan}</p></div>
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className=" w-2/5 font-semibold">និស្សិត</div>
                <div className=" w-4/5 pt-5">
                  <select id="stuId" onChange={handleChangestudent} className="select font-noto select-bordered  bg-base-300 w-full pr-5">
                    <option disabled className="refresh" value="" selected>ជ្រើសរើសនិស្សិត</option>
                    {studetnEntryData.map((e, index) => (
                      <option key={index} value={e.studentId}>{e.studentId} {e.studentName}</option>
                    ))}
                    {/* <option value="200739">Phel</option> */}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className=" w-full font-semibold">ចំនួនខ្ចី</div>
                <div className=" w-4/5 pt-5">
                  <select id="quantity" value={selectedQuantity} onChange={handleChange} className="select select-bordered  bg-base-300 w-full">
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
              <p className='font-noto'>ខ្ចីឥឡូវ</p>
            </BtnGredient>
          </div>
      </Modal>
  )
};

export default ModalLst;