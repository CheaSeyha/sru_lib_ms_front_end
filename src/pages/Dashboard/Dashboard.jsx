import React, { useEffect, useState } from "react";
import CardData from "./Component/CardData";
import TableStuEntry from "./Component/TableStuEntry";
import BGImag from "../../assets/image/sru_lib_Vector1.jpg";
import MejorPieChart from "./Component/MejorPieChart";
import WeeklyVisitorChart from "./Component/WeeklyVisitorChart";
import RadialBarChart from "./Component/RadialBarChart";
import { useTranslation } from "react-i18next";
import axios from "../../api/axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import useWSDashboard from "./Hook/useWSDashbaord"; // <- your hook

function Dashbaord() {
  const { username, role } = useAuth();
  const { t } = useTranslation();

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
  const [weelyVisitorData, setWeelyVisitorData] = useState(
    defaultWeeklyVisitorData,
  );
  const [recentEntries, setRecentEntries] = useState(null);
  const [wsRefreshTrigger, setWsRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ WebSocket hook
  const {
    data: wsData,
    connected: wsConnected,
    error: wsError,
  } = useWSDashboard();

  // Function to update all dashboard states from a data object
  const updateDashboardData = (data) => {
    if (!data) return;

    // Update weekly visitor data
    if (data.weeklyVisitor?.days) {
      setWeelyVisitorData(data.weeklyVisitor.days.map((d) => d.count));
    } else if (Array.isArray(data.weeklyVisitor)) {
      setWeelyVisitorData(data.weeklyVisitor);
    }

    // Update card statistics
    if (data.cardData) {
      setCardDataShow(data.cardData);
    }

    // Update book availability
    if (data.bookAvailable) {
      setBookAviable(data.bookAvailable);
    }

    // Update major-wise visitor data
    if (data.totalMajorVisitor) {
      setDataMejorVisitor(data.totalMajorVisitor);
    }

    // Update recent entries table if provided
    if (data.attendDetail) {
      setRecentEntries(data.attendDetail);
    } else {
      setRecentEntries(null);
    }
  };

  const getDataApi = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const response = await axios.get("/dashboard");
      updateDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  // Compatibility alias for TableStuEntry
  const getCardDataApi = () => getDataApi(false);

  // ✅ initial load via API
  useEffect(() => {
    getDataApi(true);
  }, []);

  // ✅ handle WebSocket updates
  useEffect(() => {
    if (wsData) {
      console.log("📥 Received WebSocket update:", wsData);
      updateDashboardData(wsData);
      // Trigger a refresh of any child components that might need fresh data from their own APIs
      setWsRefreshTrigger((prev) => prev + 1);
      // Once we get any real-time data, we're definitely not "loading"
      setLoading(false);
    }
  }, [wsData]);

  return (
    <>
      {loading ? (
        <main className="flex justify-center items-center w-full h-full space-y-5">
          <span className="loading loading-dots text-accent loading-lg"></span>
        </main>
      ) : (
        <main className="flex flex-col w-full h-fit xl:h-full space-y-5 font-noto ">
          {/* Header content */}
          <div
            className="flex flex-col w-full h-fit sm:h-fit md:h-fit lg:h-[300px] xl:h-[400px] rounded-[20px] p-[20px] text-white gap-5 xl:gap-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, #002032bb, #00203200), url(${BGImag})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tittle flex justify-between">
              <div className="sruText">
                <p className="sm:text-[30px] xl:text-[30px] font-moul">
                  {t("sruText")}
                </p>

                <div className="flex items-center gap-3">
                  <p className="text-[10px] xl:text-[15px] font-bold font-noto tracking-wide">
                    WELCOME BACK,{" "}
                    <span className="text-accent uppercase">{username}</span>
                  </p>

                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-300 ${
                      wsConnected
                        ? "bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                    title={wsError ?? "WebSocket Status"}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${wsConnected ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                    />
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {wsConnected ? "Live" : "Offline"}
                    </span>
                  </div>
                </div>

                {wsError && (
                  <p className="text-[10px] mt-1 text-red-200">{wsError}</p>
                )}
              </div>

              {role === "admin" && (
                <NavLink
                  className="btn text-accent hidden sm:flex items-center justify-center rounded-[50px]"
                  to="/Analytic"
                >
                  View Analytic
                </NavLink>
              )}
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

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-col xl:flex-row container-main-content text-accent gap-5 overflow-y-auto scrollbar-hide">
            <div className="table-chart flex gap-5">
              <div className="table-container table-stu-entry w-full md:w-full h-[500px] xl:h-full xl:w-[450px] 2xl:w-[885px] bg-secondary rounded-[20px] p-5">
                <TableStuEntry
                  getCardDataApi={getCardDataApi}
                  refreshCardData={getCardDataApi}
                  wsEntries={recentEntries}
                  wsRefreshTrigger={wsRefreshTrigger}
                />
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row h-[1000px] sm:h-[500px] xl:h-full gap-5">
              <div className="chart-data flex flex-col w-full sm:w-[250px] xl:w-[304px] h-[405px] sm:h-full bg-secondary rounded-[20px] md:bg-none p-5">
                <div className="cardTitle h-[46px] w-full flex">
                  <p>សរុបចំនួនចូលតាមមហាវិទ្យាល័យ</p>
                </div>
                <div className="pieChart-container flex-1 w-full h-full">
                  <MejorPieChart DataMejorVisitor={dataMejorVisitor} />
                </div>
              </div>

              <div className="flex-1 flex flex-col w-full h-full gap-5">
                <div className="flex-1 weekly-visitor-container bg-secondary w-full h-full flex flex-col rounded-[20px] p-5">
                  <WeeklyVisitorChart WeelyVisitorData={weelyVisitorData} />
                </div>

                <div className="flex flex-col book-available w-full h-[190px] p-5 bg-secondary rounded-[20px]">
                  <p className="p-0 ">សរុបចំនួនសៀវភៅ</p>
                  <div className="flex-1 container-radial grid grid-cols-2 h-full items-center">
                    {bookAviable.map((e, index) => (
                      <RadialBarChart
                        key={index}
                        bookLange={e.language}
                        totalBook={e.totalBook}
                        bookAvaible={e.available}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Dashbaord;
