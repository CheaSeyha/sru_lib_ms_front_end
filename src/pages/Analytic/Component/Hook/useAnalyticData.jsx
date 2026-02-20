// useAnalyticData.js

import { useState, useEffect } from "react";
import axios from "axios";

const useAnalyticData = (startDate, endDate) => {
    const [analyticData, setAnalyticData] = useState({
        bookIncome: [
            { month: "", donation: 0, universityFunding: 0 }
        ],
        purposeCount: [
            { purposeType: "", amountData: 0 }
        ],
        totalBook: {
            totalBook: 0,
            bookEachLanguage: { Khmer: 0, English: 0 }
        },
        bookEachCollege: [
            { collegeName: "", bookEachLanguage: { kh: 0, eng: 0 } }
        ],
        timeSpent: [
            { studentId: 0, studentName: "", major: "", degree: "", generation: 0, totalTimeSpent: 0 }
        ],
        mostMajorBorrows: [
            { majorName: "", times: 0, percentage: 0 }
        ],
        mostBorrowBook: [
            { rank: 0, bookTitle: "", genre: "", borrowQuan: 0 }
        ],
        mostMajorAttend: [
            { majorName: "", times: 0, percentage: 0 }
        ],
        studentEntryByTime: {
            totalAttend: 0, totalFemale: 0, morning: 0, afternoon: 0, evening: 0
        },
        getPurpose: [
            { other: 0, reading: 0, assignment: 0, usePc: 0, month: "" },
            { other: 0, reading: 0, assignment: 0, usePc: 0, month: "" }
        ]
    });

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/analytic?startDate=${startDate}&endDate=${endDate}`);
            setAnalyticData(response.data);
        } catch (error) {
            console.error("Error fetching analytic data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]); // Re-fetch when dates change

    return { analyticData, isLoading };
};

export default useAnalyticData;
