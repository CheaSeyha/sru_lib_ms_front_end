import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import { useScanResultID } from '../Context/ScanResultIDContext';

function useScanEntry() {
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
    const [timeoutId, setTimeoutId] = useState(null);

    // Fetch recent entry ch
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
                    if (studentResult.data === "") {
                        toast.error("Can't not find a student data")
                        handleClearFormData()
                    } else {
                        setStopScan(true);
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
        if (scanResultID === 0) {
            toast.error("Please scan your card before entry...")
        }
        else if (checkPurpose === "") {
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

    return {
        stopScan,
        studetnEntryData,
        checkPurpose,
        setCheckPurpose,
        disCheckPur,
        cardDataEntry,
        stuEntryInfor,
        handleClearFormData,
        handleSaveEntry,
        fetchRecentEntryData
    };
}

export default useScanEntry;
