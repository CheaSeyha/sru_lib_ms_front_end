import React, {useState} from 'react';
import BackupCertificate from './BackupCertificate';
import BackupBook from './BackupBook';
import BackupBorrow from './BackupBorrow';

function Navbar() {
  const [activeComponent, setActiveComponent] = useState('Certificate');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Certificate':
        return <BackupCertificate />;
      case 'Book':
        return <BackupBook />;
      case 'Borrow':
        return <BackupBorrow />;
      default:
        return <BackupCertificate />;
    }
  };
  return (
    <>
    <div className="table-container flex lg:h-full md:h-[700px] sm:h-[700px] bg-secondary text-accent rounded-[20px] scrollbar-hide">
    <nav className=" rounded-[20px] bg-secondary pr-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-0 flex flex-col">
        <button
              className={`px-3 py-2 rounded-[20px] ${activeComponent === 'Certificate' ? 'bg-base-100' : 'bg-secondary hover:bg-base-100'}`}
              onClick={() => setActiveComponent('Certificate')}
            >Certificate</button>
          <button
            className={`px-3 py-2 rounded-[20px] ${activeComponent === 'Book' ? 'bg-base-100' : 'bg-secondary hover:bg-base-100'} text-accent`}
            onClick={() => setActiveComponent('Book')}
          >Book</button>
          <button
            className={`px-3 py-2 rounded-[20px] ${activeComponent === 'Borrow' ? 'bg-base-100' : 'bg-secondary hover:bg-base-100'} text-accent`}
            onClick={() => setActiveComponent('Borrow')}
          >Borrow</button>
        </div>
      </div>
    </nav>
    
    <div className='table-container border-solid border-l-2 border-base-100 table-borrow-book h-full w-full bg-secondary text-accent pl-5'>
      {renderComponent()}
      </div>
      </div>
    </>
  );
}

export default Navbar;
