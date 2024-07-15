import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import { useScanResultID } from '../Context/ScanResultIDContext';
import CameraScanQR from './Component/CameraScanQR';
import CardDataOfStudentEntry from './Component/CardDataOfStudentEntry';
import FormConfirmEntry from './Component/FormConfirmEntry';
import TableStudentEntryData from './Component/TableStudentEntryData';
import { DoorOpen, LogOut, UsersRound } from 'lucide-react';

function QRStudentEntry() {
    const { scanResultID, setScanResultID } = useScanResultID();
    const [stopScan, setStopScan] = useState(false);
    const [studetnEntryData, setStudetnEntryData] = useState([]);
    const [checkPurpose, setCheckPurpose] = useState('');
    const [disCheckPur, setDisCheckPur] = useState(true);
    const [cardDataEntry, setCardDataEntry] = useState([
        { cardType: "", dataNumber: 0 }
    ]);
    const [stuEntryInfor, setStuEntryInfor] = useState({
        studentId: 0, studentName: "", gender: "", dateOfBirth: "",
        degreeLevel: "", majorName: "", generation: ""
    });
    const [timeoutId, setTimeoutId] = useState(null); // State to hold timeout ID

    // Fetch recent entry data
    const fetchRecentEntryData = async () => {
        try {
            const response = await axios.get("/entry");
            setStudetnEntryData(response.data.attendDetail);
            setCardDataEntry(response.data.cardEntry);
        } catch (error) {
            toast.error("Error fetching recent entry data. Please try again.");
        }
    };

    // Handle scan result checking
    const handleCheckScanEntryExit = async () => {
        if (scanResultID !== 0) {
            try {
                const result = await axios.get(`entry/check?studentId=${scanResultID}`);
                if (result.data === "exited" || result.data === "new attend!") {
                    const studentResult = await axios.get(`/student/${scanResultID}`);
                    if(studentResult.data === ""){
                        toast.error("Can't not find a student data")
                        handleClearFormData()
                    }else{
                        setStopScan(true)
                        setStuEntryInfor(studentResult.data);
                        setDisCheckPur(false); // Enable check purpose
                        startTimeout();
                    } 
                } else {
                    await toast.promise(
                        axios.put(`entry?studentId=${scanResultID}`),
                        {
                            loading: 'Updating...',
                            success: `Student ID ${scanResultID} Exited`,
                            error: 'Error updating entry.'
                        }
                    );
                    setStopScan(true);
                    fetchRecentEntryData(); // Fetch latest data after update
                    handleClearFormData();
                    setDisCheckPur(false); // Enable check purpose
                    startTimeout();
                }
            } catch (error) {
                toast.error("Error checking scan result.");
            }
        }
    };

    // Start timeout to restart scan
    const startTimeout = () => {
        clearTimeout(timeoutId); // Clear previous timeout if any
        const id = setTimeout(() => {
            setScanResultID(0); // Reset scan result ID after timeout
            setStopScan(false);
            setCheckPurpose("");
            setStuEntryInfor({
                studentId: 0, studentName: "", gender: "", dateOfBirth: "",
                degreeLevel: "", majorName: "", generation: ""
            });
            setDisCheckPur(true);
            toast.error("Scan reset due to inactivity."); // Notify user of reset
        }, 60000); // 1 minute timeout
        setTimeoutId(id); // Save timeout ID to state
    };

    // Clear form data
    const handleClearFormData = () => {
        clearTimeout(timeoutId); // Clear timeout when clearing form data
        setScanResultID(0);
        setStopScan(false);
        setCheckPurpose("");
        setStuEntryInfor({
            studentId: 0, studentName: "", gender: "", dateOfBirth: "",
            degreeLevel: "", majorName: "", generation: ""
        });
        setDisCheckPur(true);
    };

    // Save entry
    const handleSaveEntry = () => {
        clearTimeout(timeoutId); // Clear timeout when saving entry
        if (checkPurpose === "") {
            toast.error("Please select an entry purpose.");
        } else {
            axios.post('/entry', null, {
                params: {
                    studentId: Number(scanResultID),
                    purpose: checkPurpose
                }
            })
                .then(result => {
                    toast.success(`Student ID ${scanResultID} Entry successfully.`);
                    handleClearFormData();
                    fetchRecentEntryData(); // Fetch latest data after save
                })
                .catch(error => {
                    toast.error("Error saving entry.");
                });
        }
    };

    useEffect(() => {
        fetchRecentEntryData();
        if (scanResultID !== 0) {
            handleCheckScanEntryExit();
        }
    }, [scanResultID]);

    return (
        <div className='z-30 w-full h-fit sm:h-full flex flex-col-reverse sm:flex-row space-x-0 sm:space-x-5 overflow-auto'>
            <div className="flex flex-col space-y-5 ScanQR-ConfirmForm w-full sm:w-[230px] lg:w-[290px] xl:w-[390px] rounded-[20px]">
                <CameraScanQR stopScan={stopScan} />
                <FormConfirmEntry
                    checkPurpose={checkPurpose}
                    setCheckPurpose={setCheckPurpose}
                    disCheckPur={disCheckPur}
                    stuEntryInfor={stuEntryInfor}
                    handleClearFormData={handleClearFormData}
                    handleSaveEntry={handleSaveEntry}
                />
            </div>
            <div className="flex-1 sm:flex flex-col data-of-entry-table w-full h-full sm:space-y-5 overflow-auto mb-5 sm:mb-0">
                <div className="student-entry-card w-full h-[104px] grid grid-cols-3 gap-5">
                    {cardDataEntry.map((data, index) => (
                        <CardDataOfStudentEntry
                            amountData={data.dataNumber}
                            cardType={data.cardType}
                            key={index}
                        />
                    ))}
                </div>
                <TableStudentEntryData studentEntryData={studetnEntryData} />
            </div>
        </div>
    );
}

export default QRStudentEntry;
