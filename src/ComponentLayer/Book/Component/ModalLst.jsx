import React,{useState} from 'react'
import Modal from '../../../layout/Component/Modal';
import BtnGredient from '../BtnGredient';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
const ModalLst = ({ isModalVisible, closeModal, entry }) => {
  if (!entry) return null;
  const [isborrow, setIsborrow] = useState(true);
  const [Inputname, setInputname]=useState(entry.bookTitle);

  const [Inputtype, setInputtype]=useState(entry.bookType);
  const handleRadioChange = (e) => {
    setIsborrow(e.target.value === 'borrow');
};
const handlechangename=(e) => {
  setInputname(e.target.value);
};
const handlechangetype=(e) => {
  setInputtype(e.target.value);
};
const [searchDate, setSearchDate] = useState(new Date());
  return (
    <>
        <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className="container w-full h-full space-y-5">
                    <div className="header-modal flex items-center justify-between">
                    <div className="radio-container flex space-x-3">
                                <input type="radio" id='borrowRadio' name="entryType" value="borrow" className="radio radio-accent" onChange={handleRadioChange} checked={isborrow} />
                                <label htmlFor="borrowRadio">Borrow</label>
                                <input type="radio" id='optionRadio' name="entryType" value="option" className="radio radio-accent" onChange={handleRadioChange} checked={!isborrow} />
                                <label htmlFor="optionRadio">Option</label>
                            </div>
                        <button onClick={closeModal} className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
                            <X/>
                        </button>
                    </div>
                    </div>
                    {isborrow ? (
                      <>
                    <div className="container w-full h-full space-y-5">
                    {/* Write here */}
                    <div className="w-full">
                      <div className="inline-block w-1/5">ID :</div>
                      <div className="inline-block"><p>{entry.bookId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Title :</div>
                      <div  className="inline-block"><p>{entry.bookTitle}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Type :</div>
                      <div className="inline-block"><p>{entry.bookType}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Name :</div>
                      <div className="inline-block">
                        <select id="position"  className="select select-bordered inline-block bg-base-300 w-80">
                                <option disabled value="" selected>Select Student</option>
                                <option value="History">History</option>
                                <option value="History">Science</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Type :</div>
                      <div className="inline-block">
                      <DatePicker
                        selected={searchDate}
                        onChange={date => setSearchDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="input input-bordered bg-base-300 w-80"
                    />
                      </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 content-center p-5 bg-">   
                <BtnGredient className="content-center" color={'from-[#dad1ff] to-[#908cfc]'} hover={'hover:from-[#8cfc9d] hover:to-[#cabef8] hover:scale-90'}>
                            <p>ADD</p>
                            </BtnGredient>
                            </div>
                            </>
                ) : (
                  <>
                    <div className="container w-full h-full space-y-5">
                    {/* Write here */}
                    <div className="w-full">
                      <div className="inline-block w-1/5">ID :</div>
                      <div className="inline-block"><p>{entry.bookId}</p></div>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Name :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" value={Inputname} onChange={handlechangename}/>
                    </div>
                    <div className="w-full">
                      <div className="inline-block w-1/5">Type :</div>
                      <input type="text" className="input input-bordered inline-block w-4/5" value={Inputtype} onChange={handlechangetype}/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 content-center items-center p-5 bg">   
                <BtnGredient className="content-center" color={'from-[#cabef8] to-[#8cfc9d]'} hover={'hover:from-[#8cfc9d] hover:to-[#cabef8] hover:scale-90'}>
                            <p>Update</p>
                </BtnGredient>
                <BtnGredient className="content-center" color={'from-[#cabef8] to-[#fc8c8c]'} hover={'hover:from-[#fc8c8c] hover:to-[#cabef8] hover:scale-90'}>
                            <p>Delete</p>
                </BtnGredient>
                            </div>
          
                            </>
                )}
            </Modal>
    </>
  )
}

export default ModalLst