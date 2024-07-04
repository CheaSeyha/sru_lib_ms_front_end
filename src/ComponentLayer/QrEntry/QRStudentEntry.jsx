import CameraScanQR from './Component/CameraScanQR'
import CardDataOfStudentEntry from './Component/CardDataOfStudentEntry'
import FormConfirmEntry from './Component/FormConfirmEntry'
import { DoorOpen, LogOut, UsersRound } from 'lucide-react';
import TableStudentEntryData from './Component/TableStudentEntryData';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import { useScanResultID } from '../Context/ScanResultIDContext';

function QRStudentEntry() {
    const { scanResultID } = useScanResultID()

    const [studetnEntryData, setStudetnEntryData] = useState([])
    const [cardDataEntry, setCardDataEntry] = useState([
        {
            cardType: "",
            dataNumber: 0
        }
    ])
    const handleGetRecentEntry = async () => {
        try {
            const respone = await axios.get("/entry")
            setStudetnEntryData(respone.data.attendDetail)
            setCardDataEntry(respone.data.cardEntry)
        } catch (error) {
            toast.error("Error Please Try Again")
        }
    }

    useEffect(() => {
        handleGetRecentEntry()
        // console.log(studetnEntryData)
    }, [scanResultID])

    return (
        <div className='w-full h-fit sm:h-full flex flex-col-reverse sm:flex-row space-x-0 sm:space-x-5 overflow-auto'>
            <div className="flex flex-col space-y-5 ScanQR-ConfirmForm w-full sm:w-[230px] lg:w-[290px] xl:w-[390px] rounded-[20px]">
                {/* <!-- Show Scan Camera  --> */}
                <CameraScanQR />
                {/* <!-- Form Show Student info after scan  --> */}
                <FormConfirmEntry />
            </div>
            <div className="flex-1 sm:flex flex-col data-of-entry-table w-full h-full sm:space-y-5 overflow-auto mb-5 sm:mb-0">
                <div className="student-entry-card w-full h-[104px] grid grid-cols-3 gap-5">
                    {cardDataEntry.map((data,index)=>(
                        <CardDataOfStudentEntry amountData={data.dataNumber} cardType={data.cardType} key={index} />
                    ))}
                </div>
                <TableStudentEntryData studentEntryData={studetnEntryData} />
            </div>
        </div>
    )
}

export default QRStudentEntry
