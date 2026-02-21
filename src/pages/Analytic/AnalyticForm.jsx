import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import TotalBook from "./Component/TotalBook/TotalBook";
import EntryPurposeCard from "./Component/EntryPurpose/EntryPurposeCardForm";
import BookAnalyticForm from "./Component/TotalBook/BookAnalyticForm";
import { FileBarChartIcon, FileDown, SquareMenu } from "lucide-react";
import Modal from "../../layout/components/Modal";
import { X } from "lucide-react";
import BtnGredient from "../Dashboard/Component/BtnGredient";
import axios from "../../api/axios";
import BarChart from "./Component/Chart/BarChart";
import LineChart from "./Component/Chart/LineChart";
import BookBorrowedPieChart from "./Component/TotalBook/BookBorrowedPieChart";
import MostBorrowBookTable from "./Component/TotalBook/MostBorrowBookTable";
import TotalEntryCardForm from "./Component/EntryPurpose/TotalEntryCardForm";
import EntryTableBaseOnMajor from "./Component/EntryPurpose/EntryTableBaseOnMajor";
import LineChartEntry from "./Component/Chart/LineChartEntry";
import toast, { Toaster } from "react-hot-toast";
import ReportGen from "./Component/ReportGen";

// Utility function to format Date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Utility function to get the first day of the current month
const getFirstDayOfMonth = (date) => {
  return formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
};

// Utility function to get the last day of the current month
const getLastDayOfMonth = (date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return formatDate(lastDay);
};

