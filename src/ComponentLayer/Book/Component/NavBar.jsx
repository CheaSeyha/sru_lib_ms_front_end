import React,{useState} from 'react'
import ListOfAllBook from './ListOfAllBook';
import ListOfBorrow from '../Borrow/ListOfBorrow'
const NavBarBook = () => {

    const [activeComponent, setActiveComponent] = useState('Books');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Books':
        return <ListOfAllBook />;
      case 'Borrow':
        return <ListOfBorrow />;
      default:
        return <ListOfAllBook />;
    }
  };
  return (
    <>
    <nav className=" rounded-[20px] bg-secondary p-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-0 flex flex-col">
        <button
              className={`px-3 py-2 rounded-[20px] ${activeComponent === 'Books' ? 'bg-base-100' : 'bg-secondary hover:bg-base-100'}`}
              onClick={() => setActiveComponent('Books')}
            >Books</button>
          <button
            className={`px-3 py-2 rounded-[20px] ${activeComponent === 'Borrow' ? 'bg-base-100' : 'bg-secondary hover:bg-base-100'} text-accent`}
            onClick={() => setActiveComponent('Borrow')}
          >Borrowed</button>
        </div>
      </div>
    </nav>
      <div className='table-container border-solid border-l-2 border-base-100 table-borrow-book h-full w-full bg-secondary text-accent rounded-[20px] p-5'>
      {renderComponent()}
      </div>
    </>
  );
}


export default NavBarBook