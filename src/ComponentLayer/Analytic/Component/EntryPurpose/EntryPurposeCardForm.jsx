import React, { useState, useRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { ListFilter } from 'lucide-react';
import CardPurposeData from '../EntryPurpose/CardPurposeData'
import Datepicker from "react-tailwindcss-datepicker";

function EntryPurposeCard() {
    const [selectedFilterMajorName, setSelectedFilterMajorName] = useState('All'); // State for selected filter
    const dropdownRef = useRef(null); // Create a ref to the <details> element
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [majorForFilter, setMajorForFilter] = useState(["All", "CS", "ENG", "BUS"]);
    const [value, setValue] = useState("");
    // Handle selection
    const handleSelection = (value) => {
        setSelectedFilterMajorName(value);
        console.log('Selected:', value); // Just for demonstration
        dropdownRef.current.removeAttribute('open'); // Close the dropdown
    };


    return (
        <div className='entry-purpose w-full h-full p-5 bg-secondary rounded-[20px] flex flex-col justify-between gap-5'>
            <div className="header font-noto text-accent flex justify-between">
                <p>សរុបចំនួនគោលបំណងនិស្សិតចូលប្រើប្រាស់ប័ណ្ណាល័យ</p>
            </div>
            <div className="button-contianer w-full flex items-center gap-5 ">
                <details ref={dropdownRef} className="dropdown">
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
                <div className='w-[170px]'>
                    <Datepicker
                        inputId='EntryPurpose'
                        useRange={false}
                        asSingle={true}
                        value={value}
                        onChange={newValue => setValue(newValue)}
                    />
                </div>
            </div>
            <div className="card-purpose-container w-full h-fit grid grid-cols-2 gap-5 items-end">
                <CardPurposeData amountData={23} cardType="Reading" />
                <CardPurposeData amountData={47} cardType="Use PC" />
                <CardPurposeData amountData={86} cardType="Assigment" />
                <CardPurposeData amountData={96} cardType="Other" />
            </div>
        </div>
    );
}

export default EntryPurposeCard;
