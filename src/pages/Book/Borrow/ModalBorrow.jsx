import React,{useState,useEffect} from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from "../../AdminPanel/Component/BtnGredient";
import { X } from 'lucide-react';
import axios from '../../../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";
const ModalBorrow = ({ isModalVisible, closeModal,setIsModalLstVisible, entry, fetchBorrow}) => {
  if (!entry) return null;
  const [isreturn, setIsreturn] = useState(true);
  const handleRadioChange = (event) => {
    setIsreturn(event.target.value === 'return');
};
const giveBack= new Date(entry.giveBackDate);
giveBack.setDate(giveBack.getDate() + 14);
const updatedGiveBackDate = giveBack.toISOString().split('T')[0];
const handleClick = () => {
  axios.put('/borrow', null, {
      params: {
          studentId: entry.studentId,
          bookId: entry.bookId
      }
  })
  .then(response => {
      toast.success('សងសៀវភៅបានដោយជោគជ័យ!',{style:{fontFamily:' NotoSansKhmer-Regular, sans-serif'}}); // Show success toast
  })
  .catch(error => {
      toast.error('There was an error with the return request.');
      console.error(error);
  });
};

const handleContinue = () => {
  axios.put('/borrow/extend-borrow', null, {
      params: {
          id: entry.borrowId
      }
  })
  .then(response => {
      toast.success('បានបន្តការខ្ចីដោយជោយជ័យ!',{style:{fontFamily:' NotoSansKhmer-Regular, sans-serif'}}); // Show success toast
  })
  .catch(error => {
      toast.error('There was an error with the continue request.');
      console.error(error);
  });
};
  return (
    <>
        <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className="container w-full h-full space-y-5 font-noto">
                    <div className="header-modal flex items-center justify-between">
                        <div className="radio-container flex space-x-3">
                            {/* <input type="radio" id='continueRadio' name="entryType" value="continue" className="radio radio-accent" onChange={handleRadioChange} checked={!isreturn} /> */}
                            <div className="radio-container flex space-x-3 text-[20px] font-semibold">
                                <input type="radio" id='returnRadio' name="entryType" value="return" className="radio radio-accent" onChange={handleRadioChange} checked={isreturn} />
                                <label htmlFor="returnRadio">សងសៀវភៅ</label>
                                <input type="radio" id='continueRadio' name="entryType" value="continue" className="radio radio-accent" onChange={handleRadioChange} checked={!isreturn} />
                                <label htmlFor="continueRadio">បន្តខ្ចី</label>
                            </div>
                        </div>
                        <button onClick={closeModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
                            <X/>
                        </button>
                    </div>
                    {/* Write here */}
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">លេខសម្គាល់ :</div>
                      <div className="inline-block"><p>{entry.bookId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">អត្តលេខនិស្សិត :</div>
                      <div  className="inline-block"><p>{entry.studentId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">កាលបរិច្ឆេទខ្ចី :</div>
                      <div className="inline-block"><p>{entry.borrowDate}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">កាលបរិច្ឆេទត្រូវសង:</div>
                      <div className="inline-block"><p>{entry.giveBackDate}</p></div>
                    </div>
                    {isreturn ? (
                        <div className="grid grid-cols-1 gap-4 content-center pb-5 pt-5">   
                        <BtnGredient onClick={handleClick} className="content-center">
                                    <p className='text-[20px]'>សងឥឡូវ</p>
                                    </BtnGredient>
                                    </div>
                    ) : (
                      <>
                        <div className="w-full">
                        <div className="inline-block font-bold w-1/3">លើកទៅ :</div>
                        <div className="inline-block"><p>{updatedGiveBackDate}</p></div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 content-center pb-5 pt-5">   
                          <BtnGredient className="content-center" onClick={handleContinue}>
                            <p className='text-[20px]'>បន្តខ្ចី</p>
                          </BtnGredient>
                        </div>
                      </>
                    )}
                    <Toaster/>
                </div>
            </Modal>
    </>
  )
}

export default ModalBorrow