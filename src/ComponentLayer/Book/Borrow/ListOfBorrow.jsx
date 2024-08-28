import React,{useEffect,useState} from 'react';
import ModalBorrow from './ModalBorrow';
import DatePicker from "react-datepicker";
import BtnGredient from '../BtnGredient';
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../../api/axios';
import { parse, format,isEqual } from 'date-fns';
import refresh from "../../../assets/logo/refresh.svg";
const ListOfBorrow = () => {
  const [borrow, setborrow] = useState([]);
  const fetchBorrow = () => {
    axios.get('/borrow')
      .then(response => {
        const filteredBooks = response.data.filter(book => book.isBringBack === false);
        setborrow(filteredBooks);
      })
      .catch(error => {
        console.error("There was an error fetching the borrow!", error);
      });
  };
  useEffect(() => {
    fetchBorrow();
  }, []);
  const [isModalLstVisible, setIsModalLstVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalLstVisible(true);
  };
  const handlerefresh = () => {
    setSearchTerm("");
    setSearchDate(null);
  };
  const closeModal = () => {
    setIsModalLstVisible(false);
    setSelectedEntry(null);
  };
  const filteredData = borrow.filter(item =>
    (item.studentId.toString().toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.bookId.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchDate === null || isEqual(parse(item.giveBackDate, 'yyyy-MM-dd', new Date()), searchDate))
);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="flex flex-row w-full m-0">
        {/* <div className="inline-block pr-5 w-2/5">
                <input
        type="text"
        placeholder="Student ID or Book ID"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 h-full w-full border input-bordered rounded-[50px] bg-primary"
      />
      </div> */}
      <div className="inline-block h-full pr-5 w-2/5">
            <label htmlFor="" className="input input-bordered rounded-[50px] w-full md:w-full flex items-center bg-base-100 p-2 h-full gap-2">
            <input
              type="text"
              placeholder="Student ID or Book ID"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-full"
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
      <div className="inline-block pr-5">
      <DatePicker
                        selected={searchDate}
                        onChange={date => setSearchDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select return Date"
                        className="input input-bordered rounded-[50px] w-full bg-primary"
                    />
        </div>
        <div className="inline-block">
          <BtnGredient onClick={handlerefresh} className="rounded-" color={'from-[#00D1FF] to-[#E7FBFF]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
          <p>Refresh</p>
          </BtnGredient>
        </div>
        </div>
      <div className="table-container overflow-y-auto flex-1 w-full grid items-start scrollbar-hide">
        <table className="table tectav min-w-full divide-y divide-gray-200">
          <thead className='text-accent'>
              <tr>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">NO</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Student ID</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Book ID</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Date</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Return Date</th>
              </tr>
          </thead>
          <tbody>
          {filteredData.map((entry, index) => (
                            <tr key={entry.borrowId} onClick={() => handleRowClick(entry)} className="hover:bg-primary cursor-pointer active:bg-primary">
                                <td>{index + 1}</td>
                                <td>{entry.studentId}</td>
                                <td>{entry.bookId}</td>
                                <td>{entry.borrowDate}</td>
                                <td>{entry.giveBackDate}</td>
                            </tr>
                        ))}
          </tbody>
        </table>
      </div>
    </div>
    <ModalBorrow entry={selectedEntry} closeModal={closeModal} isModalVisible={isModalLstVisible} fetchBorrow={fetchBorrow}/>
    </>
  );
};

export default ListOfBorrow;
