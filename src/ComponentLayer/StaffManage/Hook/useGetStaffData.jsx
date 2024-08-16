import axios from "../../../api/axios";
function useGetStaffData() {

    const handleGetAllStaff = async () => {//This function will return student data if found 
        try {
            const getStaff = await axios.get('/staff');
            return getStaff.data
        } catch (error) {
            console.error("Error occurred while searching student:", error);
            return error
        }
    }

    return {
        handleGetAllStaff
    }
}

export default useGetStaffData