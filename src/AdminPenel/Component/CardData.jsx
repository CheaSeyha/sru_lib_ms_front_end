import React from 'react'

function CardData({ cardType, amount, iconCard, analytic, colorBG }) {
    return (
        <div className={`
        cursor-pointer w-full h-[120px] sm:h-[150px] md:h-[120px] lg:h-[120px] xl:h-[205px] 
        backdrop-blur-md ${colorBG} backdrop-filter bg-opacity-40 flex flex-col rounded-[10px] p-4 text-white 
        hover:-translate-y-2 transition-all ease-in-out hover:bg-opacity-70`}
        >
            <div className="containerIconText flex-1 flex justify-between">
                <div className="con-text">
                    <p className='text-[12px] md:text-[13px] lg:text-[12px] xl:text-[13px] font-bold'>{cardType}</p>
                    <p className='text-[25px] lg:text-[25px] xl:text-[32px] font-bold'>{amount}</p>
                </div>
                <div className="con-icon w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] xl:w-[60px] xl:h-[60px] p-[5px] md:p-[6px] lg:p-2 xl:p-0  bg-blue-400 rounded-xl flex justify-center items-center">
                    {iconCard}
                </div>
            </div>
            <div className="text-[10px] md:text-[13px] textAnaly">
                <p>{analytic ? analytic : 0} % from yesterday</p>
            </div>
        </div>
    )
}

export default CardData
