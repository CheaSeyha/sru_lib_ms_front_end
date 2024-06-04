
import CameraScanQR from './Component/CameraScanQR'
import FormConfirmEntry from './Component/FormConfirmEntry'
function QRStudentEntry() {
    

    return (
        <div className='w-full h-full'>
            <div className="flex flex-col space-y-5 ScanQR-ConfirmForm w-[390px] h-full rounded-[20px]">
                {/* Show Scan Camera  */}
                <CameraScanQR/>
                {/* Show Scan Camera  */}
                {/* Form Show Stundet infor after scan  */}
                <FormConfirmEntry/>
                {/* Form Show Stundet infor after scan  */}
            </div>
        </div>
    )
}

export default QRStudentEntry
