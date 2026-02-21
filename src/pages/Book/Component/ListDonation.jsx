import React, { useEffect, useState } from "react";
import BtnGredient from "../BtnGredient";
import ModalAddDonation from "./ModalAddDonation";
import axios from "../../../api/axios";
import refresh from "../../../assets/logo/refresh.svg";
import { RotateCcw, CircleFadingPlus } from "lucide-react";
import CerAppreciation from "./CerAppreciation";
import { Toaster } from "react-hot-toast";
export default function ListDonation() {
  // Data of All Book
  const [books, setBooks] = useState([]);
  const [genre, setgenre] = useState([]);
  const fetchDonation = () => {
    axios
      .get("/donation")
      .then((response) => {
        setBooks(response.data);
        const uniqueBookTypes = [
          ...new Set(response.data.map((book) => book.genre)),
        ];
        setgenre(uniqueBookTypes);
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  };
  useEffect(() => {
    fetchDonation();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const resetSelection = () => {
    setSelectType("");
    setSearchTerm("");
  };

  const handleSelectType = (e) => {
    setSelectType(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      (book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.donatorName
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        book.bookId
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (selectedGenre === "" || book.genre === selectedGenre),
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col w-full h-full font-noto space-y-5 scrollbar-hide">
        <div className="w-full flex flex-col-reverse xl:flex-row sm:flex-col-reverse m-0">
          <div className="flex md:flex-row flex-col gap-2 w-full">
            <div className="flex md:flex-row flex-col gap-2 max-w-[500px]">
              {/* Search Innput  */}
              <label
                htmlFor=""
                className="input input-bordered font-noto rounded-[50px] w-full lg:w-[750px] flex items-center bg-base-100 p-2 h-full gap-2"
              >
                <input
                  type="text"
                  placeholder="ស្វែងរកតាមលេខសម្គាល់​ ឬចំណងជើង"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-8 w-8 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              {/* Filter Book type  */}
              <select
                value={selectedGenre}
                onChange={handleSelectType}
                className="p-2 border rounded-[50px] font-noto input-bordered bg-base-100 h-full w-full md:w-fit"
              >
                <option disabled className="refresh font-noto" value="">
                  ជ្រើសរើសប្រភេទ
                </option>
                {genre.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {/* Restart button  */}
            <BtnGredient
              className="w-fit h-fit"
              onClick={resetSelection}
              color={"from-[#00D1FF] to-[#E7FBFF]"}
              hover={"hover:from-[#00D9FF] hover:to-[#E7FBFF]"}
            >
              <RotateCcw />
            </BtnGredient>

            {/* Add button  */}
            <BtnGredient
              className="flex items-center justify-center"
              onClick={() => setIsModalVisible(true)}
              color={"from-[#00D1FF] to-[#E7FBFF]"}
              hover={"hover:from-[#00D9FF] hover:to-[#a5cef3]"}
            >
              <CircleFadingPlus />
              <p className="font-noto">បញ្ចូល</p>
            </BtnGredient>
            {/* show edit and delete button when select row  */}
          </div>
        </div>
        <div className="variable-book  overflow-y-auto flex-1 w-full grid items-start scrollbar-hide">
          <table className="table tectav min-w-full divide-y divide-gray-200">
            <thead className="text-accent">
              <tr>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ល.រ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  អ្នកឧបត្ថម្ភ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  លេខសៀវភៅ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ចំណងជើង
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  មហាវិទ្យាល័យ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  អ្នកនិពន្ធ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ប្រភេទ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ឆ្នាំបោះពុម្ព
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  កាលបរិច្ឆេទឧបត្ថម្ភ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ចំនួន
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((entry, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{entry.donatorName}</td>
                  <td>{entry.bookId}</td>
                  <td>{entry.bookTitle}</td>
                  <td>{entry.collegeName}</td>
                  <td>{entry.author ?? "N/A"}</td>
                  <td>{entry.genre}</td>
                  <td>{entry.publicationYear ?? "N/A"}</td>
                  <td>{entry.donateDate}</td>
                  <td>{entry.bookQuan}</td>
                  <td>
                    <CerAppreciation certificate={entry} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddDonation
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        fetchDonation={fetchDonation}
      />
    </>
  );
}
