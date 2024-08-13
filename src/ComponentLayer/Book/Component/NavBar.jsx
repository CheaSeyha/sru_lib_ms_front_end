import React,{useState} from 'react'
import ListOfAllBook from './ListOfAllBook';
import ListOfBorrow from '../Borrow/ListOfBorrow'
import { useLocation } from 'react-router-dom';
const NavBarBook = () => {
    const location = useLocation();
    const path = location.pathname;
  const renderComponent = () => {
    switch (path) {
      case "/BookManagement/AddBook":
        return <ListOfAllBook />;
      case "/BookManagement/BookBorrowed":
        return <ListOfBorrow />;
      default:
        return <ListOfAllBook />;
    }
  };
  return (
    <>
      <div className='table-container table-borrow-book h-full w-full bg-secondary text-accent rounded-[20px] p-5'>
      {renderComponent()}
      </div>
    </>
  );
}


export default NavBarBook