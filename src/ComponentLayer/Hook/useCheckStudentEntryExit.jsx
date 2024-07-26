import axios from '../../api/axios';

function useScanEntry(checkPurpose) {

    const handleSearchStudent = async (studentID) => {
        try {
            const searchResult = await axios.get(`/student/${studentID}`);
            if (!searchResult.data) { // Check for empty or null data
                return { status: "not found", data: null };
            } else {
                return { status: "success", data: searchResult.data };
            }
        } catch (error) {
            console.error("Error occurred while searching student:", error);
            return { status: "error", message: "Error occurred while searching student." };
        }
    }

    const handleCheckScanEntryExit = async (studentID) => {
        if (!studentID) {
            return { status: "error", message: "Invalid student ID." };
        }
        
        try {
            const result = await axios.get(`entry/check?studentId=${studentID}`);
            if (result.data === "exited" || result.data === "new attend!") {
                return { status: "entry", message: "Student entry." };
            } else {
                await axios.put(`entry?studentId=${studentID}`);
                return { status: "exit", message: "Student exit." };
            }
        } catch (error) {
            console.error("Error occurred while checking entry/exit:", error);
            return { status: "error", message: "Error occurred while checking entry/exit." };
        }
    };

    const handleSaveEntry = async (studentID, checkPurpose) => {
        try {
            const saveEntry = await axios.post('/entry', null, {
                params: {
                    studentId: Number(studentID),
                    purpose: checkPurpose
                }
            });

            if (!saveEntry.data) {
                return { status: "error", message: "Cannot save entry." };
            } else {
                return { status: "success", message: "Entry success." };
            }
        } catch (error) {
            console.error("Error occurred while saving entry:", error);
            return { status: "error", message: "Error occurred while saving entry." };
        }
    };

    return {
        handleCheckScanEntryExit,
        handleSaveEntry,
        handleSearchStudent
    };
}

export default useScanEntry;
