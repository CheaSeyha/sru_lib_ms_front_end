import React from "react";
import CardData from './CardData'
import { BookA, BookX,BookMarked  } from 'lucide-react';
import { BookDown } from "lucide-react";
import { BookUp } from "lucide-react";
import ChartBorrow from "./ChartBorrow";
import LineChart from "../../Analytic/Component/Chart/LineChart"
import CartBR from "./CartBR";
import NavBarBook from "./NavBar";
export default function FormInput() {
    return (
        <>
            <div className="flex flex-col w-full h-fit xl:h-full space-y-5">
                <div className="flex flex-col space-y-10 sm:flex-col lg:space-x-10 lg:flex-row md:flex-col md:space-x-0 lg:space-y-0 sm:space-y-10 overflow-auto scrollbar-hide">
                    <div className="flex-1">
                        <CartBR Bdata={87} Rdata={7} Btype="សៀវភៅសរុប" Rtype="ឧបត្ថម្ភ" bgB="bg-[#32e4ff]" bgR={"bg-[#00FF29]"} cardType="Borrow"  iconR={<BookMarked className='w-full h-full text-white inline-block' />} iconB={<BookA className='w-full h-full text-white inline-block' />}  bgColor="from-[#35b21f] to-[#1F9EB2]"/>
                    </div>
                    <div className="flex-1">
                        <CartBR Bdata={44} Rdata={3} Btype="ខ្ចីសរុប" Rtype="ផុតកំណត់" bgB="bg-[#32e4ff]" bgR={"bg-[#00FF29]"} cardType="Borrow"  iconR={<BookX className='w-full h-full text-white inline-block' />} iconB={<BookUp className='w-full h-full text-white inline-block' />}  bgColor="from-[#1F9EB2] to-[#d310d6]" />
                    </div>
                    <div className="flex-1">
                        <CartBR Bdata={20} Rdata={18} Btype="ខ្ចីថ្ងៃនេះ" Rtype="សងថ្ងៃនេះ" bgColor="from-[#d310d6] to-[#e3d813]" bgB="bg-[#32e4ff]" bgR={"bg-[#00FF29]"} iconR={<BookDown className='w-full h-full text-white inline-block' />} iconB={<BookUp className='w-full h-full text-white inline-block' />} />
                    </div>
                </div>
                <div className="flex flex-1 scrollbar-hide flex-col lg:flex-row md:flex-col sm:flex-col md:space-x-0 sm:space-x-0 mt-4 h-full lg:space-x-4 overflow-auto">
                    <div className=' pt-5 w-full'>
                        <div className="table-container flex h-[800px] lg:h-[800px] xl:h-full md:h-[700px] bg-secondary text-accent rounded-[20px] scrollbar-hide">
                            <NavBarBook />
                        </div>
                    </div>
                    {/* <div className="lg:w-1/3 flex flex-col w-full pl-0 2xl:h-full h-[600px] pt-5 lg:pl-5 md:pl-0 sm:pl-0 md:w-full sm:w-full">
                        <div className="table-chart gap-5 w-full h-full pb-5 overflow-auto scrollbar-hide">
                            <div className='w-full p-2 items-start h-full bg-secondary text-accent rounded-[20px]'>
                                    <ChartBorrow></ChartBorrow>
                            </div>
                        </div>
                        <div className="table-chart gap-5 w-full h-full pt-5 overflow-auto scrollbar-hide">
                            <div className="table-container w-full h-full bg-secondary rounded-[20px] p-2">
                                <LineChart 
                                    seriesData={mySeriesData}
                                    categories={myCategories}
                                    title={myTitle}
                                />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
