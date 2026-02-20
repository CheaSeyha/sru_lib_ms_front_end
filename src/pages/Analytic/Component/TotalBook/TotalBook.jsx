import React, { useEffect, useState } from 'react';
import { BookOpenText } from 'lucide-react';
import Datepicker from "react-tailwindcss-datepicker";
import DonutChart from './DonutChart';

function TotalBook({ totalKhmerBook, totalEnglishBook }) {
    const [bookData, setBookData] = useState([
        {
            lang: "Khmer",
            Total: 0,
        },
        {
            lang: "English",
            Total: 0,
        }
    ]);

    const TotalBook = () => {
        return totalEnglishBook + totalKhmerBook
    }

    useEffect(() => {
        // Update bookData with the new totals from props
        setBookData([
            {
                lang: "Khmer",
                Total: totalKhmerBook,
            },
            {
                lang: "English",
                Total: totalEnglishBook,
            }
        ]);
    }, [totalEnglishBook, totalKhmerBook]); // Re-run the effect whenever the totals change


    return (
        <div className='total-book w-full flex flex-col h-full text-white bg-secondary rounded-[20px] p-5'>
            <div className="total-book-header bg-gradient-to-r p-5 from-[#00BBFF] to-secondary w-full h-[176px] flex justify-between rounded-[10px]">
                <div className="text-data h-full grid col-span-2">
                    <p className='font-noto'>ចំនួនសៀវភៅសរុប</p>
                    <div className="h-full grid col-span-2">
                        <div className="total-book-number flex items-center gap-2">
                            <p className='text-[30px] sm:text-[40px] font-bold'>{totalEnglishBook + totalKhmerBook}</p>
                            <BookOpenText className='text-yellow-300 w-[20px] sm:w-[30px] h-[30px]' />
                        </div>
                        <button className='w-fit btn px-5 h-[46px] rounded-xl bg-secondary font-noto grid place-items-center '>
                            <p className='text-accent'>មើលទិន្ន័យលំអិត</p>
                        </button>
                    </div>
                </div>
                <div className="chart-data grid items-center w-[90px] sm:w-[136px] h-full">
                    <DonutChart bookData={bookData} />
                </div>
            </div>
            <div className="total-book-baseOn-lange text-accent flex flex-col w-full h-full  font-noto">
                <p className='h-[45px] flex items-center'>សរុបចំនួនតាមភាសា</p>
                <div className="box-lang-contianer gap-5 grid grid-cols-2 itece h-full">
                    {bookData.map((data) => (
                        <div key={"book" + data.lang} className="kh-box flex flex-col justify-center text-center p-5 items-center bg-primary rounded-[10px]">
                            <p>សៀវភៅភាសា{data.lang === "Khmer" ? "ខ្មែរ" : "អង្គគ្លេស"}</p>
                            <h1 className='text-[30px] lg:text-[40px]'>{data.Total}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TotalBook;
