import React, { useState } from "react";
import ListOfAllBook from "./ListOfAllBook";
import ListDonation from "./ListDonation";
import ListOfBorrow from "../Borrow/ListOfBorrow";
import ListCertificate from "../../ScoreStudent/Component/ListCertificate";
import ListBackup from "../../Backup/Component/BackupBook";
import { useLocation } from "react-router-dom";
const NavBarBook = () => {
  const location = useLocation();
  const path = location.pathname;
  const renderComponent = () => {
    switch (path) {
      case "/book-management/add-book":
        return <ListOfAllBook />;
      case "/book-management/book-borrowed":
        return <ListOfBorrow />;
      case "/book-management/time-spent":
        return <ListCertificate />;
      case "/book-management/backup":
        return <ListBackup />;
      case "/book-management/donation":
        return <ListDonation />;
      default:
        return <ListOfAllBook />;
    }
  };
  return (
    <>
      <div className="table-container table-borrow-book h-full w-full bg-secondary text-accent rounded-[20px] p-5">
        {renderComponent()}
      </div>
    </>
  );
};

export default NavBarBook;
