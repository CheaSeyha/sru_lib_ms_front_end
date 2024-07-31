import React,{useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format,isEqual } from 'date-fns';
const BackupBorrow = () => {
  const BorrowData = [
    { ID: 1001, StuId: '200131', BookId: '1000230291', Date: '10/09/2023', Expire: '25/09/2023' },
    { ID: 1002, StuId: '200132', BookId: '1000230292', Date: '11/09/2023', Expire: '26/09/2023' },
    { ID: 1003, StuId: '200133', BookId: '1000230293', Date: '12/09/2023', Expire: '27/09/2023' },
    { ID: 1004, StuId: '200134', BookId: '1000230294', Date: '13/09/2023', Expire: '28/09/2023' },
    { ID: 1005, StuId: '200135', BookId: '1000230295', Date: '14/09/2023', Expire: '29/09/2023' },
    { ID: 1006, StuId: '200136', BookId: '1000230296', Date: '15/09/2023', Expire: '30/09/2023' },
    { ID: 1007, StuId: '200137', BookId: '1000230297', Date: '16/09/2023', Expire: '01/10/2023' },
    { ID: 1008, StuId: '200138', BookId: '1000230298', Date: '17/09/2023', Expire: '02/10/2023' },
    { ID: 1009, StuId: '200139', BookId: '1000230299', Date: '18/09/2023', Expire: '03/10/2023' },
    { ID: 1010, StuId: '200140', BookId: '1000230300', Date: '19/09/2023', Expire: '04/10/2023' },
    { ID: 1011, StuId: '200141', BookId: '1000230301', Date: '20/09/2023', Expire: '05/10/2023' },
    { ID: 1012, StuId: '200142', BookId: '1000230302', Date: '21/09/2023', Expire: '06/10/2023' },
    { ID: 1013, StuId: '200143', BookId: '1000230303', Date: '22/09/2023', Expire: '07/10/2023' },
    { ID: 1014, StuId: '200144', BookId: '1000230304', Date: '23/09/2023', Expire: '08/10/2023' },
    { ID: 1015, StuId: '200145', BookId: '1000230305', Date: '24/09/2023', Expire: '09/10/2023' },
    { ID: 1016, StuId: '200146', BookId: '1000230306', Date: '25/09/2023', Expire: '10/10/2023' },
    { ID: 1017, StuId: '200147', BookId: '1000230307', Date: '26/09/2023', Expire: '11/10/2023' },
    { ID: 1018, StuId: '200148', BookId: '1000230308', Date: '27/09/2023', Expire: '12/10/2023' },
    { ID: 1019, StuId: '200149', BookId: '1000230309', Date: '28/09/2023', Expire: '13/10/2023' },
    { ID: 1020, StuId: '200150', BookId: '1000230310', Date: '29/09/2023', Expire: '14/10/2023' },
    { ID: 1021, StuId: '200151', BookId: '1000230311', Date: '30/09/2023', Expire: '15/10/2023' },
    { ID: 1022, StuId: '200152', BookId: '1000230312', Date: '01/10/2023', Expire: '16/10/2023' },
    { ID: 1023, StuId: '200153', BookId: '1000230313', Date: '02/10/2023', Expire: '17/10/2023' },
    { ID: 1024, StuId: '200154', BookId: '1000230314', Date: '03/10/2023', Expire: '18/10/2023' },
    { ID: 1025, StuId: '200155', BookId: '1000230315', Date: '04/10/2023', Expire: '19/10/2023' },
    { ID: 1026, StuId: '200156', BookId: '1000230316', Date: '05/10/2023', Expire: '20/10/2023' },
    { ID: 1027, StuId: '200157', BookId: '1000230317', Date: '06/10/2023', Expire: '21/10/2023' },
    { ID: 1028, StuId: '200158', BookId: '1000230318', Date: '07/10/2023', Expire: '22/10/2023' },
    { ID: 1029, StuId: '200159', BookId: '1000230319', Date: '08/10/2023', Expire: '23/10/2023' },
    { ID: 1030, StuId: '200160', BookId: '1000230320', Date: '09/10/2023', Expire: '24/10/2023' },
    { ID: 1031, StuId: '200161', BookId: '1000230321', Date: '10/10/2023', Expire: '25/10/2023' },
    { ID: 1032, StuId: '200162', BookId: '1000230322', Date: '11/10/2023', Expire: '26/10/2023' },
    { ID: 1033, StuId: '200163', BookId: '1000230323', Date: '12/10/2023', Expire: '27/10/2023' },
    { ID: 1034, StuId: '200164', BookId: '1000230324', Date: '13/10/2023', Expire: '28/10/2023' },
    { ID: 1035, StuId: '200165', BookId: '1000230325', Date: '14/10/2023', Expire: '29/10/2023' },
    { ID: 1036, StuId: '200166', BookId: '1000230326', Date: '15/10/2023', Expire: '30/10/2023' },
    { ID: 1037, StuId: '200167', BookId: '1000230327', Date: '16/10/2023', Expire: '31/10/2023' },
    { ID: 1038, StuId: '200168', BookId: '1000230328', Date: '17/10/2023', Expire: '01/11/2023' },
    { ID: 1039, StuId: '200169', BookId: '1000230329', Date: '18/10/2023', Expire: '02/11/2023' },
    { ID: 1040, StuId: '200170', BookId: '1000230330', Date: '19/10/2023', Expire: '03/11/2023' },
    { ID: 1041, StuId: '200171', BookId: '1000230331', Date: '20/10/2023', Expire: '04/11/2023' },
    { ID: 1042, StuId: '200172', BookId: '1000230332', Date: '21/10/2023', Expire: '05/11/2023' },
    { ID: 1043, StuId: '200173', BookId: '1000230333', Date: '22/10/2023', Expire: '06/11/2023' },
    { ID: 1044, StuId: '200174', BookId: '1000230334', Date: '23/10/2023', Expire: '07/11/2023'}]
  ;
  return (
    <>
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="table-container overflow-y-auto flex-1 w-full grid items-start">
        <table className="table tectav min-w-full divide-y divide-gray-200">
          <thead className='text-accent'>
              <tr>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">NO</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Student ID</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Book ID</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Date</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary">Expire</th>
                <th className="sticky top-0 text-left text-xs font-medium bg-secondary"></th>
              </tr>
          </thead>
          <tbody>
            {BorrowData.map((entry, index) => (
              <tr key={index} className='hover:bg-primary cursor-pointer active:bg-primary'>
                <th>{index + 1}</th>
                <td>{entry.StuId}</td>
                <td>{entry.BookId}</td>
                <td>{entry.Date}</td>
                <td>{entry.Expire}</td>
                <td className='text-center hover:bg-secondary'>  
                    <button class="bg-base-100 hover:bg-neutral text-accent font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className=" fill-accent p-0 w-4 h-4 mr-2" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>backup-restore-line</title> <rect class="clr-i-outline clr-i-outline-path-1" x="6" y="22" width="24" height="2"></rect><rect class="clr-i-outline clr-i-outline-path-2" x="26" y="26" width="4" height="2"></rect><path class="clr-i-outline clr-i-outline-path-3" d="M13,9.92,17,6V19a1,1,0,1,0,2,0V6l4,3.95A1,1,0,1,0,24.38,8.5L18,2.16,11.61,8.5A1,1,0,0,0,13,9.92Z"></path><path class="clr-i-outline clr-i-outline-path-4" d="M30.84,13.37A1.94,1.94,0,0,0,28.93,12H21v2h7.95C30,16.94,31.72,21.65,32,22.48V30H4V22.48C4.28,21.65,7.05,14,7.05,14H15V12H7.07a1.92,1.92,0,0,0-1.9,1.32C2,22,2,22.1,2,22.33V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V22.33C34,22.1,34,22,30.84,13.37Z"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
                      <span>Restore</span>
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default BackupBorrow;
