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
      <div className="w-full m-0">
        <div className="inline-block w-1/2 pl-5">
                <input
        type="text"
        placeholder="Student ID or Book ID"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 w-full border rounded text-black"
      />
      </div>
      <div className="inline-block pl-5 w-1/3">
      <DatePicker
                        selected={searchDate}
                        onChange={date => setSearchDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select return Date"
                        className="input input-bordered w-32 bg-primary"
                    />
        </div>
        <div className="inline-block w-1/6 pl-8">
          <BtnGredient className="rounded-" color={'from-primary to-[#00D9FF]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
          <img src={refresh}  width={24} height={24} alt="" />
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
