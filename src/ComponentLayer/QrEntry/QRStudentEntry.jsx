import { ScanResultIDProvider } from '../Context/ScanResultIDContext'
import CameraScanQR from './Component/CameraScanQR'
import CardDataOfStudentEntry from './Component/CardDataOfStudentEntry'
import FormConfirmEntry from './Component/FormConfirmEntry'
import { DoorOpen, LogOut, UsersRound } from 'lucide-react';
import TableStudentEntryData from './Component/TableStudentEntryData';

function QRStudentEntry() {

    return (
        <ScanResultIDProvider>
            <div className='w-full h-full flex flex-row space-x-5'>
                <div className="flex-none flex flex-col space-y-5 ScanQR-ConfirmForm lg:w-[290px] xl:w-[390px] rounded-[20px]">
                    {/* <!-- Show Scan Camera  --> */}
                    <CameraScanQR />
                    {/* <!-- Form Show Student info after scan  --> */}
                    <FormConfirmEntry />
                </div>
                <div className="flex-1 flex flex-col data-of-entry-table w-full h-full space-y-5 overflow-auto">
                    <div className="student-entry-card w-full lg:h-[90px] xl:h-[104px] grid grid-cols-3 lg:gap-5">
                        <CardDataOfStudentEntry amountData={17} bgIcon="bg-[#00FF29]" cardType="Entry" cardTypeDetail="Total Entry Today" iconCard={<DoorOpen className='w-full h-full text-white' />} bgColor="from-[#00C31F] to-[#1F9EB2]" />
                        <CardDataOfStudentEntry amountData={2} bgIcon="bg-[#00D1FF]" cardType="Exit" cardTypeDetail="Total Exit Today" iconCard={<LogOut className='w-full h-full text-white' />} bgColor="from-[#00A4C8] to-[#C0C0C0]" />
                        <CardDataOfStudentEntry amountData={19} bgIcon="bg-[#C5F3B3]" cardType="Total" cardTypeDetail="Total Student Entry" iconCard={<UsersRound className='w-full h-full text-white' />} bgColor="from-[#C0C0C0] to-[#50FF00]" />
                    </div>
                    <TableStudentEntryData />
                </div>
            </div>

        </ScanResultIDProvider>
    )
}

export default QRStudentEntry
