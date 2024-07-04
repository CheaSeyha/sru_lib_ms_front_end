import React, { useEffect, useState } from 'react'
import { DoorOpen, LogOut, UsersRound } from 'lucide-react';

function CardDataOfStudentEntry({ cardType, amountData }) {
    const [cardTypeDetail,setcardTypeDetail] = useState("Total Entry Today")
    const [bgIcon, setBgicon] = useState("bg-[#00FF29]")
    const [bgColor, setBgColor] = useState("from-[#00C31F] to-[#1F9EB2]")
    const [iconCard, setIconCard] = useState(<DoorOpen className='w-full h-full text-white' />)
    // bgIcon="bg-[#00FF29]"
    // bgIcon="bg-[#00D1FF]" 
    //  bgIcon="bg-[#C5F3B3]"
    useEffect(() => {
        switch (cardType) {
            case "Exit":
                setBgicon("bg-[#00D1FF]")
                setIconCard(<LogOut className='w-full h-full text-white' />)
                setBgColor("from-[#00A4C8] to-[#C0C0C0]")
                setcardTypeDetail("Total Exit Today")
                break;
            case "Total":
                setBgicon("bg-[#C5F3B3]")
                setIconCard(<UsersRound className='w-full h-full text-white' />)
                setBgColor("from-[#C0C0C0] to-[#50FF00]")
                setcardTypeDetail("Total Student Entry")
                break;
        }
    }, [cardType])

    return (
        <>
            <div className={`container-card-data cursor-pointer drop-shadow-md w-full xl:h-[104px] flex rounded-[20px] bg-gradient-to-r ${bgColor} p-3 sm:p-5`}>
                <div className="flex-1 data-container w-full h-full flex items-center justify-between space-x-1 lg:space-x-5 text-[#32E2FF]">
                    <div className='container-icon-text flex items-center h-full text-[#32E2FF]'>
                        <div className={`icon-container lg:w-[50px] xl:w-[64px] p-2 h-fit hidden lg:flex items-center justify-center ${bgIcon} rounded-[10px]`}>
                            {iconCard}
                        </div>
                        <div className="container-card-type text-white h-full grid justify-center items-center ps-0 lg:ps-5">
                            <p className='text-[13px] xl:text-[16px] font-bold'>{cardType}</p>
                            <p className='text-[10px] xl:text-[13px] '>{cardTypeDetail}</p>
                        </div>
                    </div>
                    <div className="amount-entry flex items-center text-[#32E2FF]">
                        <p className='text-[38px] xl:text-[48px] font-bold text-white'>{amountData < 10 ? "0" + amountData : amountData}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardDataOfStudentEntry