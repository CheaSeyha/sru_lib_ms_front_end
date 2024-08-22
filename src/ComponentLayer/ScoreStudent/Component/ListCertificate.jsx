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
    item.studentName.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Student ID</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Student Name</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Major</th>
                <th className="sticky top-0 text-center text-xs font-medium bg-secondary">
                  <button onClick={handleSortToggle}>Spent Time {sortOrder === "asc" ? "▲" : "▼"}</button>
                </th>
                <th className="sticky top-0 text-center text-xs font-medium bg-secondary"></th>

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
