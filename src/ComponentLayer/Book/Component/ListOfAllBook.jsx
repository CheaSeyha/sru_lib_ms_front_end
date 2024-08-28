import React, { useEffect, useState } from "react";
import BtnGredient from "../BtnGredient";
import ModalAdd from "./ModalAdd.jsx";
import axios from "../../../api/axios";
import ModalLst from "./ModalLst";
import refresh from "../../../assets/logo/refresh.svg"
import toast from "react-hot-toast";
export default function ListOfAllBook() {
  // Data of All Book
  const [books, setBooks] = useState([]);
  const [genre, setgenre] = useState([]);
  const fetchBooks = () => {
    axios.get('/book/current-book')
      .then(response => {
        // Filter books where isActive is true
        const filteredBooks = response.data.filter(book => book.isActive === true);
        setBooks(filteredBooks);
        const uniqueBookTypes = [...new Set(response.data.map(book => book.genre))];
        setgenre(uniqueBookTypes);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLstVisible, setIsModalLstVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalLstVisible(true);
  };

  const closeModal = () => {
    setIsModalLstVisible(false);
    setSelectedEntry(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const resetSelection = () => {
    setSelectType('');
    setSearchTerm("");
  };

  const handleSelectType = (e) => {
    setSelectType(e.target.value);
  };

  const filteredBooks = books.filter(book =>
    (book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookId.toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedGenre === '' || book.genre === selectedGenre)
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full space-y-5 scrollbar-hide">
        <div className="w-full flex flex-row m-0">
          <div className="inline-block w-full h-full">
            <label htmlFor="" className="input input-bordered rounded-[50px] w-full md:w-full flex items-center bg-base-100 p-2 h-full gap-2">
            <input
              type="text"
              placeholder="ID or Title"
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
          <div className="inline-block w-3/5 h-full pl-5 pr-5">
            <select
              value={selectedGenre}
              onChange={handleSelectType}
              className="p-2 border rounded-[50px] input-bordered bg-base-100 h-full w-full"
            >
              <option disabled className="refresh" value="">
                Select Genre
              </option>
              {genre.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

          </div>
          <div className="inline-block w-4/5">
            <BtnGredient className="w-full h-full" onClick={resetSelection} color={'from-[#00D1FF] to-[#E7FBFF]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
            <p>Refresh</p>
            </BtnGredient>
          </div>
          <div className="inline-block">
          <BtnGredient onClick={() => setIsModalVisible(true)} color={'from-[#00D1FF] to-[#E7FBFF]'}
            hover={'hover:from-[#00D9FF] hover:to-[#a5cef3]'}>
            <p>ADD</p>
          </BtnGredient>
        </div>
        </div>
        <div className="variable-book  overflow-y-auto flex-1 w-full grid items-start scrollbar-hide">
          <table className="table tectav min-w-full divide-y divide-gray-200">
            <thead className='text-accent'>
              <tr>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">NO</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">ID</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Title</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">College</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Author</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Genre</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Public Year</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((entry, index) => (
                <tr key={index} onClick={() => handleRowClick(entry)} className='hover:bg-primary cursor-pointer active:bg-primary'>
                  <th>{index + 1}</th>
                  <td>{entry.bookId}</td>
                  <td>{entry.bookTitle}</td>
                  <td>{entry.collegeId}</td>
                  <td>{entry.author ?? 'N/A'}</td>
                  <td>{entry.genre}</td>
                  <td>{entry.publicationYear ?? 'N/A'}</td>
                  <td>{entry.bookQuan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalLst entry={selectedEntry} closeModal={closeModal} isModalVisible={isModalLstVisible} fetchBooks={fetchBooks} />
      <ModalAdd isModalVisible={isModalVisible} handleCloseModal={handleCloseModal} fetchBooks={fetchBooks} />
    </>
  );
}
