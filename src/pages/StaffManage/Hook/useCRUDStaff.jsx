import { useState, useCallback, useEffect } from "react";
import axios from "../../../api/axios"; // Adjust the import path as needed

const useCRUDStaff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [staffList, setStaffList] = useState([]); // State for storing staff data

  // Function to fetch all staff data
  const getAllStaff = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/library-staff"); // Fetch all staff data
      setStaffList(response.data); // Update the staffList state with the fetched data
      return response.data; // Optionally return the response data if needed
    } catch (err) {
      setError(err);
      console.error("Failed to fetch staff data:", err); // Log the error for debugging
      throw err; // Optionally rethrow the error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  }, []); // Removed staffList dependency to allow refetching every time

  const getAllStaffNoLoading = useCallback(async () => {
    setError(null);

    try {
      const response = await axios.get("/library-staff"); // Fetch all staff data
      setStaffList(response.data); // Update the staffList state with the fetched data
      return response.data; // Optionally return the response data if needed
    } catch (err) {
      setError(err);
      console.error("Failed to fetch staff data:", err); // Log the error for debugging
      throw err; // Optionally rethrow the error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  }, []); // Removed staffList dependency to allow refetching every time

  // Function to save staff data
  const saveStaff = useCallback(
    async (staffData) => {
      setError(null);
      setSuccess(false);

      try {
        await axios.post("/library-staff", {
          staffName: staffData.staffName,
          gender: staffData.gender,
          position: staffData.position,
          degreeLevel: staffData.degreeLevel,
          majorId: staffData.major,
          year: staffData.studyYear,
          shiftWork: staffData.shiftWork,
          isActive: staffData.isActive,
        });
        setSuccess(true); // Set success to true on successful save
        await getAllStaff(); // Fetch the updated staff list after save
      } catch (err) {
        setError(err);
        console.error("Failed to save staff data:", err); // Log the error for debugging
        throw err; // Optionally rethrow the error to handle it in the calling component
      } finally {
        setLoading(false);
      }
    },
    [getAllStaff],
  ); // Dependency on getAllStaff to ensure the staff list is updated after save

  // Function to delete staff data
  const deleteStaff = useCallback(
    async (staffID) => {
      setError(null);
      setSuccess(false);

      try {
        await axios.delete(`/library-staff/${staffID}`); // Send DELETE request to API
        setSuccess(true); // Set success to true on successful deletion
        await getAllStaff(); // Fetch the updated staff list after deletion
      } catch (err) {
        setError(err);
        console.error("Failed to delete staff data:", err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    },
    [getAllStaff],
  ); // Dependency on getAllStaff to ensure the staff list is updated after deletion

  // Function to update staff data
  const updateStaff = useCallback(
    async (staffID, updatedData) => {
      setError(null);
      setSuccess(false);

      try {
        await axios.put(`/library-staff/${staffID}`, {
          staffName: updatedData.staffName,
          gender: updatedData.gender,
          position: updatedData.position,
          degreeLevel: updatedData.degreeLevel,
          majorId: updatedData.major,
          year: updatedData.studyYear,
          shiftWork: updatedData.shiftWork,
          isActive: updatedData.isActive,
        }); // Send PUT request to API
        setSuccess(true); // Set success to true on successful update
        await getAllStaff(); // Fetch the updated staff list after update
      } catch (err) {
        setError(err);
        console.error("Failed to update staff data:", err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    },
    [getAllStaff],
  ); // Dependency on getAllStaff to ensure the staff list is updated after update

  // Automatically fetch staff data when the hook is first used
  useEffect(() => {
    getAllStaff();
  }, [getAllStaff]);

  return {
    saveStaff,
    deleteStaff,
    updateStaff,
    getAllStaff,
    getAllStaffNoLoading,
    loading,
    error,
    success,
    staffList,
  };
};

export default useCRUDStaff;
