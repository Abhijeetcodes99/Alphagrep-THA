// React Imports
import React, { useMemo } from 'react';
// Third-Party Library Imports
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { useNavigate } from 'react-router-dom';
// Context and Helper Imports
import { useFileContext } from '../../Context/FileContext';
import { flattenFileData } from '../../utils/helper';
import { getColumnDefs, defaultColDef } from '../GridConfig/ManageReportTableConfig';
// Styles
import './index.css';

const ReportTable = () => {
    // Context and navigation hooks
    const { fileData, toggleActiveStatus, updateTags } = useFileContext();
    const navigate = useNavigate();

    // Flatten file data
    const rowData = useMemo(() => flattenFileData(fileData), [fileData]);

    // Get column definitions
    const columnDefs = useMemo(
        () => getColumnDefs(navigate, toggleActiveStatus, updateTags),
        [navigate, toggleActiveStatus, updateTags]
    );

    // Render the AG Grid component
    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%',marginTop:'10px' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                groupDisplayType="singleColumn"
                rowGroupPanelShow="always"
                animateRows={true}
            />
        </div>
    );
};

export default ReportTable;
