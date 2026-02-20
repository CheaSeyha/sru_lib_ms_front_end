import React, { useState, useRef, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { ListFilter } from 'lucide-react';
import CardPurposeData from './CardPurposeData';
import Datepicker from "react-tailwindcss-datepicker";

function EntryPurposeCard({ purposeData }) {
    const [selectedFilterMajorName, setSelectedFilterMajorName] = useState('All'); // State for selected filter
    const dropdownRef = useRef(null); // Create a ref to the <details> element
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [majorForFilter, setMajorForFilter] = useState(["All", "CS", "ENG", "BUS"]);
    const [value, setValue] = useState("");

    // Default local purpose data with 0 as initial values
    const defaultPurposeData = [
        {
            purposeType: "Use PC",
            amountData: 0
        },
        {
            purposeType: "Other",
            amountData: 0
        },
        {
            purposeType: "Reading",
            amountData: 0
        },
        {
            purposeType: "Assignment",
            amountData: 0
        }
    ];

    // Local state to store purpose data
    const [pureposeDataLocal, setPurposeDataLocal] = useState(defaultPurposeData);

    useEffect(() => {
        if (purposeData && purposeData.length > 0) {
            // Map over the local default data, merging with incoming `purposeData`
            const updatedPurposeData = defaultPurposeData.map(localPurpose => {
                // Find matching purpose in `purposeData`
                const matchingPurpose = purposeData.find(p => p.purposeType === localPurpose.purposeType);
                return {
                    ...localPurpose,
                    amountData: matchingPurpose ? matchingPurpose.amountData : localPurpose.amountData
                };
            });
            setPurposeDataLocal(updatedPurposeData);
        }
    }, [purposeData]);

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
            <div className="button-container w-full flex items-center gap-5 ">
                <details ref={dropdownRef} className="dropdown">
                    <summary className="btn bg-primary text-accent">
                        <span><ListFilter /></span>Filter : {selectedFilterMajorName}
                    </summary>
                    <ul className="menu dropdown-content bg-primary shadow-xl rounded-box z-[1] w-52 p-2 text-accent">
                        {majorForFilter.map((major) => (
                            <li key={major}>
                                <a onClick={() => handleSelection(major)}>{major}</a>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
            <div className="card-purpose-container w-full h-fit grid grid-cols-2 gap-5 items-end">
                {pureposeDataLocal.map((data, index) => (
                    <CardPurposeData
                        key={index}
                        amountData={data.amountData}
                        cardType={data.purposeType}
                    />
                ))}
            </div>
        </div>
    );
}

export default EntryPurposeCard;
