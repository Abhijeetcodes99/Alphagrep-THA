// React Imports
import React, { createContext, useContext, useState } from 'react';

/**
 * Initial data for files organized by subfolder.
 */
const initialFileData = {
    subfolder1: [
        { name: 'file1.csv', createdAt: '2024-11-01', active: true, tags: ['finance'] },
        { name: 'file2.csv', createdAt: '2024-11-02', active: true, tags: [] },
    ],
    subfolder2: [
        { name: 'file1.csv', createdAt: '2024-11-03', active: true, tags: ['stocks', 'analysis'] },
        { name: 'file3.csv', createdAt: '2024-11-04', active: false, tags: [] },
    ],
};

// Create a Context for file data
const FileContext = createContext();

/**
 * FileProvider Component
 * Provides the file data context to its children.
 *
 * @param {React.ReactNode} children - The child components that need access to file data context.
 */
export const FileProvider = ({ children }) => {
    // State to store file data
    const [fileData, setFileData] = useState(initialFileData);

    /**
     * Toggles the active status of a file.
     *
     * @param {string} subfolder - The subfolder containing the file.
     * @param {string} fileName - The name of the file to toggle.
     */
    const toggleActiveStatus = (subfolder, fileName) => {
        setFileData((prevData) => {
            // Clone the previous data
            const updatedData = { ...prevData };
            // Update the active status of the specified file
            updatedData[subfolder] = updatedData[subfolder].map((file) =>
                file.name === fileName ? { ...file, active: !file.active } : file
            );
            return updatedData;
        });
    };

    /**
     * Updates the tags for a specific file.
     *
     * @param {string} subfolder - The subfolder containing the file.
     * @param {string} fileName - The name of the file to update tags for.
     * @param {Array<string>} newTags - The new tags to set for the file.
     */
    const updateTags = (subfolder, fileName, newTags) => {
        setFileData((prevData) => {
            // Clone the previous data
            const updatedData = { ...prevData };
            // Update the tags of the specified file
            updatedData[subfolder] = updatedData[subfolder].map((file) =>
                file.name === fileName ? { ...file, tags: newTags } : file
            );
            return updatedData;
        });
    };

    /**
     * Moves a file from one subfolder to another.
     *
     * @param {string} sourceSubfolder - The subfolder from which the file will be moved.
     * @param {string} fileName - The name of the file to move.
     * @param {string} targetSubfolder - The subfolder to which the file will be moved.
     */
    const moveFile = (sourceSubfolder, fileName, targetSubfolder) => {
        setFileData((prevData) => {
            // Clone the previous data
            const updatedData = { ...prevData };
            // Find the file to move
            const fileToMove = updatedData[sourceSubfolder]?.find((file) => file.name === fileName);

            // If the file is not found, return the previous data
            if (!fileToMove) return prevData;

            // Remove the file from the source subfolder
            updatedData[sourceSubfolder] = updatedData[sourceSubfolder].filter((file) => file.name !== fileName);

            // Add the file to the target subfolder, create the subfolder if it doesn't exist
            updatedData[targetSubfolder] = [...(updatedData[targetSubfolder] || []), fileToMove];

            return updatedData;
        });
    };

    // Provide file data and functions via context
    return (
        <FileContext.Provider value={{ fileData, toggleActiveStatus, updateTags, moveFile }}>
            {children}
        </FileContext.Provider>
    );
};

/**
 * Custom hook to use the FileContext.
 *
 * @returns {Object} The context value including file data and manipulation functions.
 */
export const useFileContext = () => useContext(FileContext);
