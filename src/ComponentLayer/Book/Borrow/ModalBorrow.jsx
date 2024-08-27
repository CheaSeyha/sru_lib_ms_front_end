import React,{useState,useEffect} from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from "../../AdminPanel/Component/BtnGredient";
import { X } from 'lucide-react';
import axios from '../../../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";
const ModalBorrow = ({ isModalVisible, closeModal, entry, fetchBorrow}) => {
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
      toast.log('Borrow request successful:', response.data);
      // Handle successful response, e.g., show a success message
  useEffect(() => {
    fetchBorrow();
  }, []);
};
  return (
    <>
        <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className="container w-full h-full space-y-5">
                    <div className="header-modal flex items-center justify-between">
                        <div className="radio-container flex space-x-3">
                            {/* <input type="radio" id='continueRadio' name="entryType" value="continue" className="radio radio-accent" onChange={handleRadioChange} checked={!isreturn} /> */}
                            <div className="radio-container flex space-x-3">
                                <input type="radio" id='returnRadio' name="entryType" value="return" className="radio radio-accent" onChange={handleRadioChange} checked={isreturn} />
                                <label htmlFor="returnRadio">Return</label>
                                <input type="radio" id='continueRadio' name="entryType" value="continue" className="radio radio-accent" onChange={handleRadioChange} checked={!isreturn} />
                                <label htmlFor="continueRadio">Continue</label>
                            </div>
                        </div>
                        <button onClick={closeModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
                            <X/>
                        </button>
                    </div>
                    {/* Write here */}
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">Book ID :</div>
                      <div className="inline-block"><p>{entry.bookId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">Student ID :</div>
                      <div  className="inline-block"><p>{entry.studentId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">Borrow Date :</div>
                      <div className="inline-block"><p>{entry.borrowDate}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3 font-bold">Return date:</div>
                      <div className="inline-block"><p>{entry.giveBackDate}</p></div>
                    </div>
                    {isreturn ? (
                        <div className="grid grid-cols-1 gap-4 content-center p-5">   
                        <BtnGredient onClick={handleClick} className="content-center">
                                    <p>Return</p>
                                    </BtnGredient>
                                    </div>
                    ) : (
                      <>
                        <div className="w-full">
                        <div className="inline-block font-bold w-1/3">Continue Date :</div>
                        <div className="inline-block"><p>{updatedGiveBackDate}</p></div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 content-center p-5">   
                          <BtnGredient className="content-center">
                            <p>Continue</p>
                          </BtnGredient>
                        </div>
                      </>
                    )}
                </div>
                <Toaster/>
            </Modal>
    </>
  )
}

export default ModalBorrow