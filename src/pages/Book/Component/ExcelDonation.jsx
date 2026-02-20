import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import axios from "../../../api/axios";
import { toast } from 'react-hot-toast'; // Ensure you have react-hot-toast installed
import BtnGredient from '../BtnGredient';
import excel from '../../../assets/image/excel.svg';
const ExcelDonation = ({fetchDonation}) => {
    const fileInputRef = useRef(null); // Reference for file input
    const [FileName,setFileName]=useState([]);
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const file = event.target.files[0];
    setFileName(file.name);
    // Read the file as binary string
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
    
        // Assuming the first sheet is the one you want
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
    
        // Convert sheet to JSON with cellDates option
        const jsonData = XLSX.utils.sheet_to_json(sheet, {cellDates: true, // Parse dates as Date objects
            dateNF: 'yyyy-mm-dd' });
        const formattedData = jsonData.map((entry) => {
        if (typeof entry.donateDate === 'number') {
            const excelDate = new Date((entry.donateDate - 25569) * 86400 * 1000);
            entry.donateDate = excelDate.toISOString().split('T')[0]; // Convert to 'yyyy-mm-dd'
        }
        return entry;
    });
        axios.post('/donation', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        toast.success('Data submitted successfully!');
        fetchDonation();
      })
      .catch(error => {
        toast.error('There was an error submitting the data.');
        console.error(error);
        console.log(formattedData);
      });
    };
    reader.readAsBinaryString(selectedFile);
  };

  // Handle file input button click
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input dialog
  };


  return (
    <div>
      <BtnGredient onClick={handleButtonClick} className="rounded-" color={'from-[#ffffff] to-[#12be2c]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
                <img src={excel} alt="excel" width={24} height={24} />
                <input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }} // Hide the file input
        ref={fileInputRef}
        onChange={handleFileChange}
      />
                <p className='font-noto font-semibold'>បញ្ចូលឯកសារ Excel</p>
              </BtnGredient>
    </div>
  );
};
export default ExcelDonation