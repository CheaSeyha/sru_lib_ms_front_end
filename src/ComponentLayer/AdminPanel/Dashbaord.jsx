import React, { useEffect, useState } from 'react';
import CardData from './Component/CardData';
import TableStuEntry from './Component/TableStuEntry';
import BGImag from '../../assets/image/sru_lib_Vector1.jpg';
import MejorPieChart from './Component/MejorPieChart';
import WeeklyVisitorChart from './Component/WeeklyVisitorChart';
import RadialBarChart from './Component/RadialBarChart';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';
import { NavLink } from 'react-router-dom';

function Dashbaord() {
    const defaultCardData = [
        { cardType: "Entry", amount: 0, analytic: 0.0 },
        { cardType: "Book Borrow", amount: 0, analytic: 0.0 },
        { cardType: "Book Donation", amount: 0, analytic: 0.0 },
        { cardType: "Total Entry Of This Month", amount: 0, analytic: 0.0 },
    ];

    const defaultBookAvailability = [
        { language: "English", totalBook: 0, available: 0 },
        { language: "Khmer", totalBook: 0, available: 0 },
    ];

    const defaultWeeklyVisitorData = [0, 0, 0, 0, 0, 0, 0];

    const [cardDataShow, setCardDataShow] = useState(defaultCardData);
    const [dataMejorVisitor, setDataMejorVisitor] = useState([]);
    const [bookAviable, setBookAviable] = useState(defaultBookAvailability);
    const [weelyVisitorData, setWeelyVisitorData] = useState(defaultWeeklyVisitorData);
    const [loading, setLoading] = useState(true); // Loading state

    const getDataApi = async () => {
        setLoading(true); // Set loading to true before API call
        try {
            const response = await axios.get("/dashboard");
            // Get data from API and set to state
            setWeelyVisitorData(response.data.weeklyVisitor.days.map(dayval => dayval.count));
            setCardDataShow(response.data.cardData);
            setBookAviable(response.data.bookAvailable);
            setDataMejorVisitor(response.data.totalMajorVisitor);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    const getCardDataApi = async () => {
        try {
            const response = await axios.get("/dashboard");
            const limit = 10; // Set your desired limit here
            const limitedCardData = response.data.cardData.slice(0, limit);
            setCardDataShow(limitedCardData);
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };



    useEffect(() => {
        getDataApi();
    }, []);

    const { t } = useTranslation();

    return (
        <>
            {loading ? (
                <main className='flex justify-center items-center w-full h-full space-y-5'>
                    <span className="loading loading-dots text-accent loading-lg"></span>
                </main>
            ) : (
                <main className='flex flex-col w-full h-fit xl:h-full space-y-5'>
                    {/* Header content */}
                    <div className='flex flex-col w-full h-fit sm:h-fit md:h-fit lg:h-[300px] xl:h-[400px] rounded-[20px] p-[20px] text-white gap-5 xl:gap-0'
                        style={{
                            backgroundImage: `linear-gradient(to bottom, #002032bb, #00203200), url(${BGImag})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        <div className="tittle flex justify-between">
                            <div className="sruText">
                                <p className="sm:text-[30px] xl:text-[30px] font-moul">{t("sruText")}</p>
                                <p className="text-[10px] xl:text-[15px] font-bold font-noto">WELCOME BACK JOHNSEY</p>
                            </div>
                            <NavLink className="btn text-accent hidden sm:flex items-center justify-center rounded-[50px]" to="/Analytic">
                                View Analytic
                            </NavLink>
                        </div>
                        <div className="showCard flex-1 grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[20px] place-items-end">
                            {cardDataShow.map((e, index) => (
                                <CardData
                                    key={index}
                                    cardType={e.cardType}
                                    amount={e.amount}
                                    analytic={e.analytic}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Header content */}
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col md:flex-col xl:flex-row container-main-content text-accent gap-5 overflow-y-auto scrollbar-hide">
                        <div className="table-chart flex gap-5">
                            {/* table List Of Student name */}
                            <div className="table-container table-stu-entry w-full md:w-full h-[500px] xl:h-full xl:w-[450px] 2xl:w-[885px] bg-secondary rounded-[20px] p-5">
                                <TableStuEntry getCardDataApi={getCardDataApi} />
                            </div>
                            {/* table List Of Student name */}
                        </div>
                        {/* Card Piechart And Weekly visitor */}
                        <div className="w-full flex flex-col sm:flex-row h-[1000px] sm:h-[500px] xl:h-full gap-5">
                            {/* Chart Data Mejor Visitor */}
                            <div className="chart-data flex flex-col w-full sm:w-[250px] xl:w-[304px] h-[405px] sm:h-full bg-secondary rounded-[20px] md:bg-none p-5">
                                <div className="cardTitle h-[46px] w-full flex">
                                    <p>Total Mejor Visitor</p>
                                </div>
                                <div className="pieChart-container flex-1 w-full h-full">
                                    <MejorPieChart DataMejorVisitor={dataMejorVisitor} />
                                </div>
                            </div>
                            {/* Chart Data Mejor Visitor */}
                            <div className="flex-1 flex flex-col w-full h-full gap-5">
                                <div className="flex-1 weekly-visitor-container bg-secondary w-full h-full flex flex-col rounded-[20px] p-5">
                                    <WeeklyVisitorChart WeelyVisitorData={weelyVisitorData} />
                                </div>
                                <div className="flex flex-col book-available w-full h-[190px] p-5 bg-secondary rounded-[20px]">
                                    <p className='p-0'>Total Book of This Month</p>
                                    <div className="flex-1 container-radial grid grid-cols-2 h-full items-center">
                                        {bookAviable.map((e, index) => (
                                            <RadialBarChart key={index} bookLange={e.language} totalBook={e.totalBook} bookAvaible={e.available} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card Piechart And Weekly visitor */}
                    </div>
                    {/* Main Content */}
                </main>
            )}
        </>
    );
}

export default Dashbaord;
