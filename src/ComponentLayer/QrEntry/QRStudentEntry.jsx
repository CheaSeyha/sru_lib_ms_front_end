import { ScanResultIDProvider } from '../Context/ScanResultIDContext'
import CameraScanQR from './Component/CameraScanQR'
import CardDataOfStudentEntry from './Component/CardDataOfStudentEntry'
import FormConfirmEntry from './Component/FormConfirmEntry'
import { DoorOpen, LogOut, UsersRound} from 'lucide-react';
import HeadTextForTableData from './Component/HeadTextForTableData';

function QRStudentEntry() {

    return (
        <ScanResultIDProvider>
            <div className='w-full h-full flex flex-row space-x-5'>
                <div className="flex flex-col space-y-5 ScanQR-ConfirmForm w-[390px] h-full rounded-[20px]">
                    {/* Show Scan Camera  */}
                    <CameraScanQR />
                    {/* Show Scan Camera  */}
                    {/* Form Show Stundet infor after scan  */}
                    <FormConfirmEntry />
                    {/* Form Show Stundet infor after scan  */}
                </div>
                <div className="flex flex-col  data-of-entry w-full h-full border-collapse space-y-5">
                    <div className="student-entry-card w-full h-[104px] grid grid-flow-col gap-5">
                        <CardDataOfStudentEntry amountData={17} bgIcon="bg-[#00FF29]" cardType="Entry" cardTypeDetail="Total Entry Today" iconCard={<DoorOpen className='w-full h-full text-accent' />} bgColor="from-[#00C31F] to-[#1F9EB2]" />
                        <CardDataOfStudentEntry amountData={2} bgIcon="bg-[#00D1FF]" cardType="Exit" cardTypeDetail="Total Exit Today" iconCard={<LogOut className='w-full h-full text-accent' />} bgColor="from-[#00A4C8] to-[#C0C0C0]" />
                        <CardDataOfStudentEntry amountData={19} bgIcon="bg-[#C5F3B3]" cardType="Total" cardTypeDetail="Total Student Entry" iconCard={<UsersRound className='w-full h-full text-accent' />} bgColor="from-[#C0C0C0] to-[#50FF00]" />
                    </div>
                    <HeadTextForTableData/>
                </div>
            </div>
        </ScanResultIDProvider>
    )
}

export default QRStudentEntry
