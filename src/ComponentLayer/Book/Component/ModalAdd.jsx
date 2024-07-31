import React from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from '../BtnGredient';
import excel from '../../../assets/image/excel.svg';
import add from '../../../assets/image/add.svg';
import { X } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
const ModalAdd = ({ isModalVisible, handleCloseModal }) => {
  const [isadd, setIsadd] = useState(true);
  const handleRadioChange = (event) => {
    setIsadd(event.target.value === 'add');
};
const [searchDate, setSearchDate] = useState(new Date());
  return (
    <>
        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                <div className="container w-full h-full space-y-5">
                    <div className="header-modal flex items-center justify-between">
      
                            {/* <input type="radio" id='guestRadio' name="entryType" value="guest" className="radio radio-accent" onChange={handleRadioChange} checked={!isStudent} /> */}
                            <div className="radio-container flex space-x-3">
                                <input type="radio" id='addRadio' name="entryType" value="add" className="radio radio-accent" onChange={handleRadioChange} checked={isadd} />
                                <label htmlFor="addRadio">add</label>
                                <input type="radio" id='sponsorRadio' name="entryType" value="sponsor" className="radio radio-accent" onChange={handleRadioChange} checked={!isadd} />
                                <label htmlFor="sponsorRadio">Sponsor</label>
                            </div>
                        <button onClick={handleCloseModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
                            <X/>
                        </button>
                    </div>
                    </div>
                    {isadd ? (
                      <>
                    <label>Add Book</label>
                        <div className="flex justify-end mt-0">
                        <BtnGredient className="rounded-" color={'from-[#ffffff] to-[#0b701a]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
                        <img src={excel} alt="excel" width={24} height={24} />
                            <p>Import form Excel</p>
                            </BtnGredient>
                        </div>
                    <div className="container w-full h-full space-y-5">
                    {/* Write here */}
                    <div className="w-full mt-5">
                      <div className="inline-block w-1/5">ID :</div>
                    <input type="text" className="input input-bordered inline-block w-4/5"/>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Title :</div>
                    <input type="text" className="input input-bordered inline-block w-4/5"/>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Number :</div>
                    <input type="text" className="input input-bordered inline-block w-4/5"/>
                    </div>
                    <div className="inline-block w-1/5"> </div>
                    <div className="inline-block w-4/5">
                      <div className="flex justify-between space-x-4 mb-4">
                    {/* <input type="text" className="input input-bordered inline-block w-4/5 bg-white text-black"/> */}
                    <select id="position" className="select select-bordered inline-block bg-base-300 data-twe-select-placeholder">
                                <option disabled value="" selected>Select Type</option>
                                <option value="option1">History</option>
                                <option value="option2">Science</option>
                    </select>
                            <select id="position"  className="select select-bordered inline-block bg-base-300 ">
                                <option disabled value="" selected>Select College</option>
                                <option value="option1">History</option>
                                <option value="option2">Science</option>
                    </select>
                    </div>
                    </div>
                    <div className="w-full">
                      <div className="container-check-language content-center grid grid-cols-6 sm:grid-cols-4 gap-5 pl-28">
                            <div className="check-purpose flex items-center space-x-2">
                                <input type="radio" id='read_book' name="language" className="checkbox checkbox-info checkbox-sm" />
                                <label htmlFor="read_book" >Khmer</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2">
                                <input type="radio" id='assignment' name="language"  className="checkbox checkbox-info checkbox-sm" />
                                <label htmlFor="assignment">English</label>
                            </div>
                            <div className="check-purpose flex items-center space-x-2 ">
                                <input type="radio" id='assignment' name="language"  className="checkbox checkbox-info checkbox-sm" />
                                <label htmlFor="assignment">Other</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 content-center p-5">   
                <BtnGredient className="rounded-" color={'from-[#1b0bc6] to-[#0d849f]'} hover={'hover:from-[#0d849f] hover:to-[#1b0bc6]'}>
                        <img src={add} alt="add" width={30} height={30} />
                            <div className='text-xl text-white'>Add</div>
                            </BtnGredient>
                            </div></>
            ) : (
              <>
                <label>Add Sponsor</label>
                        <div className="flex justify-end mt-0">
                        <BtnGredient className="rounded-" color={'from-[#ffffff] to-[#0b701a]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
                        <img src={excel} alt="excel" width={24} height={24} />
                            <p>Import form Excel</p>
                            </BtnGredient>
                        </div>
                    <div className="container w-full h-full space-y-5">
                    {/* Write here */}
                    <div className="w-full mt-5">
                      <div className="inline-block w-1/5">Sponsor ID :</div>
                    <input type="text" className="input input-bordered inline-block w-4/5"/>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Name :</div>
                    <input type="text" className="input input-bordered inline-block w-4/5"/>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Date :</div>
                      <div className="inline-block w-1/3">
                            <DatePicker
                        selected={searchDate}
                        onChange={date => setSearchDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="input input-bordered bg-primary"
                    />
        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 content-center p-5">   
                <BtnGredient className="rounded-" color={'from-[#1b0bc6] to-[#0d849f]'} hover={'hover:from-[#0d849f] hover:to-[#1b0bc6]'}>
                        <img src={add} alt="add" width={30} height={30} />
                            <div className='text-xl text-white'>Sponsor Now</div>
                            </BtnGredient>
                            </div>
              </>
            )}
            </Modal>
    </>
  )
}

export default ModalAdd