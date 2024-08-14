import React, { useState, useRef } from 'react';
import Certificate from '../../../ComponentLayer/ScoreStudent/Component/Certificate';
import BtnGredient from '../../Book/BtnGredient';

const BackupCertificate = () => {
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

  return (
    <>
      <div className="flex flex-col w-full h-full space-y-5">
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
                  <button>Total Hour</button>
                </th>
                <th className="sticky top-0 text-center text-xs font-medium bg-secondary">
                <button>Total borrow</button>
                </th>
                <th className="sticky top-0 text-center text-xs font-medium bg-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {ScoreData.map((certificate, index) => (
                <tr key={index} className='hover:bg-primary cursor-pointer active:bg-primary'>
                  <th>{index + 1}</th>
                  <td>{certificate.ID}</td>
                  <td>{certificate.StuId}</td>
                  <td>{certificate.StuName}</td>
                  <td>{certificate.Dept}</td>
                  <td className='text-center'>{certificate.TotalHour}</td>
                  <td className='text-center'>{certificate.TotalHour}</td>
                  <td className='text-center hover:bg-secondary'>  
                    <button className="bg-base-100 hover:bg-neutral text-accent font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className=" fill-accent p-0 w-4 h-4 mr-2" viewBox="0 0 36 36" version="1.1" 
                    preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" 
                      strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>backup-restore-line</title> 
                      <rect className="clr-i-outline clr-i-outline-path-1" x="6" y="22" width="24" height="2"></rect>
                      <rect className="clr-i-outline clr-i-outline-path-2" x="26" y="26" width="4" height="2"></rect>
                      <path className="clr-i-outline clr-i-outline-path-3" d="M13,9.92,17,6V19a1,1,0,1,0,2,0V6l4,3.95A1,1,0,1,0,24.38,8.5L18,2.16,11.61,8.5A1,1,0,0,0,13,9.92Z">
                        </path><path className="clr-i-outline clr-i-outline-path-4" d="M30.84,13.37A1.94,1.94,0,0,0,28.93,12H21v2h7.95C30,16.94,31.72,21.65,32,22.48V30H4V22.48C4.28,21.65,7.05,14,7.05,14H15V12H7.07a1.92,1.92,0,0,0-1.9,1.32C2,22,2,22.1,2,22.33V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V22.33C34,22.1,34,22,30.84,13.37Z"></path> <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> </g></svg>
                      <span>Restore</span>
                    </button>
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

export default BackupCertificate;
