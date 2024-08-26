import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import TotalBook from './Component/TotalBook/TotalBook'
import EntryPurposeCard from './Component/EntryPurpose/EntryPurposeCardForm'
import BookAnalyticForm from './Component/TotalBook/BookAnalyticForm'
import { FileBarChartIcon, FileDown, SquareMenu } from 'lucide-react';
import EntryPurposeMainForm from './Component/EntryPurpose/EntryPurposeMainForm'
import Modal from '../../layout/Component/Modal'
import { X } from 'lucide-react';
import BtnGredient from '../AdminPanel/Component/BtnGredient'

function AnalyticForm() {

    const [isShowModal, setisShowModal] = useState(false)

    const [hideDropDownButton, setHideShowDropDown] = useState(true)
    const handleHideDropDownButton = () => hideDropDownButton ? setHideShowDropDown(false) : setHideShowDropDown(true)
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    return (
        <>
            <main className='flex flex-col w-full'>
                <div className="headr-card w-full h-full space-y-5">
                    <div className="text-accent">
                        <div className="book-form font-noto w-full flex justify-start gap-5 lg:gap-5 sm:justify-between relative items-center">
                            <div className='h-[46px] px-5 flex rounded-[10px] items-center bg-secondary'>
                                <p>ទិន្ន័យវិភាគទូទៅ</p>
                            </div>
                            <button className="btn bg-secondary block lg:hidden text-accent me-7 sm:me-0" onClick={handleHideDropDownButton}>
                                <SquareMenu />
                            </button>
                            <div className={`
                        container-button flex ${hideDropDownButton ? "hidden" : "block"} 
                        z-20 top-[50px] lg:top-0 lg:flex gap-3 lg:gap-5 absolute flex-col lg:flex-row 
                        lg:relative sm:right-0 rounded-lg drop-shadow-md lg:drop-shadow-none 
                        p-2 lg:p-0 bg-secondary lg:bg-transparent`}>
                                <div className="date-picker z-40">
                                    <Datepicker
                                        inputId='datePikcer'
                                        key={"datePicker"}
                                        showShortcuts={true}
                                        showFooter={true}
                                        value={value}
                                        onChange={newValue => setValue(newValue)}
                                        inputClassName="bg-primary h-[48px] px-5 rounded-[10px] w-[290px] text-accent"
                                    />
                                </div>
                                <button className="btn btn-primary font-noto">
                                    <FileDown />
                                    <p>ទាញរបាយការណ៍ប្រចាំខែ</p>
                                </button>
                                <button className="btn btn-primary font-noto" onClick={() => setisShowModal(true)}>
                                    <FileBarChartIcon />
                                    បង្កើតរបាយករណ៏
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="total-book flex flex-col xl:flex-row gap-5 w-full h-full">
                        <TotalBook />
                        <EntryPurposeCard />
                    </div>
                    <div className="book-analytic space-y-5">
                        <BookAnalyticForm />
                        <EntryPurposeMainForm />
                    </div>
                </div>
            </main>

            <Modal isVisible={isShowModal} key={"getReport"}>
                <div className="header-modal flex items-center justify-between font-noto text-accent">
                    <p>បង្កើតរបាយករណ៏</p>
                    <button
                        onClick={() => setisShowModal(false)}
                        className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                    >
                        <X />
                    </button>
                </div>
                <div className="modal-body font-noto mt-5 text-accent w-full flex flex-col gap-5">
                    <p>ជ្រើសប្រភេទរបាយការណ៏</p>
                    <select className="select select-bordered bg-secondary w-full">
                        <option>របាយការណ៏ប្រចាំត្រីមាសទី១</option>
                        <option>របាយការណ៏ប្រចាំត្រីមាសទី២</option>
                        <option>របាយការណ៏ប្រចាំត្រីមាសទី៣</option>
                        <option>របាយការណ៏ប្រចាំឆ្នាំ</option>
                    </select>
                    <BtnGredient>
                        ទាញរបាយការណ៍
                    </BtnGredient>
                </div>
            </Modal>
        </>
    )
}

export default AnalyticForm