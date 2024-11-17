import React from 'react';
import Switch from '@mui/material/Switch';
import TagInput from "../../TagInput";

/**
 * Default column definition for AG Grid.
 */
export const defaultColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
    sortable: true,
    filter: true,
};

/**
 * Returns the column definitions for AG Grid.
 */
export const getColumnDefs = (navigate, toggleActiveStatus, updateTags) => [
    {
        headerName: 'Folder',
        field: 'subfolder',
        sortable: true,
        filter: true,
        enableRowGroup: true,
    },
    {
        headerName: 'File Name',
        field: 'name',
        sortable: true,
        filter: true,
        cellRenderer: (params) => {
            const isActive = params?.data?.active;
            const handleClick = () => {
                if (isActive) {
                    navigate(`/view-report/${params.data.subfolder}/${params.value}`);
                }
            };

            return isActive ? (
                <span
                    className="file-link"
                    onClick={handleClick}
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    {params.value}
                </span>
            ) : (
                <span
                    className="file-link-inactive"
                    style={{ color: 'gray', cursor: 'not-allowed', textDecoration: 'line-through' }}
                >
                    {params.value}
                </span>
            );
        },
    },
    {
        headerName: 'Date Created',
        field: 'createdAt',
        sortable: true,
        filter: true,
    },
    {
        headerName: 'Report Status',
        field: 'active',
        cellRenderer: (params) => {
            if (!params.data) return null;

            const isActive = params.value;
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Switch
                        checked={isActive}
                        onChange={() => toggleActiveStatus(params.data.subfolder, params.data.name)}
                        color="primary"
                    />
                    <span style={{ color: isActive ? 'green' : 'red', fontWeight: 'bold' }}>
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            );
        },
    },
    {
        headerName: 'Tags',
        field: 'tags',
        cellRenderer: (params) => {
            // Check if params.data is undefined (group row case)
            if (!params.data) {
                return params.value?.join(', ') || null;
            }
            // For regular rows, render the TagInput component
            return (
                <TagInput
                    tags={params.value}
                    onUpdate={(tags) => updateTags(params.data.subfolder, params.data.name, tags)}
                />
            );
        },
        flex:2
    },

];
