import React, { useState } from 'react';
import Modal from '../../../layout/Component/Modal';
import BtnGredient from '../../../layout/Component/BtnGredient'
import { UserPlus, X } from 'lucide-react'

function TableStudentData() {
    const [isShowModal, setIsShowModal] = useState(false)

    return (
        <>
            <div className='w-full h-full flex flex-col gap-5'>
                {/* Header Content  */}
                <div className="header flex  justify-between">
                    <p>តារាងទិន្ន័យនិស្សិត</p>
                    <div className="button-container flex flex-col md:flex-row gap-2">
                        <BtnGredient onClick={() => setIsShowModal(true)}>
                            <UserPlus />
                            <p className='hidden md:block'>បន្ថែមនិស្សិតថ្មី</p>
                        </BtnGredient>
                        <label className="input input-bordered w-[190px] md:w-full flex items-center gap-2">
                            <input
                                id='searchStaff'
                                type="text"
                                className="w-full"
                                placeholder="ស្វែងរកឈ្មោះ,ID"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-8 w-8 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                </div>
                {/* Table Data  */}
                <div className='Table-container w-full h-full rounded-[20px] font-noto gap-5 flex flex-col lg:flex-row'>
                    {/* table student  */}
                    <div className="table-container w-full h-[1200px] md:h-full overflow-auto rounded-[10px] border border-primary shadow-xl">
                        <table className="table">
                            <thead>
                                <tr className='text-accent text-[15px]'>
                                    <td>អត្តលេខនិស្សិត</td>
                                    <td>ឈ្មោះនិស្សិត</td>
                                    <td>ជំនាញ</td>
                                    <td>ឆ្នាំសិក្សា</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-[15px] hover:bg-primary cursor-pointer active:bg-primary'>
                                    <td>200123</td>
                                    <td>អា​ បឿន</td>
                                    <td>វិទ្យាសាស្រ្តកុំព្យូទ័រ</td>
                                    <td>4</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Table College and Major  */}
                    <div className='grid grid-rows-2 gap-5 w-full lg:w-[400px] h-[1200px] md:h-full'>
                        <div className="table-container overflow-auto border border-primary shadow-xl rounded-[10px]">
                            <table className="table">
                                <thead>
                                    <tr className='text-accent text-[15px]'>
                                        <td>Major ID</td>
                                        <td>Major Name</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-[15px] hover:bg-primary cursor-pointer active:bg-primary'>
                                        <td>200123</td>
                                        <td>អា​ បឿន</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-container overflow-auto rounded-[10px] border border-primary shadow-xl">
                            <table className="table">
                                <thead>
                                    <tr className='text-accent text-[15px]'>
                                        <td>College ID</td>
                                        <td>College Name</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-[15px] hover:bg-primary cursor-pointer active:bg-primary'>
                                        <td>200123</td>
                                        <td>អា​ បឿន</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal  */}
            <Modal isVisible={isShowModal}>
                <div className="header-modal flex justify-between font-noto">
                    <div className="radio-container flex space-x-3">
                        <p>សូមបំពេញព័ត៏មាននិស្សិត</p>
                    </div>
                    <button
                        onClick={() => setIsShowModal(false)}
                        className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                    >
                        <X />
                    </button>
                </div>
                <div className="modal-form font-noto mb-5">
                    <div className="container grid gap-5">
                        <div className="stuName">
                            <div className="inputbox space-y-2">
                                <label htmlFor="studentName">ឈ្មោះនិស្សិត</label>
                                <input
                                    readOnly={true}
                                    type="text"
                                    id='studentName'
                                    placeholder="ឈ្មោះនិស្សិត"
                                    className="input bg-secondary w-full"
                                />
                            </div>
                        </div>
                        <div className="majorName space-y-2">
                            <label htmlFor="major">ជំនាញ</label>
                            <select
                                id="major"
                                className="select select-bordered bg-secondary w-full"
                            >
                                <option disabled defaultChecked>ជ្រើសរើសជំនាញ</option>
                                <option>CS</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="contianer-btn">
                    <button
                        className="btn w-full font-noto rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#57acd4] to-[#E7FBFF] hover:from-[#264e5e] hover:to-[#ffffff] transition-all ease-in-out duration-300"
                    >
                        យល់ព្រម
                    </button>
                </div>
            </Modal>
        </>

    );
}

export default TableStudentData;
