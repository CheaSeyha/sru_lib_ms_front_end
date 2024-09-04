import React, { useState} from 'react';
import { useEffect } from 'react';
import Certificate from './Certificate';
import axios from '../../../api/axios';
const ListCertificate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [timespent, settimespent] = useState([]);

  useEffect(() => {
    axios.get('/att/time-spent')
      .then(response => {
        settimespent(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the time-spent!", error);
      });
  }, []);
  function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const sortedData = [...timespent].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.totalTimeSpent - b.totalTimeSpent;
    } 
    else {
      return b.totalTimeSpent - a.totalTimeSpent;
    }
  });

  const filteredData = sortedData.filter(item => 
    item.studentId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentName.toString().toLowerCase().includes(searchTerm.toLowerCase())||
    item.major.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col w-full h-full space-y-5">
        <div className="w-full m-0">
          {/* <div className="inline-block w-1/2">
            <input
              type="text"
              placeholder="Student ID or Student Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-[50px] input-bordered bg-base-100 h-full w-full"
            />
          </div> */}
          <div className="inline-block h-full w-full xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-full">
            <label htmlFor="" className="input input-bordered rounded-[50px] w-full md:w-full flex items-center bg-base-100 p-2 h-full gap-2">
            <input
              type="text"
              placeholder="ស្វែងរកតាមអត្តលេខ ឈ្មោះ ឬជំនាញ"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-full font-noto"
            />
            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-8 w-8 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                            </label>
          </div>
        </div>
        <div className="table-container overflow-y-auto flex-1 w-full grid items-start">
          <table className="table tectav min-w-full font-noto divide-y divide-gray-200">
            <thead className='text-accent items-center'>
              <tr>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">ល.រ</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">អត្តលេខនិស្សិត</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">ឈ្មោះនិស្សិត</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">ជំនាញ</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">ជំនាន់</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">កម្រិត</th>
                <th className="sticky top-0 text-center text-sm font-semibold bg-secondary">
                  <button onClick={handleSortToggle}>ម៉ោងសរុប {sortOrder === "asc" ? "▲" : "▼"}</button>
                </th>
                <th className="sticky top-0 text-center text-sm font-semibold bg-secondary"></th>

              </tr>
            </thead>
            <tbody>
              {filteredData.map((certificate, index) => (
                <tr key={index} className='hover:bg-primary cursor-pointer active:bg-primary'>
                  <th>{index + 1}</th>
                  <td>{certificate.studentId}</td>
                  <td>{certificate.studentName}</td>
                  <td>{certificate.major}</td>
                  <td className='text-center'>{convertMinutesToHoursAndMinutes(certificate.totalTimeSpent)}</td>
                  <td className='text-center'>  
                    <Certificate certificate={certificate} timespent={convertMinutesToHoursAndMinutes(certificate.totalTimeSpent)}/>
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
