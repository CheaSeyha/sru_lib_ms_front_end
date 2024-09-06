import React, { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import TotalBook from './Component/TotalBook/TotalBook'
import EntryPurposeCard from './Component/EntryPurpose/EntryPurposeCardForm'
import BookAnalyticForm from './Component/TotalBook/BookAnalyticForm'
import { FileBarChartIcon, FileDown, SquareMenu } from 'lucide-react';
import Modal from '../../layout/Component/Modal'
import { X } from 'lucide-react';
import BtnGredient from '../AdminPanel/Component/BtnGredient'
import axios from '../../api/axios'
import BarChart from './Component/Chart/BarChart';
import LineChart from './Component/Chart/LineChart';
import BookBorrowedPieChart from './Component/TotalBook/BookBorrowedPieChart';
import MostBorrowBookTable from './Component/TotalBook/MostBorrowBookTable';
import TotalEntryCardForm from './Component/EntryPurpose/TotalEntryCardForm'
import EntryTableBaseOnMajor from './Component/EntryPurpose/EntryTableBaseOnMajor'

function AnalyticForm() {

    const [isShowModal, setisShowModal] = useState(false)
    const [analyticData, setAnalyticData] = useState(
        {
            bookIncome: [
                {
                    month: "",
                    donation: 0,
                    universityFunding: 0
                }
            ],
            purposeCount: [
                {
                    purposeType: "",
                    amountData: 0
                }
            ],
            totalBook: {
                totalBook: 0,
                bookEachLanguage: {
                    Khmer: 0,
                    English: 0
                }
            },
            bookEachCollege: [
                {
                    collegeName: "",
                    bookEachLanguage: {
                        kh: 0,
                        eng: 0
                    }
                }
            ],
            timeSpent: [
                {
                    studentId: 0,
                    studentName: "",
                    major: "",
                    degree: "",
                    generation: 0,
                    totalTimeSpent: 0
                }
            ],
            mostMajorBorrows: [
                {
                    majorName: "",
                    times: 0,
                    percentage: 0
                }
            ],
            mostBorrowBook: [
                {
                    rank: 0,
                    bookTitle: "",
                    genre: "",
                    borrowQuan: 0
                }
            ],
            mostMajorAttend: [
                {
                    majorName: "",
                    times: 0,
                    percentage: 0
                }
            ],
            studentEntryByTime: {
                totalAttend: 0,
                totalFemale: 0,
                morning: 0,
                afternoon: 0,
                evening: 0
            },
            getPurpose: [
                {
                    other: 0,
                    reading: 0,
                    assignment: 0,
                    usePc: 0,
                    month: ""
                },
                {
                    other: 0,
                    reading: 0,
                    assignment: 0,
                    usePc: 0,
                    month: ""
                }
            ]
        }
    )
    const [hideDropDownButton, setHideShowDropDown] = useState(true)
    const handleHideDropDownButton = () => hideDropDownButton ? setHideShowDropDown(false) : setHideShowDropDown(true)
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();

        // Set both startDate and endDate to the current date
        setValue({
            startDate: currentDate,
            endDate: currentDate
        });
    }, []);

    const [isLoading, setIsLoading] = useState(true)
    const fechData = async () => {
        setIsLoading(true)
        try {
            const getData = await axios.get(`/analytic?startDate=2024-01-01&endDate=2024-09-01`)
            setAnalyticData(getData.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fechData()
    }, [])

    useEffect(() => {
        console.log(analyticData.mostBorrowBook)
    }, [analyticData])


    const mySeriesData = [
        {
            name: "Donations",
            data: [26, 12, 23, 15, 16, 10, 24, 46, 8]
        },
        {
            name: "University Funding",
            data: [16, 36, 26, 17, 38, 27, 17, 24, 16]
        },
        {
            name: "Thesis Income",
            data: [3, 5, 8, 9, 11, 13, 16, 11, 13]
        }
    ];

    const myCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const myTitle = 'ប្រភពដែលសៀវភៅទទួលបាន';



    return (
        <>
            {isLoading ?
                (
                    <main className='flex justify-center items-center w-full h-full space-y-5'>
                        <span className="loading loading-dots text-accent loading-lg"></span>
                    </main>
                ) :
                (
                    <main className='flex flex-col w-full'>
                        <div className="headr-card w-full h-full space-y-5">
                            <div className="text-accent">
                                <div className="book-form font-noto w-full flex justify-start gap-5 lg:gap-5 sm:justify-between relative items-center">
                                    <div className='h-[46px] px-5 flex rounded-[10px] items-center bg-secondary'>
                                        <p>ទិន្ន័យវិភាគទូទៅ</p>
                                    </div>
                                    <button className="btn bg-secondary block lg:hidden text-accent me-7 sm:me-0" onClick={handleHideDropDownButton}>
                                        <SquareMenu />
                                    </button>
                                    <div className={`
                                container-button flex ${hideDropDownButton ? "hidden" : "block"} 
                                z-20 top-[50px] lg:top-0 lg:flex gap-3 lg:gap-5 absolute flex-col lg:flex-row 
                                lg:relative sm:right-0 rounded-lg drop-shadow-md lg:drop-shadow-none 
                                p-2 lg:p-0 bg-primary lg:bg-transparent`}>
                                        <div className="date-picker z-40">
                                            <Datepicker
                                                inputId='datePikcer'
                                                key={"datePicker"}
                                                showShortcuts={true}
                                                showFooter={true}
                                                value={value}
                                                onChange={newValue => setValue(newValue)}
                                                inputClassName="bg-secondary h-[48px] px-5 rounded-[10px] w-[290px] text-accent"
                                            />
                                        </div>
                                        <button className="btn btn-secondary font-noto">
                                            <FileDown />
                                            <p>ទាញរបាយការណ៍ប្រចាំខែ</p>
                                        </button>
                                        <button className="btn btn-secondary font-noto" onClick={() => setisShowModal(true)}>
                                            <FileBarChartIcon />
                                            បង្កើតរបាយករណ៏
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="total-book flex flex-col xl:flex-row gap-5 w-full h-full">
                                <TotalBook
                                    totalEnglishBook={analyticData.totalBook.bookEachLanguage.English}
                                    totalKhmerBook={analyticData.totalBook.bookEachLanguage.Khmer}
                                />
                                <EntryPurposeCard
                                    purposeData={analyticData.purposeCount}
                                />
                            </div>
                            <div className="book-analytic space-y-5">
                                {/* Book Data and Chart  */}
                                <div className='Book-analytic-Data h-full text-white rounded-[20px] space-y-5 '>
                                    <div className="BarChart-Contianer grid grid-cols-1 lg:grid-cols-2 h-[full] gap-5 w-full">
                                        <div className="chart w-full h-[350px] md:h-[497px] bg-secondary p-5 rounded-[20px]">
                                            {/* Total Book Each Major  */}
                                            <BarChart
                                                chartData={analyticData.bookEachCollege}
                                            />
                                        </div>
                                        <div className="bookInCome chart w-full h-[350px] md:h-[497px] bg-secondary p-5 rounded-[20px]">
                                            {/* Book income  */}
                                            <LineChart
                                                bookIncomeData={analyticData.bookIncome}
                                            />
                                        </div>
                                    </div>
                                    <div className="BarChart-Contianer grid grid-cols-1 xl:grid-cols-2 h-full gap-5 w-full">
                                        <div className="chart w-full h-fit lg:h-[497px] bg-secondary p-5 rounded-[20px]">
                                            {/* Book Borrowed Each Major  */}
                                            <BookBorrowedPieChart bookBorrowedData={analyticData.mostMajorBorrows || []} />
                                        </div>
                                        <div className="chart w-full h-[497px] bg-secondary p-5 rounded-[20px]">
                                            <MostBorrowBookTable bookBorrowData={analyticData.mostBorrowBook} />
                                        </div>
                                    </div>
                                </div>
                                {/* Entry Data  */}
                                <div className="entry-data continaer h-full text-white rounded-[20px] grid gap-5">
                                    <div className='h-full text-white rounded-[20px] grid grid-cols-1 2xl:grid-cols-2 gap-5'>
                                        <div className="header-card w-full h-[994px] md:h-[497px] grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <TotalEntryCardForm studentEntryByTime={analyticData.studentEntryByTime} />
                                            {/* Most enry base on major */}
                                            <EntryTableBaseOnMajor bookBorrowed={analyticData.mostMajorAttend} />
                                        </div>
                                        <div className="header-card h-[497px] flex gap-5 bg-secondary p-5 rounded-[20px]">
                                            <LineChart
                                                seriesData={mySeriesData}
                                                categories={myCategories}
                                                title={myTitle}
                                            />
                                        </div>
                                    </div>
                                    <div className="table-entry-hour h-[994px] xl:h-[497px]  grid xl:grid-cols-2 gap-5 w-full">
                                        <div className="table-stu bg-secondary p-5 flex flex-col h-full rounded-[20px] font-noto overflow-hidden">
                                            <div className="header h-[46px] text-accent">
                                                <p>ចំនួនម៉ោងនិស្សិតចូលប្រើប្រាស់បណ្ណាល័យ</p>
                                            </div>
                                            <div className="overflow-auto w-full h-full scrollbar-hide ">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead className='sticky top-0 left-0 bg-secondary'>
                                                        <tr className='text-accent'>
                                                            <th>ចំណាត់ថ្នាក់</th>
                                                            <th>អត្តលេខ</th>
                                                            <th>ឈ្មោះនិស្សិត</th>
                                                            <th>ជំនាញ</th>
                                                            <th>កំរិត</th>
                                                            <th>សរុបចំនួនម៉ោង</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {analyticData.timeSpent.map((item, index) => (
                                                            <tr key={item.studentId} className='text-accent hover'>
                                                                <td>{index + 1}</td>
                                                                <td>{item.studentId}</td>
                                                                <td>{item.studentName}</td>
                                                                <td>{item.major}</td>
                                                                <td>{item.degree}</td>
                                                                <td>{item.totalTimeSpent} ម៉ោង</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="table-stu bg-secondary p-5 h-full rounded-[20px] font-noto  overflow-auto">
                                            <div className="header h-[46px] text-accent">
                                                <p>ចំនួនម៉ោងបុគ្គលិកSRUចូលប្រើប្រាស់បណ្ណាល័យ</p>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="table">
                                                    {/* head */}
                                                    <thead>
                                                        <tr className='text-accent'>
                                                            <th>ចំណាត់ថ្នាក់</th>
                                                            <th>អត្តលេខ</th>
                                                            <th>ឈ្មោះបុគ្គលិក</th>
                                                            <th>មុខដំណែង</th>
                                                            <th>សរុបចំនួនម៉ោង</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className='text-accent hover'>
                                                            <td>1</td>
                                                            <td>300124</td>
                                                            <td>ព្រំ ចាន់ថន</td>
                                                            <td>គ្រូ</td>
                                                            <td>289 ម៉ោង</td>
                                                        </tr>
                                                        <tr className='text-accent hover'>
                                                            <td>2</td>
                                                            <td>300168</td>
                                                            <td>ចន វិក</td>
                                                            <td>និស្សិតហាត់ការ</td>
                                                            <td>189 ម៉ោង</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                )
            }

            <Modal isVisible={isShowModal} key={"getReport"}>
                <div className="header-modal flex items-center justify-between font-noto text-accent">
                    <p>បង្កើតរបាយករណ៏</p>
                    <button
                        onClick={() => setisShowModal(false)}
                        className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
                    >
                        <X />
                    </button>
                </div>
                <div className="modal-body font-noto mt-5 text-accent w-full flex flex-col gap-5">
                    <p>ជ្រើសប្រភេទរបាយការណ៏</p>
                    <select className="select select-bordered bg-secondary w-full">
                        <option>របាយការណ៏ប្រចាំត្រីមាសទី១</option>
                        <option>របាយការណ៏ប្រចាំត្រីមាសទី២</option>
                        <option>របាយការណ៏ប្រចាំត្រីមាសទី៣</option>
                        <option>របាយការណ៏ប្រចាំឆ្នាំ</option>
                    </select>
                    <BtnGredient>
                        ទាញរបាយការណ៍
                    </BtnGredient>
                </div>
            </Modal>
        </>
    )
}

export default AnalyticForm