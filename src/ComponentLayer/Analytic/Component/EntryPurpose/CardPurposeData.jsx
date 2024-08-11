import React, { useEffect, useState } from 'react'
import { BookType, MonitorCheck, BriefcaseBusiness, CircleEllipsis } from 'lucide-react';

function CardPurposeData({ cardType, amountData }) {
    const [bgIcon, setBgicon] = useState("")
    const [iconCard, setIconCard] = useState(null)
    // bgIcon="bg-[#00FF29]"
    // bgIcon="bg-[#00D1FF]" 
    //  bgIcon="bg-[#C5F3B3]"
    useEffect(() => {
        switch (cardType) {
            case "Use PC":
                setBgicon("bg-[#00FF29]")
                setIconCard(<MonitorCheck className='w-full h-full text-white' />)
                break;
            case "Assigment":
                setBgicon("bg-[#FF0051]")
                setIconCard(<BriefcaseBusiness className='w-full h-full text-white' />)
                break;
            case "Other":
                setBgicon("bg-[#00FF88]")
                setIconCard(<CircleEllipsis className='w-full h-full text-white' />)
                break;
            default:
                setBgicon("bg-[#0048FF]")
                setIconCard(<BookType className='w-full h-full text-white' />)
        }
    }, [cardType])

    const handleCardDataClick = () => {
        console.log(cardType)
    }

    return (
        <>
            <div onClick={handleCardDataClick} className={`container-card-data cursor-pointer drop-shadow-md w-full xl:h-[104px] flex rounded-[10px] bg-primary p-3 sm:p-5`}>
                <div className="flex-1 data-container w-full h-full flex items-center justify-between space-x-1 lg:space-x-5 text-[#32E2FF]">
                    <div className='container-icon-text flex lg:flex-col xl:flex-row items-center h-full text-[#32E2FF]'>
                        <div className={`icon-container lg:w-[50px] xl:w-[64px] p-2 h-fit hidden lg:flex items-center justify-center ${bgIcon} rounded-[10px]`}>
                            {iconCard}
                        </div>
                        <div className="container-card-type text-accent h-full grid justify-center items-center ps-0 xl:ps-5">
                            <p className='text-[13px] lg:text-[10px] xl:text-[16px] font-bold'>{cardType}</p>
                            <p className='text-[10px] xl:text-[13px] font-noto lg:hidden xl:block'>សរុបក្នុងខែនេះ</p>
                        </div>
                    </div>
                    <div className="amount-entry flex items-center text-[#32E2FF]">
                        <p className='text-[28px] xl:text-[32px] text-accent font-bold'>{amountData}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPurposeData