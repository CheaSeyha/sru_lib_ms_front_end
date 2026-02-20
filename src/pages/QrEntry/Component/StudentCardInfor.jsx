import React, { useEffect, useState, useRef } from 'react';
import sruLogo from '../../../assets/logo/sru_logo.png'
import { User, UserCheck } from 'lucide-react';
import BtnGredien from '../../Dashboard/Component/BtnGredient'
import toast, { Toaster } from 'react-hot-toast';
function StudentCardInfor({ checkPurpose, setCheckPurpose, disCheckPur, stuEntryInfor, handleClearFormData, handleSaveEntry }) {
    const checkboxesRef = useRef([]);
    const handleCheckPurpose = (event) => {
        const { id, checked } = event.target;
        // Convert id to Title Case with a space between words
        const value = id.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());

        setCheckPurpose(prevValue => {
            const values = prevValue ? prevValue.split(', ') : [];
            if (checked) {
                if (!values.includes(value)) {
                    values.push(value);
                }
            } else {
                const index = values.indexOf(value);
                if (index > -1) {
                    values.splice(index, 1);
                }
            }
            return values.join(', ');
        });
    };

    useEffect(() => {//Disble enale Check Purpose
        checkboxesRef.current.forEach(checkbox => {
            checkbox.disabled = disCheckPur;
            if (checkbox) {
                checkbox.checked = false;
            }
        });
    }, [disCheckPur]);

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="flex-1 flex flex-col studentCard w-full h-fit bg-secondary p-5 overflow-x-hidden scrollbar-hide rounded-[20px] relative items-center">
            <div className="flex flex-col container z-10 font-noto text-accent">
                <div className="logo-text w-full flex justify-center gap-[10px] text-white">
                    <div className="logo w-[42px] h-[42px]">
                        <img src={sruLogo} className='w-full h-full' alt="" />
                    </div>
                    <div className="text-sru">
                        <p className='text-[16px] sm:text-[14px] xl:text-[16px]'>សកលវិទ្យាល័យស្វាយរៀង</p>
                        <p className='text-[12px]'>SVAYRIENG UNIVERSITY</p>
                    </div>
                </div>
                <div className="big-text py-3 text-white">
                    <h1 className='text-[15px] xl:text-[20px] text-center font-bold'>ENTRY INFO</h1>
                </div>
                <div className="profile-student w-full h-fit grid place-items-center">
                    <div className="profile w-[130px] h-[130px] bg-secondary rounded-full border-[3px]  grid place-items-center overflow-hidden">

                        {stuEntryInfor.studentName ? (
                            <UserCheck className='w-[60px] h-[60px] text-blue-400 ps-2' />
                        ) : (
                            <User className='w-[60px] h-[60px] text-accent' />
                        )}
                    </div>
                    <div className="stu-info py-[10px]">
                        <p className='font-bold text-[15px] xl:text-xl'>{stuEntryInfor.studentName === "" ? "NAME" : stuEntryInfor.studentName}</p>
                    </div>
                    <div className="stu-info-detail font-noto w-full xl:ms-10">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>អត្តលេខ</p>
                                    </td>
                                    <td className='ps-5'>: {stuEntryInfor.studentId === 0 ? "" : stuEntryInfor.studentId}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>ជំនាញ</p>
                                    </td>
                                    <td className='ps-5'>: {stuEntryInfor.majorName}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>កំរិត</p>
                                    </td>
                                    <td className='ps-5'>: {capitalizeFirstLetter(stuEntryInfor.degreeLevel)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="check-purpose text-accent mt-4">
                            <p className='font-bold'>Entry Purpose</p>
                            <div className="container-check-purpose grid lg:grid-cols-2 xl:grid-cols-2 gap-2 pt-2">
                                <div className="check-purpose flex items-center space-x-2">
                                    <input type="checkbox" id='Reading' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[0] = el} />
                                    <label htmlFor="Reading" className='label-text text-[#32E2FF]'>Reading</label>
                                </div>
                                <div className="check-purpose flex items-center space-x-2">
                                    <input type="checkbox" id='Assignment' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[1] = el} />
                                    <label htmlFor="Assignment" className='label-text text-[#32E2FF]'>Assignment</label>
                                </div>
                                <div className="check-purpose flex items-center space-x-2">
                                    <input type="checkbox" id='Use_PC' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[2] = el} />
                                    <label htmlFor="Use_PC" className='label-text text-[#32E2FF]'>Use PC</label>
                                </div>
                                <div className="check-purpose flex items-center space-x-2">
                                    <input type="checkbox" id='Other' className="checkbox border-[#32E2FF] checkbox-info checkbox-sm" onChange={handleCheckPurpose} ref={el => checkboxesRef.current[3] = el} />
                                    <label htmlFor="Other" className='label-text text-[#32E2FF]'>Other</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="button w-full h-full grid items-end grid-cols-2 gap-3 pt-5">
                <button className="btn btn-primary hover:border-white" onClick={handleSaveEntry} >Entry</button>
                <button className="btn btn-outline border-blue-400 text-accent" onClick={handleClearFormData}>Cancel</button>
            </div>
            <div className="round-bg rounded-full bg-[#00B2FF] w-[492px] h-[492px] top-[-310px] absolute z-0" />
            <Toaster position='bottom-center' />
        </div>
    )
}

export default StudentCardInfor
