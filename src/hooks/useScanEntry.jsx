import { useState, useEffect } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useScanResultID } from "../context/ScanResultIDContext";
import useWSDashboard from "../pages/Dashboard/Hook/useWSDashbaord";

function useScanEntry() {
  const { scanResultID, setScanResultID } = useScanResultID();
  const [stopScan, setStopScan] = useState(false);
  const [studetnEntryData, setStudetnEntryData] = useState([]);
  const [checkPurpose, setCheckPurpose] = useState("");
  const [disCheckPur, setDisCheckPur] = useState(true);
  const [cardDataEntry, setCardDataEntry] = useState([
    { cardType: "Entry", dataNumber: 0 },
    { cardType: "Exit", dataNumber: 0 },
    { cardType: "Total", dataNumber: 0 },
  ]);
  const [stuEntryInfor, setStuEntryInfor] = useState({
    studentId: 0,
    studentName: "",
    gender: "",
    dateOfBirth: "",
    degreeLevel: "",
    majorName: "",
    generation: "",
  });
  const [timeoutId, setTimeoutId] = useState(null);

  //Connect to WebSocket
  const { data: wsData } = useWSDashboard();

  // Update data when WebSocket messages arrive
  useEffect(() => {
    if (wsData) {
      const newEntries = wsData.customEntry || wsData.attendDetail;
      if (newEntries) {
        console.log("📥 Live Data Received via WS:", newEntries);
        setStudetnEntryData(newEntries);
      }
      fetchRecentEntryData();
    }
  }, [wsData]);

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

  // Handle scan result checking (handelSearchStudent logic)
  const handleCheckScanEntryExit = async () => {
    if (scanResultID !== 0) {
      try {
        // 1. Try to exit student first (PUT)
        const checkIsExit = await axios.put(`/entry?entryId=${scanResultID}`);
        console.log("Exit response:", checkIsExit.data);
        toast.success(`Student ID ${scanResultID} Exited successfully`);
        handleClearFormData();
        fetchRecentEntryData();
      } catch (error) {
        // 2. If NO active attendance, search student info for entry (GET)
        if (
          error.response?.status === 400 &&
          error.response?.data === "No active attendance to scan out"
        ) {
          try {
            /*
             Can replace University API here
             example API response should look like this
             {
              "studentId": 200743,
              "studentName": "Chea Seyha",
              "gender": "ប្រុស",
              "dateOfBirth": "2025-12-29",
              "degreeLevel": "Associate",
              "majorName": "English Literature",
              "generation": 16
              }
            */
            const searchStu = await axios.get(`/student/${scanResultID}`);
            toast.success("Student Found");
            setStopScan(true);
            setStuEntryInfor(searchStu.data);
            setDisCheckPur(false); // Enable purpose selection
            startTimeout();
          } catch (searchError) {
            if (searchError.response?.status === 400) {
              toast.error("Student ID Not Found");
            } else {
              toast.error("Something went wrong");
            }
            handleClearFormData();
          }
        } else {
          toast.error("Error while searching student please try again");
          handleCheckScanEntryExit();
        }
      }
    }
  };

  // Start timeout to restart scan
  const startTimeout = () => {
    clearTimeout(timeoutId);
    const id = setTimeout(() => {
      handleClearFormData();
      toast.error("Scan reset due to inactivity.");
    }, 60000);
    setTimeoutId(id);
  };

  // Clear form data
  const handleClearFormData = () => {
    clearTimeout(timeoutId);
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
      generation: "",
    });
    setDisCheckPur(true);
  };

  // Save entry
  const handleSaveEntry = async () => {
    if (scanResultID === 0) {
      toast.error("Please scan your card before entry...");
    } else if (checkPurpose === "") {
      toast.error("Please Check Entry Purpose");
    } else {
      try {
        const checkStatus = await axios.get(
          `/entry/check?entryId=${scanResultID}`,
        );
        if (
          checkStatus.data.status === "new attend!" ||
          checkStatus.data.status === "exited"
        ) {
          await axios.post("/entry", null, {
            params: {
              entryId: Number(scanResultID),
              purpose: checkPurpose,
            },
          });
          toast.success("Student Entry Success");
          handleClearFormData();
          fetchRecentEntryData();
        }
      } catch (error) {
        console.error("Error saving entry:", error);
        toast.error("Error saving entry.");
      }
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
    fetchRecentEntryData,
  };
}

export default useScanEntry;
