import { useState, useEffect } from 'react';

// Define the custom hook
function useAnalyticData() {
    // Initialize the analytic data
    const analyticData = {
        bookAnalysis: {
            totalBooks: {
                khmerBooks: 8015,
                englishBooks: 11663,
            },
            booksByMajor: [
                { major: "English", khmerBooks: 23, englishBooks: 23 },
                { major: "Business", khmerBooks: 65, englishBooks: 65 },
                { major: "IT", khmerBooks: 23, englishBooks: 23 },
                { major: "Agriculture", khmerBooks: 65, englishBooks: 65 },
                { major: "Law", khmerBooks: 24, englishBooks: 24 },
                { major: "Other", khmerBooks: 34, englishBooks: 34 },
                { major: "News", khmerBooks: 48, englishBooks: 48 },
            ],
            borrowedBooks: {
                byMajor: [
                    { major: "Computer Science", amount: 34 },
                    { major: "Public Administration", amount: 67 },
                    { major: "English", amount: 25 },
                    { major: "Math", amount: 74 },
                    { major: "Business", amount: 23 },
                ],
                mostBorrowed: [
                    { ranking: 1, name: "JAVA OOP", type: "CS", total: 264 },
                    { ranking: 2, name: "C#", type: "CS", total: 345 },
                    { ranking: 3, name: "DSA", type: "CS", total: 354 },
                    { ranking: 4, name: "DATABASE", type: "CS", total: 373 },
                ],
            },
            income: [
                { month: "Jan", donation: 45, uniFunding: 24, thesisIncome: 27 },
                { month: "Feb", donation: 45, uniFunding: 27, thesisIncome: 38 },
                { month: "Mar", donation: 39, uniFunding: 37, thesisIncome: 34 },
                { month: "Apr", donation: 29, uniFunding: 29, thesisIncome: 36 },
                { month: "May", donation: 29, uniFunding: 24, thesisIncome: 28 },
            ],
        },
        entryAnalysis: {
            totalEntries: {
                female: 34,
                morning: 34,
                afternoon: 34,
                night: 34,
            },
            purposeByMonth: [
                { month: "Jan", reading: 45, usePC: 24, assignment: 27, others: 27 },
                { month: "Feb", reading: 45, usePC: 24, assignment: 27, others: 27 },
                { month: "Mar", reading: 45, usePC: 24, assignment: 27, others: 27 },
            ],
            topEntryTimes: [
                {
                    ranking: 1,
                    studentId: 300124,
                    studentName: "JSON Kon Khmer",
                    major: "CS",
                    degree: "Bachelor",
                    totalTime: 36,
                },
                {
                    ranking: 2,
                    studentId: 300125,
                    studentName: "Demo Data",
                    major: "CS",
                    degree: "Bachelor",
                    totalTime: 34,
                },
            ],
        },
    };
    const [data, setData] = useState(analyticData);
    // Return the analytic data
    return { data };
}

export default useAnalyticData;
