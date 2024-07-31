import React,{useState} from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from "../../AdminPanel/Component/BtnGredient";
import { X } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ModalBorrow = ({ isModalVisible, closeModal, entry }) => {
  if (!entry) return null;
  const [isreturn, setIsreturn] = useState(true);
  const handleRadioChange = (event) => {
    setIsreturn(event.target.value === 'return');
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
                      <div className="inline-block w-1/3">ID :</div>
                      <div className="inline-block"><p>{entry.ID}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3">return ID :</div>
                      <div  className="inline-block"><p>{entry.StuId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3">Book ID :</div>
                      <div className="inline-block"><p>{entry.BookId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3">Date :</div>
                      <div className="inline-block"><p>{entry.Date}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/3">Expire Date :</div>
                      <div className="inline-block"><p>{entry.Expire}</p></div>
                    </div>
                    {isreturn ? (
                        <div className="grid grid-cols-1 gap-4 content-center p-5">   
                        <BtnGredient className="content-center">
                                    <p>Return</p>
                                    </BtnGredient>
                                    </div>
                    ) : (
                      <>
                        <div className="w-full">
                        <div className="inline-block w-1/3">Continue Date :</div>
                        <DatePicker
                        selected={new Date}
                        dateFormat="dd/MM/yyyy"
                        className="input input-bordered w-full bg-primary pointer-events-none border-0 p-0"
                        /></div>
                        <div className="grid grid-cols-1 gap-4 content-center p-5">   
                          <BtnGredient className="content-center">
                            <p>Continue</p>
                          </BtnGredient>
                        </div>
                      </>
                    )}
                </div>
                
            </Modal>
    </>
  )
}

export default ModalBorrow