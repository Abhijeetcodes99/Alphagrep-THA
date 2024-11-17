import React, { useState, useEffect } from 'react';

// Component Imports
import ReportTable from "../ManageReportTable";
import PageHeading from "../Header";

// Utility Import
import { flattenFileData } from '../../utils/helper';

/**
 * ManageReport Component
 * This component is responsible for managing the report data and rendering the report table.
 */
const ManageReport = () => {
    // State to store the flattened report data
    const [reportData, setReportData] = useState([]);


    useEffect(() => {
        fetch('/folder/fileList.json')
            .then((response) => response.json())
            .then((data) => {
                const flattenedData = flattenFileData(data);
                setReportData(flattenedData);
            })
            .catch((error) => console.error('Error loading report data:', error));
    }, []);


     //Toggles the active status of a report item.
    const handleToggleActive = (index) => {
        const updatedData = [...reportData];
        updatedData[index].active = !updatedData[index].active;
        setReportData(updatedData);
    };


     //Updates the tags for a report item.
    const handleTagUpdate = (index, tags) => {
        const updatedData = [...reportData];
        updatedData[index].tags = tags;
        setReportData(updatedData);
    };

    return (
        <div className="report-management">
            {/* Page Heading */}
            <PageHeading pgHead="Manage Report Dashboard" />

            {/* Report Table Component */}
            <ReportTable
                data={reportData}
                onToggleActive={handleToggleActive}
                onTagUpdate={handleTagUpdate}
            />
        </div>
    );
};

export default ManageReport;
