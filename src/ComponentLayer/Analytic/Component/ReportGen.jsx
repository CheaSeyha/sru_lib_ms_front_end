import React, { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip'; // Import PizZip from 'pizzip'
import BtnGredient from '../../AdminPanel/Component/BtnGredient';
import axios from '../../../api/axios';

// Define Khmer months mapping
const khmerMonths = {
    '01': 'មករា',
    '02': 'កុម្ភៈ',
    '03': 'មីនា',
    '04': 'មេសា',
    '05': 'ឧសភា',
    '06': 'មិថុនា',
    '07': 'កក្កដា',
    '08': 'សីហា',
    '09': 'កញ្ញា',
    '10': 'តុលា',
    '11': 'វិច្ឆិកា',
    '12': 'ធ្នូ',
};

// Convert the date to Khmer month
const convertToKhmerMonth = (dateStr) => {
    const month = dateStr.split('-')[1]; // Extract the month from "YYYY-MM"
    return khmerMonths[month] || dateStr; // Return the Khmer month or original string if not found
};

const ReportGen = ({ totalBook }) => {
    const [reportData, setReportData] = useState(null); // State to hold API data
    const [selectedReport, setSelectedReport] = useState('Q1'); // State for selected report type

    // Function to get the date range based on the selected report type
    const getDateRange = () => {
        switch (selectedReport) {
            case 'Q1':
                return { startDate: '2024-01', endDate: '2024-03' }; // First quarter
            case 'Q2':
                return { startDate: '2024-04', endDate: '2024-06' }; // Second quarter
            case 'Q3':
                return { startDate: '2024-07', endDate: '2024-09' }; // Third quarter
            case 'YEARLY':
                return { startDate: '2024-01', endDate: '2024-12' }; // Yearly report
            default:
                return { startDate: '2024-01', endDate: '2024-03' }; // Default to Q1
        }
    };

    // Fetch report data based on selected date range
    const getReportData = async () => {
        const { startDate, endDate } = getDateRange();
        try {
            const response = await axios.get(`/report?startDate=${startDate}&endDate=${endDate}`);
            setReportData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const aggregateMonthlyEntries = (entries) => {
        return entries.reduce((acc, entry) => {
            const { month, time } = entry;
            const monthName = convertToKhmerMonth(month);

            // Initialize month data if not present
            if (!acc[monthName]) {
                acc[monthName] = {
                    mt: 0, // Morning Total
                    mft: 0, // Female Morning Total
                    at: 0, // Afternoon Total
                    aft: 0, // Afternoon Female Total
                    nt: 0, // Night Total
                    nft: 0, // Night Female Total
                    sst: 0, // Saturday/Sunday Total
                    ssft: 0, // Saturday/Sunday Female Total
                    tt: 0, // Total
                    ftt: 0 // Female Total
                };
            }

            // Add the current entry's data to the aggregated data
            const currentEntry = acc[monthName];

            switch (time) {
                case 'Morning':
                    currentEntry.mt += entry.entry.TotalAttend;
                    currentEntry.mft += entry.entry.FemaleAttend;
                    break;
                case 'Afternoon':
                    currentEntry.at += entry.entry.TotalAttend;
                    currentEntry.aft += entry.entry.FemaleAttend;
                    break;
                case 'Evening':
                    currentEntry.nt += entry.entry.TotalAttend;
                    currentEntry.nft += entry.entry.FemaleAttend;
                    break;
                case 'Saturday & Sunday':
                    currentEntry.sst += entry.entry.TotalAttend;
                    currentEntry.ssft += entry.entry.FemaleAttend;
                    break;
                default:
                    break;
            }

            // Update total and female total
            currentEntry.tt += entry.entry.TotalAttend;
            currentEntry.ftt += entry.entry.FemaleAttend;

            return acc;
        }, {});
    };

    const mapApiDataToTemplate = () => {
        if (!reportData) return null;

        // Calculate additional values
        const ttdns = reportData.listOfDonation.reduce((sum, donation) => sum + donation.bookQuan, 0);

        const dr = reportData.libraryStaff.filter(staff => staff.position === "មន្ត្រីទទួលបន្ទុក").length;

        const int = reportData.libraryStaff.filter(staff => staff.position === "ហាត់ការ").length;

        const totalAttendance = reportData.studentMonthlyEntry.reduce((sum, entry) => sum + entry.entry.TotalAttend, 0) +
            reportData.staffMonthlyEntry.reduce((sum, entry) => sum + entry.entry.TotalAttend, 0);

        const totalFemaleAttendance = reportData.studentMonthlyEntry.reduce((sum, entry) => sum + entry.entry.FemaleAttend, 0) +
            reportData.staffMonthlyEntry.reduce((sum, entry) => sum + entry.entry.FemaleAttend, 0);

        // Sum total books from bookEachCollege
        const tb = reportData.bookEachCollege.reduce((total, college) => {
            return total + Object.values(college.bookEachLanguage).reduce((sum, books) => sum + books, 0);
        }, 0);

        const ttd = ttdns;

        // Aggregate entries for staff and student data
        const sru = aggregateMonthlyEntries(reportData.staffMonthlyEntry);
        const st = aggregateMonthlyEntries(reportData.studentMonthlyEntry);
        const changeReport = () => {
            switch (selectedReport) {
                case 'Q1':
                    return "ប្រចាំត្រីមាសទី១"; // First quarter
                case 'Q2':
                    return "ប្រចាំត្រីមាសទី២"; // Second quarter
                case 'Q3':
                    return "ប្រចាំត្រីមាសទី៣"; // Third quarter
                case 'YEARLY':
                    return "ប្រចាំឆ្នាំ"; // Yearly report
                default:
                    return ""; // Default case to handle any unexpected values
            }
        };
        // Map API data to the new structure for the template
        const data = {


            reportType: changeReport(),

            // Staff Work In Library
            s: reportData.libraryStaff.map((staff, index) => ({
                i: index + 1,
                sName: staff.staffName,
                g: staff.gender === 'Male' ? 'ប' : 'ស',
                pos: staff.position,
                degree: staff.degreeLevel,
                major: staff.majorId.join(', '),
                y: staff.year || '',
                sw: staff.shiftWork
            })),

            // Sru Staff Entry
            sru: Object.entries(sru).map(([month, data]) => ({
                m: month,
                mt: data.mt,
                mft: data.mft,
                at: data.at,
                aft: data.aft,
                nt: data.nt,
                nft: data.nft,
                sst: data.sst,
                ssft: data.ssft,
                tt: data.tt,
                ftt: data.ftt
            })),

            // Student Monthly Entry
            st: Object.entries(st).map(([month, data]) => ({
                m: month,
                mt: data.mt,
                mft: data.mft,
                at: data.at,
                aft: data.aft,
                nt: data.nt,
                nft: data.nft,
                sst: data.sst,
                ssft: data.ssft,
                tt: data.tt,
                ftt: data.ftt
            })),

            // Donation Data
            d: reportData.listOfDonation.map((donation, index) => ({
                i: index + 1,
                dname: donation.donatorName,  // Donation Name
                bookTittle: donation.bookTitle,
                la: donation.languageName,
                btype: donation.genre,  // Book Type
                a: donation.bookQuan + "ក្បាល",  // Amount
                date: donation.donateDate
            })),

            // Calculated values
            ttdns: ttdns,  // Total Donation books
            dr: dr,  // Staff with position "មន្ត្រីទទួលបន្ទុក"
            int: int,  // Staff with position "ហាត់ការ"
            entry: totalAttendance,  // Sum of Total Attend from studentMonthlyEntry and staffMonthlyEntry
            fe: totalFemaleAttendance,  // Sum of Female Attend from studentMonthlyEntry and staffMonthlyEntry
            tb: tb,  // Total books
            ttd: ttd  // Total Donation books (same as ttdns)
        };

        return data;
    };


    // Function to generate the document
    const generateDocument = async () => {
        const templateResponse = await fetch('../src/assets/report_form1.docx');
        const templateBuffer = await templateResponse.arrayBuffer();
        const zip = new PizZip(templateBuffer);
        const doc = new Docxtemplater().loadZip(zip);

        const templateData = mapApiDataToTemplate();

        if (!templateData) {
            alert('No data available for report generation');
            return;
        }

        doc.setData(templateData);
        doc.render();

        const generatedBlob = doc.getZip().generate({ type: 'blob' });
        saveAs(generatedBlob, 'output.docx');
    };

    // Handle change in the report type selection
    const handleReportChange = (event) => {
        setSelectedReport(event.target.value);
        getReportData(); // Fetch new data when the report type changes
    };

    return (
        <div className="modal-body font-noto mt-5 text-accent w-full flex flex-col gap-5">
            <p>ជ្រើសប្រភេទរបាយការណ៏</p>
            <select
                className="select select-bordered bg-secondary w-full"
                value={selectedReport}
                onChange={handleReportChange} // Listen for changes
            >
                <option value="Q1">របាយការណ៏ប្រចាំត្រីមាសទី១</option>
                <option value="Q2">របាយការណ៏ប្រចាំត្រីមាសទី២</option>
                <option value="Q3">របាយការណ៏ប្រចាំត្រីមាសទី៣</option>
                <option value="YEARLY">របាយការណ៏ប្រចាំឆ្នាំ</option>
            </select>
            <BtnGredient onClick={generateDocument}>
                ទាញរបាយការណ៍
            </BtnGredient>
        </div>
    );
};

export default ReportGen;
