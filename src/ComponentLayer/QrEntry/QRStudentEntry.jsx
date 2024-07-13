import CameraScanQR from './Component/CameraScanQR';
import CardDataOfStudentEntry from './Component/CardDataOfStudentEntry';
import FormConfirmEntry from './Component/FormConfirmEntry';
import { DoorOpen, LogOut, UsersRound } from 'lucide-react';
import TableStudentEntryData from './Component/TableStudentEntryData';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import { useScanResultID } from '../Context/ScanResultIDContext';

function QRStudentEntry() {
    const { scanResultID, setScanResultID } = useScanResultID();
    const [stopScan, setStopScan] = useState(false);
    const [studetnEntryData, setStudetnEntryData] = useState([]);
    const [checkPurpose, setCheckPurpose] = useState('');
    const [disCheckPur, setDisCheckPur] = useState(true);
    const [cardDataEntry, setCardDataEntry] = useState([
        {
            cardType: "",
            dataNumber: 0
        }
    ]);
    const [stuEntryInfor, setStuEntryInfor] = useState({
        studentId: 0,
        studentName: "",
        gender: "",
        dateOfBirth: "",
        degreeLevel: "",
        majorName: "",
        generation: ""
    });

    // Data Show On Table
    const handleGetRecentEntry = async () => {
        try {
            const response = await axios.get("/entry");
            setStudetnEntryData(response.data.attendDetail);
            setCardDataEntry(response.data.cardEntry);
        } catch (error) {
            toast.error("Error Please Try Again");
        }
    };

    const handleCheckScanEntryExit = () => {
        if (scanResultID !== 0) { // When Scan Success And Get Student ID
            setDisCheckPur(false); // Enable Check Purpose
            // Check Student Entry Or Exit 
            axios.get(`entry/check?studentId=${scanResultID}`).then(result => {
                if (result.data === "exited" || result.data === "new attend!") { // Create new entry record 
                    setStopScan(true);
                    // Get Data Of Student
                    axios.get("/student/" + scanResultID).then(result => {
                        setStuEntryInfor(result.data);
                    });
                } else { // Update Student Exited Times
                    axios.put(`entry?studentId=${scanResultID}`).then(result => {
                        //Stop Scan and set it scan again to make the 
                        setStopScan(true)
                        axios.get("/entry").then(result=>{//Fix Leter 
                            setStopScan(false)
                            //Get New data to show on table
                            setCardDataEntry(result.data.cardEntry);
                            setStudetnEntryData(result.data.attendDetail)
                            handleClearFormData()
                        })
                    });
                }
                
            });
        }
    };

    const handleClearFormData = () => {
        setScanResultID(0);
        setStopScan(false);
        setCheckPurpose("");
        setStuEntryInfor({
            studentId: 0,
            studentName: "",
            gender: "",
            dateOfBirth: "",
            degreeLevel: "",
            majorName: "",
            generation: ""
        });
        setDisCheckPur(true);
    };

    const handleSaveEntry = () => {
        if (checkPurpose === "") {
            toast.error("Please Check Entry Purpose");
        } else {
            axios.post('/entry', null, {
                params: {
                    studentId: Number(scanResultID),
                    purpose: checkPurpose
                }
            }).then(result => {
                console.log("Student Submitted");
                handleClearFormData();
                handleGetRecentEntry(); // Fetch latest data after save
            });
        }
    };

    useEffect(() => {
        handleGetRecentEntry();
        handleCheckScanEntryExit();
        // console.log(studetnEntryData);
    }, [scanResultID]);

    return (
        <div className='w-full h-fit sm:h-full flex flex-col-reverse sm:flex-row space-x-0 sm:space-x-5 overflow-auto'>
            <div className="flex flex-col space-y-5 ScanQR-ConfirmForm w-full sm:w-[230px] lg:w-[290px] xl:w-[390px] rounded-[20px]">
                {/* <!-- Show Scan Camera  --> */}
                <CameraScanQR stopScan={stopScan} />
                {/* <!-- Form Show Student info after scan  --> */}
                <FormConfirmEntry checkPurpose={checkPurpose} setCheckPurpose={setCheckPurpose} disCheckPur={disCheckPur} stuEntryInfor={stuEntryInfor} handleClearFormData={handleClearFormData} handleSaveEntry={handleSaveEntry}/>
            </div>
            <div className="flex-1 sm:flex flex-col data-of-entry-table w-full h-full sm:space-y-5 overflow-auto mb-5 sm:mb-0">
                <div className="student-entry-card w-full h-[104px] grid grid-cols-3 gap-5">
                    {cardDataEntry.map((data, index) => (
                        <CardDataOfStudentEntry amountData={data.dataNumber} cardType={data.cardType} key={index} />
                    ))}
                </div>
                <TableStudentEntryData studentEntryData={studetnEntryData} />
            </div>
        </div>
    );
}

export default QRStudentEntry;
