import React, { useState, useRef } from 'react';
import BtnGredient from '../../Book/BtnGredient';
import Certificate from './Certificate';

const ListCertificate = () => {
  const ScoreData = [
    {
      "ID": 1001,
      "StuId": "200101",
      "StuName": "Student_1",
      "Dept": "Computer Science",
      "TotalHour": 66
    },
    {
      "ID": 1002,
      "StuId": "200102",
      "StuName": "Student_2",
      "Dept": "Computer Science",
      "TotalHour": 87
    },
    {
      "ID": 1003,
      "StuId": "200103",
      "StuName": "Student_3",
      "Dept": "Computer Science",
      "TotalHour": 76
    },
    {
      "ID": 1004,
      "StuId": "200104",
      "StuName": "Chhorn Chanraksmey",
      "Dept": "Computer Science",
      "TotalHour": 65
    },
    {
      "ID": 1001,
      "StuId": "200101",
      "StuName": "Student_1",
      "Dept": "Computer Science",
      "TotalHour": 66
    },
    {
      "ID": 1002,
      "StuId": "200102",
      "StuName": "Student_2",
      "Dept": "Computer Science",
      "TotalHour": 87
    },
    {
      "ID": 1003,
      "StuId": "200103",
      "StuName": "Student_3",
      "Dept": "Computer Science",
      "TotalHour": 76
    },
    {
      "ID": 1004,
      "StuId": "200104",
      "StuName": "Chhorn Chanraksmey",
      "Dept": "Computer Science",
      "TotalHour": 65
    },
    {
      "ID": 1001,
      "StuId": "200101",
      "StuName": "Student_1",
      "Dept": "Computer Science",
      "TotalHour": 66
    },
    {
      "ID": 1002,
      "StuId": "200102",
      "StuName": "Student_2",
      "Dept": "Computer Science",
      "TotalHour": 87
    },
    {
      "ID": 1003,
      "StuId": "200103",
      "StuName": "Student_3",
      "Dept": "Computer Science",
      "TotalHour": 76
    },
    {
      "ID": 1004,
      "StuId": "200104",
      "StuName": "Chhorn Chanraksmey",
      "Dept": "Computer Science",
      "TotalHour": 65
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const handleSortToggle1 = () => {
    setSortOrder(sortOrder === "asc1" ? "desc1" : "asc1");
  };
  const sortedData = [...ScoreData].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.TotalHour - b.TotalHour;
    } 
    else if(sortOrder==="asc1"){
      return a.ID - b.ID;
    }
    else if(sortOrder==="desc1"){
      return b.ID - a.ID;
    }
    else {
      return b.TotalHour - a.TotalHour;
    }
  });

  const filteredData = sortedData.filter(item => 
    item.StuId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.StuName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col w-full h-full space-y-5">
        <div className="text-table w-full h-[45px] flex justify-between">
          <p>List of Certicate</p>
        </div>
        <div className="w-full m-0">
          <div className="inline-block w-1/2 pl-5">
            <input
              type="text"
              placeholder="Student ID or Student Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 w-full border rounded text-black"
            />
          </div>
        </div>
        <div className="table-container overflow-y-auto flex-1 w-full grid items-start">
          <table className="table tectav min-w-full divide-y divide-gray-200">
            <thead className='text-accent items-center'>
              <tr>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">NO</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">ID</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Student ID</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Student Name</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Department</th>
                <th className="sticky top-0 text-center text-xs font-medium bg-secondary">
                  <button onClick={handleSortToggle}>Total Hour {sortOrder === "asc" ? "▲" : "▼"}</button>
                </th>
                <th className="sticky top-0 text-center text-xs font-medium bg-secondary">
                <button onClick={handleSortToggle1}>Total borrow {sortOrder === "asc1" ? "▲" : "▼"}</button>
                </th>
                <th className="sticky top-0 text-center text-xs font-medium bg-secondary"></th>

              </tr>
            </thead>
            <tbody>
              {filteredData.map((certificate, index) => (
                <tr key={index} className='hover:bg-primary cursor-pointer active:bg-primary'>
                  <th>{index + 1}</th>
                  <td>{certificate.ID}</td>
                  <td>{certificate.StuId}</td>
                  <td>{certificate.StuName}</td>
                  <td>{certificate.Dept}</td>
                  <td className='text-center'>{certificate.TotalHour}</td>
                  <td className='text-center'>{certificate.TotalHour}</td>
                  <td className='text-center'>  
                    <Certificate certificate={certificate}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListCertificate;
