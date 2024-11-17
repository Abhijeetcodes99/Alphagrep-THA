// React and Library Imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// Utility and Context Imports
import { parseCsvFile } from '../../utils/helper';
import { useFileContext } from '../../Context/FileContext';
// Component Imports
import ScrollableTabsButtonAuto from '../Tab';
import PageHeading from '../Header';
// Grid Configuration Imports
import { columnDefs, autoGroupColumnDef, defaultColDef } from '../GridConfig/ViewReportConfig';


const ViewReport = () => {
    // Retrieve parameters from the URL
    const { subfolder, fileName } = useParams();
    // Access file data and tag update function from context
    const { fileData, updateTags } = useFileContext();
    // State for storing row data from the CSV file
    const [rowData, setRowData] = useState([]);

    //Get file details from the context using the subfolder and file name.
    const fileDetails = fileData[subfolder]?.find((file) => file.name === fileName);


     // useEffect hook to fetch and parse the CSV file when subfolder or fileName changes.
    useEffect(() => {
        if (!fileDetails) {
            console.error(`File ${fileName} not found in subfolder ${subfolder}`);
            return;
        }
        // Construct the file path and parse the CSV file
        const filePath = `/folder/${subfolder}/${fileName}`;
        parseCsvFile(
            filePath,
            (data) => setRowData(data), // On successful parse, update row data
            (error) => console.error('Failed to parse CSV file:', error) // Handle parse error
        );
    }, [subfolder, fileName, fileDetails]);

    return (
        <>
            {/* Page Heading */}
            <PageHeading pgHead={`Viewing Report: ${fileName}`} />

            {/* Tab Component for Additional Navigation */}
            <ScrollableTabsButtonAuto
                onDataLoad={setRowData}
                initialSubfolder={subfolder}
                initialFileName={fileName}
            />

            {/* AG Grid Component to Display CSV Data */}
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    pagination={true}
                    paginationPageSize={50}
                    animateRows={true}
                    rowGroupPanelShow="always"
                />
            </div>
        </>
    );
};

export default ViewReport;
