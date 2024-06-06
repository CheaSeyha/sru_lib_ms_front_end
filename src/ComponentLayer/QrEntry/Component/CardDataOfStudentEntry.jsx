import React from 'react'


function CardDataOfStudentEntry({ bgIcon, bgColor, iconCard, cardType, cardTypeDetail, amountData }) {
    return (
        <>
            <div className={`card-data cursor-pointer drop-shadow-md hover:scale-105 transition-all ease-in-out w-full h-[104px] flex rounded-[20px] bg-gradient-to-r ${bgColor} p-5`}>
                <div className="flex-1 data-container w-full h-full flex justify-between">
                    <div className='container-icon-text flex'>
                        <div className={`icon-container w-[64px] p-2 h-fit flex items-center justify-center ${bgIcon} rounded-[10px]`}>
                            {iconCard}
                        </div>
                        <div className="container-card-type text-white h-full grid items-center ps-5">
                            <p className='font-bold'>{cardType}</p>
                            <p className='text-[13px]'>{cardTypeDetail}</p>
                        </div>
                    </div>
                    <div className="amount-entry flex items-center">
                        <p className='text-[48px] font-bold text-white'>{amountData < 10 ? "0" + amountData : amountData}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardDataOfStudentEntry