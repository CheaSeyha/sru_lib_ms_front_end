import React, { useState } from "react";
import { Undo2 } from "lucide-react";
import DateTimeCard from "./DateTimeCard";
import useTableData from "../../../hooks/useTableData";
import useKhmerTranslate from "../../../hooks/useKhmerTranslate";
import {
  verifyPasscode,
  getStoredPasscode,
  hasPasscode,
} from "../../../utils/passcodeUtils";
import toast from "react-hot-toast";

function TableStudentEntryData({ studentEntryData }) {
  const {
    handleBack,
    filter,
    setFilter,
    currentRecords,
    handlePageChange,
    currentPage,
    totalPages,
    pageButtons,
  } = useTableData(studentEntryData);

  const { translateValue } = useKhmerTranslate();
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [inputPasscode, setInputPasscode] = useState("");

  const handleProtectedBack = () => {
    if (hasPasscode()) {
      setShowPasscodeModal(true);
    } else {
      handleBack();
    }
  };

  const verifyAndBack = () => {
    const stored = getStoredPasscode();
    if (verifyPasscode(inputPasscode, stored)) {
      setShowPasscodeModal(false);
      setInputPasscode("");
      handleBack();
    } else {
      toast.error("Invalid Passcode!");
      setInputPasscode("");
    }
  };

  return (
    <div className="hidden sm:flex flex-col table-container w-full space-y-5 h-full bg-secondary rounded-[20px] p-5 text-accent overflow-auto relative">
      {/* Passcode Modal */}
      {showPasscodeModal && (
        <div className="absolute text-accent font-noto inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-[20px]">
          <div className="bg-secondary p-8 rounded-2xl border border-blue-500/30 shadow-2xl flex flex-col items-center gap-5 w-[320px]">
            <h3 className="text-2xl  font-bold">តម្រូវឱ្យមានលេខសម្ងាត់</h3>
            <p className="text-sm opacity-70">សូមបញ្ចូលលេខសម្ងាត់ ៤ ខ្ទង់</p>
            <input
              autoFocus
              type="password"
              maxLength={4}
              value={inputPasscode}
              onChange={(e) => setInputPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verifyAndBack()}
              className="input input-bordered bg-primary w-full text-center text-2xl tracking-[1rem] focus:border-blue-500"
              placeholder="****"
            />
            <div className="flex w-full gap-3">
              <button
                className="btn btn-outline text-accent flex-1 border-blue-400 hover:bg-blue-400/50"
                onClick={() => {
                  setShowPasscodeModal(false);
                  setInputPasscode("");
                }}
              >
                បោះបង់
              </button>
              <button
                className="btn bg-blue-500 text-accent flex-1"
                onClick={verifyAndBack}
              >
                បញ្ជាក់
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="header-text flex justify-between w-full h-[46px] font-noto">
        <p className="font-bold">ប្រវត្តិការចូលបណ្ណាល័យ</p>
        <div className="container-button-date-time-back flex space-x-3">
          {/* Filter Section */}
          <div className="filter-data flex gap-5 items-center">
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select select-info border-none font-noto"
            >
              <option value="all">បង្ហាញទាំងអស់</option>
              <option value="in">បង្ហាញតែចូល</option>
              <option value="out">បង្ហាញតែចេញ</option>
            </select>
          </div>
          {/* Show Date Time  */}
          <DateTimeCard />
          <button
            className="back-button px-5 rounded-[10px] border hover:border-blue-400 transition-colors ease-in-out duration-300 group"
            onClick={handleProtectedBack}
          >
            <Undo2 className="text-current group-hover:text-blue-400 transition-colors ease-in-out duration-300" />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-x-auto scrollbar-hide">
        <div className="min-h-full overflow-y-auto">
          <div className="relative">
            <table className="table min-w-full">
              <thead className="bg-secondary text-accent font-noto text-[16px] sticky top-0 z-10">
                <tr>
                  <th>#</th>
                  <th>អត្តលេខ</th>
                  <th>ឈ្មោះនិស្សិត</th>
                  <th>ជំនាញ</th>
                  <th>ម៉ោងចូល</th>
                  <th>ម៉ោងចេញ</th>
                  <th>គោលបំណង</th>
                  <th>ស្ថានភាព</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {currentRecords.map((e, index) => (
                  <tr key={index} className="hover:bg-primary">
                    <th>{(currentPage - 1) * 14 + index + 1}</th>
                    <td>{e.studentId}</td>
                    <td>{e.studentName}</td>
                    <td>{e.major}</td>
                    <td>{e.entryTimes}</td>
                    <td>
                      {e.exitingTimes === null ? "--:--:--" : e.exitingTimes}
                    </td>
                    <td className="font-noto">{translateValue(e.purpose)}</td>
                    <td className="text-white">
                      <span
                        className={`w-fit h-fit px-2 py-1 rounded-full font-noto ${e.exitingTimes === null ? "bg-blue-600" : "bg-red-600"}`}
                      >
                        {e.exitingTimes === null ? "បានចូល" : "បានចេញ"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="join self-end">
          <button
            className="join-item btn btn-sm text-accent"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {pageButtons.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`join-item btn btn-sm text-accent ${currentPage === pageNumber ? "btn-active" : ""}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="join-item btn btn-sm text-accent"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}

export default TableStudentEntryData;
