import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import axios from '../../../api/axios';
import { toast } from 'react-hot-toast'; // Ensure you have react-hot-toast installed
import BtnGredient from '../../Book/BtnGredient';
import excel from '../../../assets/image/excel.svg';
function ExcelStudent({fetchStudent}) {
  const fileInputRef = useRef(null); // Reference for file input
  const [uploading, setUploading] = useState(false);
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const file = event.target.files[0];
    // Read the file as binary string
    const reader = new FileReader();
    reader.onload = async (event) => {
        try{
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      // Assuming the first sheet is the one you want
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet,{cellDates: true, // Parse dates as Date objects
        dateNF: 'yyyy-mm-dd' });
      const formattedData = jsonData.map((entry) => {
        if (typeof entry.dateOfBirth=== 'number') {
            const excelDate = new Date((entry.dateOfBirth- 25569) * 86400 * 1000);
            entry.dateOfBirth= excelDate.toISOString().split('T')[0]; // Convert to 'yyyy-mm-dd'
        }
        return entry;
    });
    setUploading(true);
    // Loop through the JSON data
    for (let i = 0; i < formattedData.length; i++) {
        const entry =formattedData[i];
        try {
          await postDataToAPI(entry);
          console.log(`Posted ${i + 1} of ${formattedData.length} successfully`);
        } catch (error) {
          console.error(`Error on row ${i + 1}:`, error);
          toast.error(`Error on row ${i + 1}. Stopping the loop.`);
          throw new Error("Stopping due to error"); // Throw error to stop the loop
        }
      }
      setUploading(false);
      toast.success("All data posted successfully!");
      fetchStudent();
    } catch (error) {
      setUploading(false);
      console.error('Error reading file or posting:', error);
    }
    // formattedData.forEach(async (entry) => {
    //     try {
    //         // Assuming your API endpoint is '/api/student'
    //         await axios.post('/student', entry);
    //         toast.success('បានបញ្ចូលសិស្សដោយជោគជ័យ!!!');
    //         console.log(entry);
    //         await postDataToAPI(entry);
    //     } catch (error) {
    //         toast.error(`បញ្ចូលសិស្សមិនបានសម្រេច សូមពិនិត្យstudentId=${entry.studentId}ឡើងវិញ!!!`);
            
    //     }
    //     fetchStudent();
    // });


    //   axios.post('/book', jsonData, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then(response => {
    //     toast.success('Data submitted successfully!');
    //     fetchStudent();
    //   })
    //   .catch(error => {
    //     toast.error('There was an error submitting the data.');
    //     console.error(error);
    //   });
    };
    reader.readAsArrayBuffer(selectedFile)
  };
  // Function to post data to the API
  const postDataToAPI = async (data) => {
    const apiUrl = '/student'; // Replace with your API endpoint
    try {
      const response = await axios.post(apiUrl, data);
      return response;
    } catch (error) {
      throw error; // Throw error to be caught in the loop
    }
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
              {uploading && <div>Uploading data... Please wait</div>}
    </div>
  );
};
export default ExcelStudent;
