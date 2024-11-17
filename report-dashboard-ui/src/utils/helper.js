// utils.js
import Papa from 'papaparse';


/**
 * Flattens the nested file data structure into a single array of file objects.
 * Adds the subfolder information to each file object.
 */
export const flattenFileData = (fileData) => {
    if (!fileData || typeof fileData !== 'object') return [];

    return Object.entries(fileData).flatMap(([subfolder, files]) =>
        (files || []).map((file) => ({ ...file, subfolder }))
    );
};

/**
 * Parses a CSV file using PapaParse.
 */
export const parseCsvFile = (filePath, onComplete, onError) => {
    if (!filePath) {
        console.error('File path is not provided.');
        return;
    }

    Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (result) => {
            onComplete(result.data);
        },
        error: (error) => {
            console.error('Error parsing CSV file:', error);
            if (onError) {
                onError(error);
            }
        },
    });
};
