import React from 'react'


function CardDataOfStudentEntry({bgIcon,bgColor,iconCard,cardType,cardTypeDetail,amountData}) {
    return (
        <>
            <div className={`card-data cursor-pointer w-full h-[104px] flex rounded-[20px] bg-gradient-to-r ${bgColor} p-5`}>
                <div className={`icon-container w-[64px] p-2 h-[64px] flex items-center justify-center ${bgIcon} rounded-[10px]`}>
                    {iconCard}
                </div>
                <div className="flex-1 data-container w-full p-[5px] flex justify-between">
                    <div className="container-card-type text-accent h-full grid items-center ps-5">
                        <p className='font-bold'>{cardType}</p>
                        <p className='text-[13px]'>{cardTypeDetail}</p>
                    </div>
                    <div className="amount-entry flex items-center">
                        <p className='text-[48px] font-bold text-accent'>{amountData < 10 ? "0"+amountData : amountData}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardDataOfStudentEntry