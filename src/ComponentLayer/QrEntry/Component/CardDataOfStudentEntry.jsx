import React from 'react'


function CardDataOfStudentEntry({ bgIcon, bgColor, iconCard, cardType, cardTypeDetail, amountData }) {
    return (
        <>
            <div className={`container-card-data cursor-pointer drop-shadow-md hover:scale-105 transition-all ease-in-out w-full xl:w-full xl:h-[104px] flex rounded-[20px] bg-gradient-to-r ${bgColor} p-5`}>
                <div className="flex-1 data-container w-full h-full flex items-center justify-between space-x-5">
                    <div className='container-icon-text flex items-center h-full'>
                        <div className={`icon-container lg:w-[50px] xl:w-[64px] p-2 h-fit flex items-center justify-center ${bgIcon} rounded-[10px]`}>
                            {iconCard}
                        </div>
                        <div className="container-card-type text-white h-full grid justify-center items-center ps-5">
                            <p className='lg:text-[13px] xl:text-[16px] font-bold'>{cardType}</p>
                            <p className='lg:text-[10px] xl:text-[13px]'>{cardTypeDetail}</p>
                        </div>
                    </div>
                    <div className="amount-entry flex items-center">
                        <p className='lg:text-[38px] xl:text-[48px] font-bold text-white'>{amountData < 10 ? "0" + amountData : amountData}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardDataOfStudentEntry