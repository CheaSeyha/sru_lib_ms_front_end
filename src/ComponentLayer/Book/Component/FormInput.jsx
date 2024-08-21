import React from "react";
import CardData from './CardData'
import { BookA, BookX,BookMarked  } from 'lucide-react';
import { BookDown } from "lucide-react";
import { BookUp } from "lucide-react";
import ListOfAllBook from "./ListOfAllBook";
import ChartBorrow from "./ChartBorrow";
import ChartReturn from "../../ScoreStudent/Component/ChartExported"
import { ThemeSwitchProvider } from "../../../Context/ThemeSwitchContext";
import CartBR from "./CartBR";
import NavBarBook from "./NavBar";
export default function FormInput() {
    return (
        <>
            <div className="flex flex-col h-full overflow-auto">
                <div className="flex lg:space-x-10 lg:flex-row md:flex-col md:space-x-0 sm:flex-col lg:space-y-0 md:space-y-10 sm:space-y-10 overflow-auto scrollbar-hide">
                    <div className="flex-1">
                        <CartBR Bdata={87} Rdata={70} Btype="All Books" Rtype="All Donation" bgB="bg-[#32e4ff]" bgR={"bg-[#00FF29]"} cardType="Borrow"  iconR={<BookMarked className='w-full h-full text-white inline-block' />} iconB={<BookA className='w-full h-full text-white inline-block' />}  bgColor="from-[#1F9EB2] to-[#d310d6]" />
                    </div>
                    <div className="flex-1">
                        <CartBR Bdata={44} Rdata={87} Btype="All Borrowed" Rtype="Expired" bgB="bg-[#32e4ff]" bgR={"bg-[#00FF29]"} cardType="Borrow"  iconR={<BookX className='w-full h-full text-white inline-block' />} iconB={<BookUp className='w-full h-full text-white inline-block' />}  bgColor="from-[#1F9EB2] to-[#d310d6]" />
                    </div>
                    <div className="flex-1">
                        <CartBR Bdata={20} Rdata={18} Btype="Borrow today" Rtype="Return today" bgColor="from-[#d310d6] to-[#e3d813]" bgB="bg-[#32e4ff]" bgR={"bg-[#00FF29]"} iconR={<BookDown className='w-full h-full text-white inline-block' />} iconB={<BookUp className='w-full h-full text-white inline-block' />} />
                    </div>
                </div>
                <div className="flex flex-1 scrollbar-hide lg:flex-row md:flex-col sm:flex-col md:space-x-0 sm:space-x-0 mt-4 h-full lg:space-x-4 overflow-auto">
                    <div className=' pt-5 lg:w-2/3 md:w-full sm:w-full'>
                        <div className="table-container flex lg:h-full md:h-[700px] sm:h-[700px] bg-secondary text-accent rounded-[20px] scrollbar-hide">
                            <NavBarBook />
                        </div>
                    </div>
                    <div className="lg:w-1/3 flex flex-col 2xl:h-full lg:h-full md:h-[600px] sm:h-[600px] pt-5 lg:pl-5 md:pl-0 sm:pl-0 md:w-full sm:w-full">
                        <div className="table-chart gap-5 w-full h-full pb-5 overflow-auto scrollbar-hide">
                            <div className='w-full items-start h-full bg-secondary text-accent rounded-[20px]'>
                                <ThemeSwitchProvider>
                                    <ChartBorrow></ChartBorrow>
                                </ThemeSwitchProvider>
                            </div>
                        </div>
                        <div className="table-chart gap-5 w-full h-full pt-5 overflow-auto scrollbar-hide">
                            <div className="table-container w-full h-full bg-secondary rounded-[20px]">
                                <ThemeSwitchProvider>
                                    <ChartReturn />
                                </ThemeSwitchProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
