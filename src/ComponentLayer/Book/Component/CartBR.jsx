import React from 'react'


function CartBR({ bgColor, bgReturn, bgBorrow,iconB,iconR }) {
    return (
        <>
            <div className={`container-card-data cursor-pointer drop-shadow-md hover:scale-105 transition-all ease-in-out w-full xl:h-[104px] flex rounded-[20px] bg-gradient-to-r ${bgColor} sm:p-5`}>
                <div className="flex-1 data-container w-full h-full flex items-center justify-between space-x-1 lg:space-x-5 text-[#32E2FF]">
                        <div className='container-icon-text flex items-center h-full text-[#32E2FF]'>
                            <div className={`icon-container lg:w-[50px] xl:w-[64px] p-2 h-fit hidden lg:flex items-center justify-center ${bgBorrow} rounded-[10px]`}>
                                {iconB}
                            </div>
                            <div className="container-card-type text-white h-full grid justify-center items-center ps-0 lg:ps-5">
                                <p className='text-[13px] xl:text-[12px] '>Borrow today</p>
                                <p className='text-[10px] xl:text-[35px] font-bold'>20</p>
                            </div>
                        </div>
                        <div className='container-icon-text flex items-center h-full text-[#32E2FF]'>
                            <div className={`icon-container lg:w-[50px] xl:w-[64px] p-2 h-fit hidden lg:flex items-center justify-center ${bgReturn} rounded-[10px]`}>
                                {iconR}
                            </div>
                            <div className="container-card-type text-white h-full grid justify-center items-center ps-0 lg:ps-5">
                                <p className='text-[13px] xl:text-[12px]'>Return today</p>
                                <p className='text-[10px] xl:text-[35px] font-bold'>18</p>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default CartBR