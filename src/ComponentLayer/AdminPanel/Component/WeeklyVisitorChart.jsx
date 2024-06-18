import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function WeeklyVisitorChart({ WeelyVisitorData }) {
    // State for y-axis data and heights
    const [yxisData, setYxisData] = useState([1000, 500, 0]); // Default values for y-axis data
    const [heights, setHeights] = useState(new Array(7).fill(0)); // Initial heights set to 0

    // State for active index of bar
    const [activeIndex, setActiveIndex] = useState(null);

    // Calculate y-axis data based on WeelyVisitorData
    useEffect(() => {
        const yxisNum = () => {
            const maxNum = Math.max(...WeelyVisitorData);
            if (maxNum <= 50) {
                setYxisData([50, 25, 0]);
            } else if (maxNum <= 100) {
                setYxisData([100, 50, 0]);
            } else if (maxNum <= 500) {
                setYxisData([500, 250, 0]);
            } else {
                setYxisData([1000, 500, 0]);
            }
        };
        yxisNum();
    }, [WeelyVisitorData]);

    // Update heights when WeelyVisitorData changes
    useEffect(() => {
        setHeights(WeelyVisitorData);
    }, [WeelyVisitorData]);

    // Get maximum value from y-axis data
    const getMaxYxisNum = Math.max(...yxisData);

    // Handler to toggle active index on click/tap
    const handleBarClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <div className="text-title w-full h-[46px]">
                <p>Weekly Visitor</p>
            </div>
            <div className="flex-1 chart-line w-full h-full flex space-x-5">
                <div className="yxis-data w-fit h-full">
                    <ul className='flex flex-col justify-between h-full'>
                        {yxisData.map((number, index) => (
                            <li key={index}>{number}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 line-chart w-full h-full">
                    <div className="line flex justify-between h-full">
                        {WeelyVisitorData.map((data, index) => {
                            // Calculate height percentage
                            const heightPercentage = heights[index] ? `${(heights[index] / getMaxYxisNum) * 100}%` : '0%'; // Ensure heights[index] is defined
                            const isActive = activeIndex === index;
                            return (
                                <motion.div
                                    key={index}
                                    className="line-bg group flex items-end w-[18px] h-full bg-primary rounded-full relative cursor-pointer"
                                    whileHover="hover"
                                    initial="rest"
                                    animate={isActive ? "hover" : "rest"}
                                    onClick={() => handleBarClick(index)} // Handle click/tap event
                                >
                                    <motion.div
                                        className="line-value w-[18px] bg-[#82B4FF] rounded-full absolute transition duration-300 group-hover:bg-accent"
                                        initial={{ height: 0 }}
                                        animate={{ height: heightPercentage }}
                                        transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }} // Adding staggered animation
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
                                        <p className='w-fit rounded-lg px-2 bg-[#5c78a1] text-center text-white'>{data}</p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="x-xis-data-dayOfWeek-container flex space-x-5">
                <div className="flex-1 line-chart w-full h-full ps-[45px]">
                    <div className="x-xis-data-dayOfWeek flex justify-between h-full pt-5">
                        {/* Loop through the array and generate JSX elements */}
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
                            <div key={index} className="data-dayOfWeek group flex items-end rounded-full relative cursor-pointer">
                                <p>{day}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeeklyVisitorChart;