function AnalyticForm() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [analyticData, setAnalyticData] = useState({
    bookIncome: [{ month: "", donation: 0, universityFunding: 0 }],
    purposeCount: [{ purposeType: "", amountData: 0 }],
    totalBook: {
      totalBook: 0,
      bookEachLanguage: { Khmer: 0, English: 0 },
    },
    bookEachCollege: [
      {
        collegeName: "",
        bookEachLanguage: { kh: 0, eng: 0 },
      },
    ],
    timeSpent: [
      {
        studentId: 0,
        studentName: "",
        major: "",
        degree: "",
        generation: 0,
        totalTimeSpent: 0,
      },
    ],
    mostMajorBorrows: [
      {
        majorName: "",
        times: 0,
        percentage: 0,
      },
    ],
    mostBorrowBook: [
      {
        rank: 0,
        bookTitle: "",
        genre: "",
        borrowQuan: 0,
      },
    ],
    mostMajorAttend: [
      {
        majorName: "",
        times: 0,
        percentage: 0,
      },
    ],
    studentEntryByTime: {
      totalAttend: 0,
      totalFemale: 0,
      morning: 0,
      afternoon: 0,
      evening: 0,
    },
    getPurpose: [
      { other: 0, reading: 0, assignment: 0, usePc: 0, month: "" },
      { other: 0, reading: 0, assignment: 0, usePc: 0, month: "" },
    ],
  });
  const [hideDropDownButton, setHideDropDownButton] = useState(true);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  // Set default dates for start and end
  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1); // First day of the current year
    const endDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month

    setValue({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  }, []);

  // Fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const defaultStartDate = "2024-01-01"; // Default start date
      const { startDate, endDate } = value;
      const start = startDate || defaultStartDate; // Use default if not provided
      const end = endDate || getFirstDayOfMonth(new Date()); // Use first day of current month if not provided
      // Fetch data using the startDate and endDate
      const response = await axios.get(
        `/analytic?startDate=${start}&endDate=${end}`,
      );

      // Set the analytic data from the response
      setAnalyticData(response.data);
    } catch (error) {
      // Log the entire error response for debugging
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data whenever the startDate or endDate changes
  useEffect(() => {
    if (value.startDate && value.endDate) {
      fetchData();
    }
  }, [value]);

  // Handle date change
  const handleDateChange = (newValue) => {
    const today = new Date();
    const formattedToday = formatDate(today);

    const startDate = newValue.startDate ? new Date(newValue.startDate) : null;
    const endDate = newValue.endDate ? new Date(newValue.endDate) : null;

    if (startDate && endDate) {
      // Check if the selected start date is after the end date
      if (startDate > endDate) {
        toast.error("កាលបរិច្ឆេទ​ហួសពី​កាលបរិច្ឆេទ​បច្ចុប្បន្ន");
        return;
      }

      // Check if the end date is in the future
      if (endDate > today) {
        toast.error("កាលបរិច្ឆេទ​ហួស​ពី​កាលបរិច្ឆេទ​បច្ចុប្បន្ន");
        return;
      }
    }

    // Update state with valid dates
    setValue({
      startDate: startDate ? formatDate(startDate) : formattedToday,
      endDate: endDate ? formatDate(endDate) : getFirstDayOfMonth(today),
    });
  };

  const handleHideDropDownButton = () => {
    setHideDropDownButton((prevState) => !prevState);
  };
  return (
    <>
      {isLoading ? (
        <main className="flex justify-center items-center w-full h-full space-y-5">
          <span className="loading loading-dots text-accent loading-lg"></span>
        </main>
      ) : (
        <main className="flex flex-col w-full">
          <div className="headr-card w-full h-full space-y-5">
            <div className="text-accent">
              <div className="book-form font-noto w-full flex justify-start gap-5 lg:gap-5 sm:justify-between relative items-center">
                <div className="h-[46px] px-5 flex rounded-[10px] items-center bg-secondary">
                  <p>ទិន្ន័យវិភាគទូទៅ</p>
                </div>
                <button
                  className="btn bg-secondary block lg:hidden text-accent me-7 sm:me-0"
                  onClick={handleHideDropDownButton}
                >
                  <SquareMenu />
                </button>
                <div
                  className={`
                                container-button flex ${hideDropDownButton ? "hidden" : "block"} 
                                z-20 top-[50px] lg:top-0 lg:flex gap-3 lg:gap-5 absolute flex-col lg:flex-row 
                                lg:relative sm:right-0 rounded-lg drop-shadow-md lg:drop-shadow-none 
                                p-2 lg:p-0 bg-primary lg:bg-transparent`}
                >
                  <div className="date-picker z-40">
                    <Datepicker
                      inputId="datePikcer"
                      key={"datePicker"}
                      showShortcuts={true}
                      showFooter={true}
                      separator="to"
                      value={value}
                      onChange={handleDateChange}
                      inputClassName="bg-secondary h-[48px] px-5 rounded-[10px] w-[290px] text-accent"
                    />
                  </div>
                  <button className="btn btn-secondary font-noto">
                    <FileDown />
                    <p>ទាញរបាយការណ៍ប្រចាំខែ</p>
                  </button>
                  <button
                    className="btn btn-secondary font-noto"
                    onClick={() => setIsShowModal(true)}
                  >
                    <FileBarChartIcon />
                    បង្កើតរបាយករណ៏
                  </button>
                </div>
              </div>
            </div>
            <div className="total-book flex flex-col xl:flex-row gap-5 w-full h-full">
              <TotalBook
                totalEnglishBook={
                  analyticData.totalBook.bookEachLanguage.English
                }
                totalKhmerBook={analyticData.totalBook.bookEachLanguage.Khmer}
              />
              <EntryPurposeCard purposeData={analyticData.purposeCount} />
            </div>
            <div className="book-analytic space-y-5">
              {/* Book Data and Chart  */}
              <div className="Book-analytic-Data h-full text-white rounded-[20px] space-y-5 ">
                <div className="BarChart-Contianer grid grid-cols-1 lg:grid-cols-2 h-[full] gap-5 w-full">
                  <div className="chart w-full h-[350px] md:h-[497px] bg-secondary p-5 rounded-[20px]">
                    {/* Total Book Each Major  */}
                    <BarChart chartData={analyticData.bookEachCollege} />
                  </div>
                  <div className="bookInCome chart w-full h-[350px] md:h-[497px] bg-secondary p-5 rounded-[20px]">
                    {/* Book income  */}
                    <LineChart bookIncomeData={analyticData.bookIncome} />
                  </div>
                </div>
                <div className="BarChart-Contianer grid grid-cols-1 xl:grid-cols-2 h-full gap-5 w-full">
                  <div className="chart w-full h-fit lg:h-[497px] bg-secondary p-5 rounded-[20px]">
                    {/* Book Borrowed Each Major  */}
                    <BookBorrowedPieChart
                      bookBorrowedData={analyticData.mostMajorBorrows || []}
                    />
                  </div>
                  <div className="chart w-full h-[497px] bg-secondary p-5 rounded-[20px]">
                    <MostBorrowBookTable
                      bookBorrowData={analyticData.mostBorrowBook}
                    />
                  </div>
                </div>
              </div>
              {/* Entry Data  */}
              <div className="entry-data continaer h-full text-white rounded-[20px] grid gap-5">
                <div className="h-full text-white rounded-[20px] grid grid-cols-1 2xl:grid-cols-2 gap-5">
                  <div className="header-card w-full h-[994px] md:h-[497px] grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TotalEntryCardForm
                      studentEntryByTime={analyticData.studentEntryByTime}
                    />
                    {/* Most enry base on major */}
                    <EntryTableBaseOnMajor
                      bookBorrowed={analyticData.mostMajorAttend}
                    />
                  </div>
                  <div className="header-card h-[497px] flex gap-5 bg-secondary p-5 rounded-[20px]">
                    <LineChartEntry entryMajor={analyticData.getPurpose} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Toaster position="top-center" />
        </main>
      )}

      <Modal isVisible={isShowModal} key={"getReport"}>
        <div className="header-modal flex items-center justify-between font-noto text-accent">
          <p>បង្កើតរបាយករណ៏</p>
          <button
            onClick={() => setIsShowModal(false)}
            className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
          >
            <X />
          </button>
        </div>
        <ReportGen />
      </Modal>
    </>
  );
}

export default AnalyticForm;
