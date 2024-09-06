import React, { useEffect, useState } from 'react'
import { BookType, MonitorCheck, BriefcaseBusiness, CircleEllipsis } from 'lucide-react';

function CardPurposeData({ amountData, cardType }) {
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
                <div className="flex-1 data-container w-full h-full flex items-center text-[#32E2FF] sm:gap-5">
                    <div className='container-icon flex lg:flex-col xl:flex-row items-center h-full text-[#32E2FF]'>
                        <div className={`icon-container w-[40px] sm:w-[64px] p-2 h-fit items-center justify-center ${bgIcon} rounded-[5px]`}>
                            {iconCard}
                        </div>
                    </div>
                    <div className="amount-entry flex flex-col sm:flex-row xl:flex-col 2xl:flex-row  items-center justify-between text-[#32E2FF] w-full h-full">
                        <div className="container-card-type text-accent h-full grid justify-center items-center">
                            <p className='font-bold text-[10px] sm:text-[15px]'>{cardType}</p>
                            <p className='text-[10px] xl:text-[13px] font-noto hidden sm:block xl:hidden 2xl:block'>សរុបក្នុងខែនេះ</p>
                        </div>
                        <p className='text-[18px] sm:text-[32px] text-accent font-bold'>{amountData}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPurposeData