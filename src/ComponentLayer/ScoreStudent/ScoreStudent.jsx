import React from 'react'
import CardCertificate from './Component/CardCertificate'
import ListCerEntry from './Component/ListCertificate'
import ChartExported from './Component/ChartExported'
import ChartMonthly from './Component/ChartMonthly'
import { ThemeSwitchProvider } from "../../Context/ThemeSwitchContext";
function ScoreStudent() {
    return (
        <div className="flex flex-col h-full overflow-auto">
            <div className="flex lg:space-x-10 lg:flex-row md:flex-col md:space-x-0 sm:flex-col lg:space-y-0 md:space-y-10 sm:space-y-10 overflow-auto scrollbar-hide">
                <div className="flex-1">
                    <CardCertificate amountData={12} bgIcon="bg-[#00FF29]" cardType="Certificate" cardTypeDetail="Cerfiticate of the entry" bgColor="from-[#1F9EB2] to-[#00C31F]" ></CardCertificate>
                </div>
                <div className="flex-1">
                    <CardCertificate amountData={0} bgIcon="bg-[#00FF29]" cardType="Certificate" cardTypeDetail="Certificate of the borrow" bgColor="from-[#1F9EB2] to-[#00C31F]" ></CardCertificate>
                </div>
                <div className="flex-1">
                    <CardCertificate amountData={12} bgIcon="bg-[#00FF29]" cardType="Certificate" cardTypeDetail="Cerfiticate of the entry" bgColor="from-[#1F9EB2] to-[#00C31F]" ></CardCertificate>
                </div>
            </div>
            <div className="flex scrollbar-hide flex-1 lg:flex-row md:flex-col sm:flex-col md:space-x-0 sm:space-x-0 mt-4 h-full lg:space-x-4 overflow-auto">
                <div className=' pt-5 lg:w-2/3 md:w-full sm:w-full'>
                <div className="table-container flex lg:h-full md:h-[700px] sm:h-[700px] bg-secondary text-accent rounded-[20px] scrollbar-hide">
                <ListCerEntry />
                    </div>
                </div>
                <div className="lg:w-1/3 flex flex-col 2xl:h-full lg:h-full md:h-[600px] sm:h-[600px] pt-5 lg:pl-5 md:pl-0 sm:pl-0 md:w-full sm:w-full">
                        <div className="table-chart gap-5 w-full h-full pb-5 overflow-auto scrollbar-hide">
                        <div className='w-full items-start h-full bg-secondary text-accent rounded-[20px]'>
                            <ThemeSwitchProvider>
                            <ChartExported/>
                            </ThemeSwitchProvider>
                        </div>
                        </div>
                    <div className="table-chart gap-5 w-full h-full pt-5 overflow-auto scrollbar-hide">
                        <div className="table-container w-full h-full bg-secondary rounded-[20px]">
                            <ThemeSwitchProvider>
                            <ChartMonthly />
                            </ThemeSwitchProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScoreStudent