import React, { useState } from 'react';
import { BookOpenText } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DonutChart from './DonutChart';

function TotalBook() {

    const bookData = [
        {
            lang: "Khmer",
            Total: 8015,
        },
        {
            lang: "English",
            Total: 11663,
        }
    ];
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className='total-book w-full flex flex-col h-full text-white bg-secondary rounded-[20px] p-5'>
            <div className="total-book-header bg-gradient-to-r p-5 from-[#00BBFF] to-secondary w-full h-[176px] flex justify-between rounded-[10px]">
                <div className="text-data h-full grid col-span-2">
                    <p className='font-noto'>ចំនួនសៀវភៅសរុប</p>
                    <div className="h-full grid col-span-2">
                        <div className="total-book-number flex items-center gap-2">
                            <p className='text-[40px] font-bold'>12,238</p>
                            <BookOpenText className='text-yellow-300 w-[30px] h-[30px]' />
                        </div>
                        <div className='w-[90px]'>
                            <DatePicker
                                id='book-date-picker'
                                key="book-date-picker"
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="MMM-yyyy" // Display month as name (e.g., "Aug")
                                showMonthYearPicker
                                className="w-full p-[10px] rounded-[5px] text-black"
                            />
                        </div>
                    </div>
                </div>
                <div className="chart-data w-[136px] h-full">
                    <DonutChart bookData={bookData} />
                </div>
            </div>
            <div className="total-book-baseOn-lange text-accent flex flex-col w-full h-full  font-noto">
                <p className='h-[45px] flex items-center'>សរុបចំនួនតាមភាសា</p>
                <div className="box-lang-contianer gap-5 grid grid-cols-2 h-full">
                    {bookData.map((data) => (
                        <div key={"book" + data.lang} className="kh-box flex flex-col justify-center items-center bg-primary rounded-[10px]">
                            <p>សៀវភៅភាសា{data.lang === "Khmer" ? "ខ្មែរ" : "អង្គគ្លេស"}</p>
                            <h1 className='text-[40px]'>{data.Total}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TotalBook;
