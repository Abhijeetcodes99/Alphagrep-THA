// React and Library Imports
import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// Context and Utility Imports
import { useFileContext } from '../../Context/FileContext';
import { parseCsvFile } from '../../utils/helper';

// Styles Import
import './index.css';
import {NA} from "../../Constant";

/**
 * ScrollableTabsButtonAuto Component
 * Provides a UI with scrollable tabs for subfolders and a file selector dropdown.
 */
export default function ScrollableTabsButtonAuto({ onDataLoad, initialSubfolder, initialFileName }) {
    // Access file data from context
    const { fileData } = useFileContext();

    // State Management
    const [value, setValue] = useState(0);
    const [subfolders, setSubfolders] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedMetadata, setSelectedMetadata] = useState({});


    //Effect to initialize subfolders, selected files, and metadata based on initial props.

    useEffect(() => {
        const subfolderNames = Object.keys(fileData);
        setSubfolders(subfolderNames);

        const subfolderIndex = subfolderNames.indexOf(initialSubfolder);
        if (subfolderIndex >= 0) {
            setValue(subfolderIndex);
            const files = fileData[initialSubfolder];
            const initialFile = files.find((file) => file.name === initialFileName);
            if (initialFile) {
                setSelectedFiles(files);
                setSelectedFile(initialFile.name);
                setSelectedMetadata(initialFile);
                loadCsvData(initialSubfolder, initialFile.name);
            }
        }
    }, [fileData, initialSubfolder, initialFileName]);


     //Loads CSV data using the utility function and updates the state.
    const loadCsvData = (subfolder, fileName) => {
        const filePath = `/folder/${subfolder}/${fileName}`;
        parseCsvFile(
            filePath,
            (data) => onDataLoad(data),
            (error) => console.error('Failed to parse CSV file:', error)
        );
    };


     //Handles the tab change event to update the selected subfolder and files.
    const handleTabChange = (event, newValue) => {
        const selectedSubfolder = subfolders[newValue];
        const files = fileData[selectedSubfolder];
        setValue(newValue);

        if (files.length > 0) {
            const firstFile = files[0];
            setSelectedFiles(files);
            setSelectedFile(firstFile.name);
            setSelectedMetadata(firstFile);
            loadCsvData(selectedSubfolder, firstFile.name);
        }
    };


     //Handles the file selection change event to update the selected file and metadata.
    const handleFileChange = (event) => {
        const fileName = event.target.value;
        const selectedSubfolder = subfolders[value];
        const fileMetadata = selectedFiles.find((file) => file.name === fileName);

        setSelectedFile(fileName);
        setSelectedMetadata(fileMetadata);
        loadCsvData(selectedSubfolder, fileName);
    };

    return (
        <Box
            className="alphagrep-tab-box">
            {/* Tabs for Subfolders */}
            <Tabs value={value} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                {subfolders.map((subfolder, index) => (
                    <Tab key={index} label={subfolder} />
                ))}
            </Tabs>

            {/* Dropdown for File Selection */}
            <Select value={selectedFile} onChange={handleFileChange} sx={{ marginTop: 2, minWidth: 200 }} >
                {selectedFiles.map((file, index) => (
                    <MenuItem key={index} value={file.name}>
                        {file.name}
                    </MenuItem>
                ))}
            </Select>

            {/* Display Metadata */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                <strong>Created At:</strong> {selectedMetadata.createdAt || NA}
            </Typography>
        </Box>
    );
}
