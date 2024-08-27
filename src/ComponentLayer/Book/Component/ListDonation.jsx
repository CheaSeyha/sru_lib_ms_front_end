import React, { useEffect, useState } from "react";
import BtnGredient from "../BtnGredient";
import ModalAdd from "./ModalAdd";
import axios from "../../../api/axios";
import refresh from "../../../assets/logo/refresh.svg"
import CerAppreciation from "./CerAppreciation"
export default function ListDonation() {
  // Data of All Book
  const [books, setBooks] = useState([]);
  const [genre, setgenre] = useState([]);
  useEffect(() => {
    axios.get('/donation')
      .then(response => {
        setBooks(response.data);
        const uniqueBookTypes = [...new Set(response.data.map(book => book.genre))];
        setgenre(uniqueBookTypes);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <div className="text-table w-full h-[45px] flex justify-between">
          <BtnGredient onClick={() => setIsModalVisible(true)} color={'from-[#00D1FF] to-[#E7FBFF]'} 
          hover={'hover:from-[#00D9FF] hover:to-[#a5cef3]'}>
            <p>ADD</p>
          </BtnGredient>
        </div>
        <div className="w-full m-0">
          <div className="inline-block w-1/2 pl-5">
            <input
              type="text"
              placeholder="ID or Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 w-full border rounded text-black"
            />
          </div>
          <div className="inline-block pl-5 w-1/3">
          <select
  value={selectedGenre}
  onChange={handleSelectType}
  className="p-2 border border-gray-300 rounded text-black w-full"
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
          <div className="inline-block w-1/6 pl-8">
            <BtnGredient className="rounded-" onClick={resetSelection} color={'from-primary to-[#00D9FF]'} hover={'hover:from-[#00D9FF] hover:to-[#E7FBFF]'}>
              <img src={refresh}  width={24} height={24} alt="" />
            </BtnGredient>
          </div>
        </div>
        <div className="variable-book  overflow-y-auto flex-1 w-full grid items-start scrollbar-hide">
          <table className="table tectav min-w-full divide-y divide-gray-200">
            <thead className='text-accent'>
              <tr>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">NO</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Sponsor Name</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Book ID</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Title</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">College</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Author</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Genre</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Public Year</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Sponsor Date</th>
                <th className="sticky top-0 text-left text-xs font-bold bg-secondary">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((entry, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{entry.sponsorName}</td>
                  <td>{entry.bookId}</td>
                  <td>{entry.bookTitle}</td>
                  <td>{entry.collegeName}</td>
                  <td>{entry.author?? 'N/A'}</td>
                  <td>{entry.genre}</td>
                  <td>{entry.publicationYear?? 'N/A'}</td>
                  <td>{entry.sponsorDate}</td>
                  <td>{entry.bookQuan}</td>
                  <td>
                    <CerAppreciation certificate={entry}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAdd isModalVisible={isModalVisible} handleCloseModal={handleCloseModal} />
    </>
  );
}
