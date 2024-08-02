import React,{useEffect,useState} from 'react';
import ModalBorrow from './ModalBorrow';
import DatePicker from "react-datepicker";
import BtnGredient from '../BtnGredient';
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../../api/axios';
import { parse, format,isEqual } from 'date-fns';
const ListOfBorrow = () => {
  const BorrowData = [
    ]
  ;
  const [borrow, setborrow] = useState([]);

  useEffect(() => {
    axios.get('/borrow')
      .then(response => {
        setborrow(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the borrow!", error);
      });
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
    (item.StuId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.BookId.toString().includes(searchTerm.toLowerCase())) &&
    (!searchDate || isEqual(parse(item.Expire, 'dd/MM/yyyy', new Date()), searchDate))
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
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Expire Date"
                        className="input input-bordered w-32 bg-primary"
                    />
        </div>
        <div className="inline-block w-1/6 pl-8">
          <BtnGredient className="rounded-" color={'from-primary to-[#00D9FF]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
          <svg fill="#ffffff" width="18px" height="18px" viewBox="0 0 1920.00 1920.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="rotate(0)" stroke-width="0.019200000000000002"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="30.72"></g><g id="SVGRepo_iconCarrier"> <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fill-rule="evenodd"></path> </g></svg>
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
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Expire</th>
              </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={index} onClick={()=> handleRowClick(entry)} className='hover:bg-primary cursor-pointer active:bg-primary'>
                <th>{index + 1}</th>
                <td>{entry.StuId}</td>
                <td>{entry.BookId}</td>
                <td>{entry.Date}</td>
                <td>{entry.Expire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <ModalBorrow entry={selectedEntry} closeModal={closeModal} isModalVisible={isModalLstVisible}/>
    </>
  );
};

export default ListOfBorrow;
