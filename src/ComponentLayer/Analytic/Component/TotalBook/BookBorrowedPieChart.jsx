import React from 'react'
import DonutChart from './DonutChart'

function BookBorrowedPieChart() {
    const bookData = [
        {
            lang: "Khmer",
            Total: 8015,
        },
        {
            lang: "English",
            Total: 11663,
        },
        {
            lang: "English",
            Total: 11663,
        },
        {
            lang: "English",
            Total: 11663,
        },
        {
            lang: "English",
            Total: 11663,
        }
    ];


    return (
        <div className='w-full h-full font-noto flex flex-col'>
            <div className="text-header w-full h-[46px]">
                <p>ចំនួនខ្ចីសៀវភៅគិតតាមហាវិទ្យាល័យ</p>
            </div>
            <div className="container-chart-data w-full h-full flex flex-row">
                <div className="danutChart w-[250px] h-full grid place-items-center">
                    
                </div>
            </div>
        </div>
    )
}

export default BookBorrowedPieChart