import React,{useEffect,useState} from 'react';
import ModalBorrow from './ModalBorrow';
import DatePicker from "react-datepicker";
import BtnGredient from '../BtnGredient';
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../../api/axios';
import { parse, format,isEqual } from 'date-fns';
import AlertWithSound from './Alert';
const ListOfBorrow = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [latestBorrowId, setLatestBorrowId] = useState([]);
  useEffect(() => {
    fetchBorrow();    
}, []);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if(isChecked){
      fetchBorrow();
    }else{fetchOver();}
  };
  console.log(isChecked);
  const [borrow, setborrow] = useState([]);
  const fetchOver = () => {
    axios.get('/borrow/over-due')
    .then(response => {
      const filteredBooks = response.data.filter(borrow => borrow.isBringBack === false);
      setborrow(filteredBooks);
      if (filteredBooks.length > latestBorrowId.length) {
        setLatestBorrowId(filteredBooks);
      }
    })
    .catch(error => {
      console.error("There was an error fetching the borrow!", error);
    });
  };
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
    if(!isChecked){
      fetchBorrow();
    }else{fetchOver();}
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
    <div className="flex flex-col w-full h-full space-y-5 font-noto">
      <div className="w-full flex flex-col-reverse xl:flex-row sm:flex-col-reverse m-0">
      <div className="flex w-full">
      <div className="inline-block h-full pr-5 w-full">
            <label htmlFor="" className="input input-bordered rounded-[50px] w-full md:w-full flex items-center bg-base-100 p-2 h-full gap-2">
            <input
              type="text"
              placeholder="ស្វែងរកតាមអត្តលេខនិស្សិត ឬលេខសម្គាល់សៀវភៅ"
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
      <div className="inline-block">
      <DatePicker
                        selected={searchDate}
                        onChange={date => setSearchDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="ជ្រើសរើសថ្ងៃសង"
                        className="input input-bordered rounded-[50px] w-full bg-primary"
                    />
        </div>
        </div>
        <div className="flex w-full pb-5 sm:pb-5 xl:pb-0">
        <div className="inline-block w-4/5">
          <BtnGredient onClick={handlerefresh} className="rounded-" color={'from-[#00D1FF] to-[#E7FBFF]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
          <p>ធ្វើឡើងវិញ</p>
          </BtnGredient>
        </div>
        <div className="inline-block">
        <div className='flex items-center justify-center h-full text-[20px]'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='form-checkbox mr-2 w-[25px] h-[25px] text-secondary'
        />
         បានផុតកំណត់
      </div>
        </div>
        </div>
        </div>
      <div className="table-container overflow-y-auto flex-1 w-full grid items-start scrollbar-hide">
        <table className="table tectav min-w-full divide-y divide-gray-200">
          <thead className='text-accent'>
              <tr>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">ល.រ</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">អត្តលេខនិស្សិត</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">លេខសម្គាល់</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">ចំនួនខ្ចី</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">កាលបរិច្ឆេទខ្ចី</th>
                <th className="sticky top-0 text-left text-sm font-semibold bg-secondary">កាលបរិច្ឆេទត្រូវសង</th>
              </tr>
          </thead>
          <tbody>
          {filteredData.map((entry, index) => (
                            <tr key={entry.borrowId} onClick={() => handleRowClick(entry)} className="hover:bg-primary cursor-pointer active:bg-primary">
                                <td>{index + 1}</td>
                                <td>{entry.studentId}</td>
                                <td>{entry.bookId}</td>
                                <td>{entry.bookQuan}</td>
                                <td>{entry.borrowDate}</td>
                                <td>{entry.giveBackDate}</td>
                            </tr>
                        ))}
          </tbody>
        </table>
      </div>
      {/* MUI Alert */}
      {/* <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="warning">
          Student id {latestBorrowId.studentId} have not return!
        </Alert>
      </Snackbar> */}
      <AlertWithSound newData={latestBorrowId.length > 0 && latestBorrowId[latestBorrowId.length - 1]} />
    </div>
    <ModalBorrow entry={selectedEntry} closeModal={closeModal} isModalVisible={isModalLstVisible} setIsModalLstVisible={setIsModalLstVisible} fetchBorrow={fetchBorrow}/>
    </>
  );
};

export default ListOfBorrow;
