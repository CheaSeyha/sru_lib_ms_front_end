import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import toast, { Toaster } from "react-hot-toast";
export default function BackupBook() {
  const [BackupBook, setbackupBook] = useState([]);
  //Select Row
  const [selectedRows, setSelectedRows] = useState([]);
  const [isRightMousePressed, setIsRightMousePressed] = useState(false);

  const handleMouseDown = (entry, event) => {
    if (event.button === 2) {
      setIsRightMousePressed(true);
      toggleRowSelection(entry);
    }
  };

  const handleMouseOver = (entry) => {
    if (isRightMousePressed) {
      toggleRowSelection(entry);
    }
  };

  const handleMouseUp = () => {
    setIsRightMousePressed(false);
  };

  const toggleRowSelection = (entry) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.some(
        (row) => row.bookId === entry.bookId,
      );
      if (isSelected) {
        return prevSelectedRows.filter((row) => row.bookId !== entry.bookId);
      } else {
        return [...prevSelectedRows, entry];
      }
    });
  };
  //Select row
  const fetchBackUpBook = () => {
    axios
      .get("book/in-trash")
      .then((response) => {
        setbackupBook(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the Book!", error);
      });
  };
  useEffect(() => {
    fetchBackUpBook();
  }, []);
  const handleClick = (bookId) => {
    axios
      .put("/book/recover", null, {
        params: {
          bookId: bookId,
        },
      })
      .then((response) => {
        toast.success("BackUp request successful!"); // Show success toast
        fetchBackUpBook(); // Call the fetchBorrow function after a successful request
      });
  };
  const handleReset = () => {
    setSelectedRows([]);
  };
  const handleClickSelect = () => {
    selectedRows.forEach((row) => {
      handleClick(row.bookId);
    });
  };
  return (
    <>
      <div className="flex flex-col w-full h-full space-y-5 scrollbar-hide">
        <div className="variable-book  overflow-y-auto flex-1 w-full grid items-start">
          <table
            className="table tectav font-noto min-w-full divide-y divide-gray-200"
            onContextMenu={(e) => e.preventDefault()}
            onMouseUp={handleMouseUp}
          >
            {/* head */}
            <thead className="text-accent">
              <tr>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  ល.រ
                </th>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  លេខសម្គាល់
                </th>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  ចំណងជើង
                </th>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  មហាវិទ្យាល័យ
                </th>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  អ្នកនិពន្ធ
                </th>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  ប្រភេទ
                </th>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  ឆ្នាំបោះពុម្ព
                </th>
                <th className="sticky top-0 text-left text-sm font-bold bg-secondary">
                  {selectedRows.length > 1 && (
                    <button
                      onClick={handleClickSelect}
                      className="bg-[#17eddf] 0 hover:bg-neutral text-accent font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <span>ស្ដារធាតុជ្រើសរើស</span>
                    </button>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {BackupBook.map((entry, index) => (
                <tr
                  key={index}
                  onClick={handleReset}
                  onMouseDown={(e) => handleMouseDown(entry, e)}
                  onMouseOver={() => handleMouseOver(entry)}
                  className={`hover:bg-primary cursor-pointer active:bg-primary ${selectedRows.some((row) => row.bookId === entry.bookId) ? "bg-primary" : ""}`}
                >
                  <th>{index + 1} </th>
                  <td>{entry.bookId}</td>
                  <td>{entry.bookTitle}</td>
                  <td>{entry.collegeId}</td>
                  <td>{entry.author ?? "N/A"}</td>
                  <td>{entry.genre}</td>
                  <td>{entry.publicationYear ?? "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleClick(entry.bookId)}
                      class="bg-base-100 hover:bg-neutral text-accent font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      <span>ស្ដារឡើងវិញ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </>
  );
}
