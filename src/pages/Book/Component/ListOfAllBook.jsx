import React, { useEffect, useMemo, useState } from "react";
import BtnGredient from "../BtnGredient";
import ModalAdd from "./ModalAdd.jsx";
import axios from "../../../api/axios";
import ModalLst from "./ModalLst";
import { RotateCcw, Trash2, Pencil, CircleFadingPlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import ModalUpdateBook from "./ModalUpdateBook.jsx";

export default function ListOfAllBook() {
  // Data
  const [colleges, setColleges] = useState([]); //  renamed for clarity
  const [languages, setLanguages] = useState([]); //  renamed for clarity
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState([]);

  // UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLstVisible, setIsModalLstVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isRightMousePressed, setIsRightMousePressed] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  // Fetch colleges
  const getCollegeList = async () => {
    try {
      const res = await axios.get("/college");
      //  make sure it is an array
      setColleges(Array.isArray(res.data) ? res.data : (res.data?.data ?? []));
    } catch (err) {
      console.log(err);
      setColleges([]);
    }
  };

  // Fetch languages
  const getLanguageList = async () => {
    try {
      const res = await axios.get("/language");
      setLanguages(Array.isArray(res.data) ? res.data : (res.data?.data ?? []));
    } catch (err) {
      console.log(err);
      setLanguages([]);
    }
  };

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("/book/current-book");
      const data = Array.isArray(res.data) ? res.data : [];
      const filtered = data.filter((b) => b.isActive === true);

      setBooks(filtered);

      const uniqueGenres = [...new Set(data.map((b) => b.genre))];
      setGenre(uniqueGenres);
    } catch (err) {
      console.error("There was an error fetching the books!", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    getLanguageList();
    getCollegeList();
  }, []);

  //  fast lookups
  const collegeMap = useMemo(() => {
    return Object.fromEntries(
      (colleges || []).map((c) => [c.collegeId, c.collegeName]),
    );
  }, [colleges]);

  const languageMap = useMemo(() => {
    return Object.fromEntries(
      (languages || []).map((l) => [l.languageId, l.languageName]),
    );
  }, [languages]);

  // Row selection
  const toggleRowSelection = (entry) => {
    setSelectedRows((prev) => {
      const isSelected = prev.some((row) => row.bookId === entry.bookId);
      return isSelected
        ? prev.filter((row) => row.bookId !== entry.bookId)
        : [...prev, entry];
    });
  };

  const handleMouseDown = (entry, event) => {
    if (event.button === 2) {
      setIsRightMousePressed(true);
      toggleRowSelection(entry);
    }
  };

  const handleMouseOver = (entry) => {
    if (isRightMousePressed) toggleRowSelection(entry);
  };

  const handleMouseUp = () => setIsRightMousePressed(false);

  //  IMPORTANT FIX: don’t reset/fetch while opening modal
  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalLstVisible(true);
    setSelectedRows([]); // optional: clear multi select when opening detail
  };

  //  Close modal -> refresh if you want
  const closeModal = () => {
    setIsModalLstVisible(false);
    setSelectedEntry(null);
    fetchBooks(); // refresh after closing (safe)
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsModalUpdateVisible(false);
  };

  const resetSelection = () => {
    setSelectedGenre("");
    setSearchTerm("");
    setSelectedRows([]);
    fetchBooks();
  };

  const filteredBooks = books.filter(
    (book) =>
      (book.bookTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.bookId
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (selectedGenre === "" || book.genre === selectedGenre),
  );

  const handledelete = () => {
    selectedRows.forEach((row) => {
      axios
        .put("/book/trash", null, { params: { bookId: row.bookId } })
        .then(() => {
          toast.success("បានផ្លាស់ទីទៅក្នុង Trash ដោយជោគជ័យ!!!", {
            style: { fontFamily: "NotoSansKhmer-Regular, sans-serif" },
          });
          setSelectedRows([]);
          fetchBooks();
        })
        .catch((error) => {
          toast.error("There was an error with the return request.");
          console.error(error);
        });
    });
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col w-full h-full space-y-5 scrollbar-hide">
        <div className="w-full flex flex-col-reverse xl:flex-row sm:flex-col-reverse m-0">
          <div className="flex md:flex-row flex-col gap-2 w-full">
            <div className="flex md:flex-row flex-col gap-2 max-w-[500px]">
              {/* Search */}
              <label className="input input-bordered font-noto rounded-[50px] w-full lg:w-[750px] flex items-center bg-base-100 p-2 h-full gap-2">
                <input
                  type="text"
                  placeholder="ស្វែងរកតាមលេខសម្គាល់​ ឬចំណងជើង"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

              {/* Filter */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="p-2 border rounded-[50px] font-noto input-bordered bg-base-100 h-full w-full md:w-fit"
              >
                <option value="" disabled>
                  ជ្រើសរើសប្រភេទ
                </option>
                {genre.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <BtnGredient
              onClick={resetSelection}
              color={"from-[#00D1FF] to-[#E7FBFF]"}
              hover={"hover:from-[#00D9FF] hover:to-[#E7FBFF]"}
            >
              <RotateCcw />
            </BtnGredient>

            <BtnGredient
              className="flex items-center justify-center"
              onClick={() => setIsModalVisible(true)}
              color={"from-[#00D1FF] to-[#E7FBFF]"}
              hover={"hover:from-[#00D9FF] hover:to-[#a5cef3]"}
            >
              <CircleFadingPlus />
              <p className="font-noto">បញ្ចូល</p>
            </BtnGredient>

            {selectedRows.length > 0 && (
              <>
                <BtnGredient
                  onClick={handledelete}
                  color={"from-[#ff0000] to-[#E7FBFF]"}
                  hover={"hover:from-[#E7FBFF] hover:to-[#ff0000]"}
                >
                  <Trash2 />
                  <p className="font-noto">លុប</p>
                </BtnGredient>

                {selectedRows.length <= 1 && (
                  <BtnGredient
                    className="pr-5"
                    onClick={() => setIsModalUpdateVisible(true)}
                    color={"from-[#1aff00] to-[#E7FBFF]"}
                    hover={"hover:from-[#E7FBFF] hover:to-[#1aff00]"}
                  >
                    <Pencil />
                    <p className="font-noto">កែសម្រួល</p>
                  </BtnGredient>
                )}
              </>
            )}
          </div>
        </div>

        <div className="variable-book overflow-y-auto flex-1 w-full grid items-start scrollbar-hide">
          <table
            className="table tectav min-w-full divide-y divide-gray-200"
            onContextMenu={(e) => e.preventDefault()}
            onMouseUp={handleMouseUp}
          >
            <thead className="text-accent font-noto">
              <tr>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ល.រ
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  លេខសម្គាល់
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
                  ភាសា
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ឆ្នាំបោះពុម្ព
                </th>
                <th className="sticky top-0 text-left text-sm bg-secondary">
                  ចំនួន
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((entry, index) => (
                <tr
                  key={entry.bookId ?? index} //  better key than index
                  onClick={() => handleRowClick(entry)}
                  onMouseDown={(e) => handleMouseDown(entry, e)}
                  onMouseOver={() => handleMouseOver(entry)}
                  className={`hover:bg-primary cursor-pointer font-noto active:bg-primary ${
                    selectedRows.some((row) => row.bookId === entry.bookId)
                      ? "bg-primary"
                      : ""
                  }`}
                >
                  <th>{index + 1}</th>
                  <td>{entry.bookId}</td>
                  <td>{entry.bookTitle}</td>
                  <td>{collegeMap[entry.collegeId] || "N/A"}</td>
                  <td>{entry.author ?? "N/A"}</td>
                  <td>{entry.genre}</td>
                  <td>{languageMap[entry.languageId] || "N/A"}</td>
                  <td>{entry.publicationYear ?? "N/A"}</td>
                  <td>{entry.bookQuan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*  IMPORTANT: ModalLst must be safe inside */}
      <ModalLst
        entry={selectedEntry}
        closeModal={closeModal}
        isModalVisible={isModalLstVisible}
        fetchBooks={fetchBooks}
      />

      <ModalAdd
        bookLangueId={languages}
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        fetchBooks={fetchBooks}
      />

      <ModalUpdateBook
        bookLangueId={languages}
        isModalVisible={isModalUpdateVisible}
        handleCloseModal={handleCloseModal}
        fetchBooks={fetchBooks}
        rowSelected={selectedRows}
        setRowSelected={setSelectedRows}
      />
    </>
  );
}
