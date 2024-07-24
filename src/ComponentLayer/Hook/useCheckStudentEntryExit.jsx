import axios from '../../api/axios';
function useScanEntry(checkPurpose) {


    const handleSearchStudent = async (studentID) => {
        try {
            const searchResult = await axios.get(`/student/${studentID}`);
            if (searchResult.data === "") {//not found
                return "not found"
            } else {
                return searchResult.data
            }
        } catch (error) {
            return "Error occurred while search student.";
        }
    }

    const handleCheckScanEntryExit = async (studentID) => {
        if (studentID !== "") {
            try {
                const result = await axios.get(`entry/check?studentId=${studentID}`);
                if (result.data === "exited" || result.data === "new attend!") {
                    return "student entry"
                } else {
                    const updateExitTime = await axios.put(`entry?studentId=${studentID}`)
                    return "student exit";
                }
            } catch (error) {
                return "Error occurred while checking entry/exit.";
            }
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

            if (saveEntry === "") {
                return "can not save";
            } else {
                return "entry success";
            }
        } catch (error) {
            return "Error occurred while saving entry.";
        }
    };

    return {
        handleCheckScanEntryExit,
        handleSaveEntry,
        handleSearchStudent
    };
}

export default useScanEntry;
