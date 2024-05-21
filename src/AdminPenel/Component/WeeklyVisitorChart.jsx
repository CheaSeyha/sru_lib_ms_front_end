import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function WeeklyVisitorChart() {
    const WeelyVisitorData = [25, 64, 24, 6, 34, 60, 78];
    // Reverse the WeelyVisitorData array to display from low to high
    const reversedData = [...WeelyVisitorData].reverse();

    // Initial state with default heights set to 0
    const [heights, setHeights] = useState(new Array(7).fill(0));

    // Update heights on component mount
    useEffect(() => {
        // Animation for line-bg elements on mount
        const animateLineBG = () => {
            setHeights(WeelyVisitorData);
        };
        animateLineBG();

        // Clean up function to remove animation on unmount (optional)
        return () => setHeights(new Array(7).fill(0));
    }, [WeelyVisitorData]);

    return (
        <>
            <div className="text-title w-full h-[46px]">
                <p>Weekly Visitor</p>
            </div>
            <div className="flex-1 chart-line w-full h-full flex space-x-5">
                <div className="yxis-data w-fit h-full">
                    <ul className='flex flex-col justify-between h-full'>
                        <li>100</li>
                        <li>75</li>
                        <li>50</li>
                        <li>25</li>
                        <li>0</li>
                    </ul>
                </div>
                <div className="flex-1 line-chart w-full h-full">
                    <div className="line flex justify-between h-full">
                        {reversedData.map((data, index) => {
                            // Calculate height percentage
                            const heightPercentage = heights[index] + "%";
                            return (
                                <motion.div
                                    key={index}
                                    className="line-bg group flex items-end w-[18px] h-full bg-primary rounded-full relative cursor-pointer"
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                >
                                    <motion.div
                                        className="line-value w-[18px] bg-[#82B4FF] rounded-full absolute transition duration-300 group-hover:bg-accent"
                                        initial={{ height: 0 }}
                                        animate={{ height: heightPercentage }}
                                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }} // Adding staggered animation
                                        style={{ originY: 1 }} // Animation starts from bottom
                                    />
                                    <motion.div
                                        className="tool-tip-data w-[18px] absolute z-40"
                                        style={{ height: heightPercentage }}
                                        variants={{
                                            rest: { x: '50%', opacity: 0 },
                                            hover: { x: '0%', opacity: 1 },
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className='w-fit rounded-lg px-2 bg-[#5c78a1] text-center'>{data}</p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="x-xis-data-dayOfWeek-container flex space-x-5">
                <div className="flex-1 line-chart w-full h-full ps-[45px]">
                    <div className="x-xis-data-dayOfWeek flex justify-between h-full py-5">
                        <div className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                            <p>Mo</p>
                        </div>
                        <div className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                            <p>Tu</p>
                        </div>
                        <div className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                            <p>We</p>
                        </div>
                        <div className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                            <p>Th</p>
                        </div>
                        <div className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                            <p>Fr</p>
                        </div>
                        <div className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                            <p>Sa</p>
                        </div>
                        <div className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                            <p>Su</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeeklyVisitorChart;
