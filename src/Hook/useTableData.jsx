import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTableData = (studentEntryData) => {
    const navigate = useNavigate();
    const [recordsPerPage] = useState(16); // Number of records per page
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('all'); // Default filter

    const handleBack = () => {
        navigate(-1); // This will navigate to the previous URL in the history stack
    };
    // Filter data based on selected filter
    const getFilteredRecords = (data) => {
        if (filter === 'all') return data;
        return data.filter((e) =>
            filter === 'in' ? e.exitingTimes === null : e.exitingTimes !== null
        );
    };

    const filteredData = getFilteredRecords(studentEntryData);

    // Calculate total pages based on filtered data
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    // Function to get records for the current page
    const getPaginatedRecords = (data, page) => {
        const startIndex = (page - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // Adjust current page if needed when filter changes
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    // Reset current page to 1 if data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, studentEntryData]);

    const currentRecords = getPaginatedRecords(filteredData, currentPage);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Calculate page buttons to display
    const getPageButtons = () => {
        if (totalPages <= 1) return []; // No pagination needed if there's only one page

        const buttons = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, startPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        return buttons;
    };

    const pageButtons = getPageButtons();

    return {
        handleBack,
        filter,
        setFilter,
        currentRecords,
        handlePageChange,
        currentPage,
        totalPages,
        pageButtons
    };
};

export default useTableData;
