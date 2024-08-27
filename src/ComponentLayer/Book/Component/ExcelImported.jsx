import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import axios from "../../../api/axios";
import { toast } from 'react-hot-toast'; // Ensure you have react-hot-toast installed
import BtnGredient from '../BtnGredient';
import excel from '../../../assets/image/excel.svg';
function ExcelImported({fetchBooks}) {
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

      // Convert sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      axios.post('/book', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        toast.success('Data submitted successfully!');
        fetchBooks();
      })
      .catch(error => {
        toast.error('There was an error submitting the data.');
        console.error(error);
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
      <BtnGredient onClick={handleButtonClick} className="rounded-" color={'from-[#ffffff] to-[#0b701a]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
                <img src={excel} alt="excel" width={24} height={24} />
                <input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }} // Hide the file input
        ref={fileInputRef}
        onChange={handleFileChange}
      />
                <p>Import form Excel</p>
              </BtnGredient>
    </div>
  );
}scrollbars
export default ExcelImported;
