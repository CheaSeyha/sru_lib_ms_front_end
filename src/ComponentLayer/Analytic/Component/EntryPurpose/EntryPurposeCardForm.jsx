import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ListFilter } from 'lucide-react';
import CardPurposeData from '../EntryPurpose/CardPurposeData'


function EntryPurposeCard() {
    const [selectedFilterMajorName, setSelectedFilterMajorName] = useState('All'); // State for selected filter
    const dropdownRef = useRef(null); // Create a ref to the <details> element
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [majorForFilter, setMajorForFilter] = useState(["All", "CS", "ENG", "BUS"]);

    // Handle selection
    const handleSelection = (value) => {
        setSelectedFilterMajorName(value);
        console.log('Selected:', value); // Just for demonstration
        dropdownRef.current.removeAttribute('open'); // Close the dropdown
    };


    return (
        <div className='entry-purpose w-[620px] p-5 bg-secondary rounded-[20px] flex flex-col gap-5'>
            <div className="header font-noto text-accent flex justify-between">
                <p>សរុបចំនួនគោលបំណងនិស្សិតចូលប្រើប្រាស់ប័ណ្ណាល័យ</p>
                <div className='w-[90px]'>
                    <DatePicker
                        id='entryPurpose-date-picker'
                        key="entryPurpose-date-picker"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="MMM-yyyy" // Display month as name (e.g., "Aug")
                        showMonthYearPicker
                        className="w-full p-[10px] rounded-[5px] text-black"
                    />
                </div>
            </div>
            <details ref={dropdownRef} className="dropdown w-full">
                <summary className="btn bg-primary text-accent">
                    <span><ListFilter /></span>Filter : {selectedFilterMajorName}
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-accent">
                    {majorForFilter.map((major) => (
                        <li key={major}>
                            <a onClick={() => handleSelection(major)}>{major}</a>
                        </li>
                    ))}
                </ul>
            </details>
            <div className="card-purpose-container w-full h-full grid grid-cols-2 gap-5">
                <CardPurposeData amountData={23} cardType="Reading" />
                <CardPurposeData amountData={47} cardType="Use PC"/>
                <CardPurposeData amountData={86} cardType="Assigment"/>
                <CardPurposeData amountData={96} cardType="Other"/>
            </div>
        </div>
    );
}

export default EntryPurposeCard;
