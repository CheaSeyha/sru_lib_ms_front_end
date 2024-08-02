import React from 'react'

const CardBackup = ({bgColor,cardType,cardTypeDetail,amountData}) => {
  return (
    <>
        <div className={`container-card-data cursor-pointer drop-shadow-md hover:scale-105 transition-all ease-in-out w-full xl:h-[104px] flex rounded-[20px] bg-gradient-to-r ${bgColor} p-3 sm:p-5`}>
                <div className="flex-1 data-container w-full h-full flex items-center justify-between space-x-1 lg:space-x-5 text-[#32E2FF]">
                    <div className='container-icon-text flex items-center h-full text-[#32E2FF]'>
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

export default CardBackup