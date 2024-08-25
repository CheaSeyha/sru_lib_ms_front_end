import React from 'react';
import DonutChart from '../Chart/DonutChart';

function BookBorrowedPieChart() {
    const bookBorrowed = [
        {
            majorName: "Computer Science",
            borrowedNumber: 35,
        },
        {
            majorName: "Public Administration",
            borrowedNumber: 37,
        },
        {
            majorName: "English",
            borrowedNumber: 26,
        },
        {
            majorName: "Math",
            borrowedNumber: 94,
        },
        {
            majorName: "Business",
            borrowedNumber: 46,
        }
    ];

    // Define a fixed set of colors
    const defaultColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#F7464A',
        '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#FDB45C', '#F4C542',
        '#36A2EB', '#FF9F40', '#FFCE56', '#F7464A', '#4BC0C0', '#FF6384',
        '#46BFBD', '#F4C542', '#9B59B6'
    ];

    // Calculate the total borrowed number
    const totalBorrowed = bookBorrowed.reduce((sum, item) => sum + item.borrowedNumber, 0);

    // Slice colors array to match the number of data points
    const colors = defaultColors.slice(0, bookBorrowed.length);

    return (
        <div className='w-full h-full font-noto flex flex-col text-accent'>
            <div className="text-header w-full h-[46px] ">
                <p>ចំនួនខ្ចីសៀវភៅគិតតាមហាវិទ្យាល័យ</p>
            </div>
            <div className="flex-1 container-chart-data w-full h-full flex flex-col lg:flex-row gap-5">
                <div className="danutChart w-full lg:w-[250px] h-full grid place-items-center">
                    <DonutChart
                        data={bookBorrowed}
                        labelsKey="majorName"
                        dataKey="borrowedNumber"
                        dataSetLabel="Books Borrowed"
                        colors={colors} // Pass colors to the DonutChart component
                    />
                </div>
                <div className="table-container w-full h-full overflow-y-scroll scrollbar-hide">
                    <div className="overflow-x-auto">
                        <table className="table text-accent font-noto">
                            {/* head */}
                            <thead className=' text-accent'>
                                <tr className='border-none'>
                                    <th></th>
                                    <th>មហាវិទ្យាល័យ</th>
                                    <th>ចំនួនខ្ចី/ដង</th>
                                    <th>គិតជាភាគរយ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookBorrowed.map((item, index) => {
                                    const percentage = ((item.borrowedNumber / totalBorrowed) * 100).toFixed(2);
                                    return (
                                        <tr key={index} className='hover:bg-primary border-none'>
                                            <th>
                                                <div className='w-4 h-4 rounded-full' style={{ backgroundColor: colors[index] }}></div>
                                            </th>
                                            <td>{item.majorName}</td>
                                            <td>{item.borrowedNumber}</td>
                                            <td>{percentage}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookBorrowedPieChart;
