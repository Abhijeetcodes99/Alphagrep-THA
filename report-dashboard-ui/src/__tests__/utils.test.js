import { flattenFileData,parseCsvFile} from "../utils/helper";
import Papa from 'papaparse';

// Mocking PapaParse
jest.mock('papaparse');

describe('Utility Functions', () => {
    describe('flattenFileData', () => {
        it('should flatten nested file data structure and add subfolder information', () => {
            const fileData = {
                subfolder1: [
                    { name: 'file1.csv', createdAt: '2024-11-01', active: true, tags: ['finance'] },
                    { name: 'file2.csv', createdAt: '2024-11-02', active: true, tags: [] },
                ],
                subfolder2: [
                    { name: 'file3.csv', createdAt: '2024-11-03', active: false, tags: ['stocks'] },
                ],
            };

            const expectedOutput = [
                { name: 'file1.csv', createdAt: '2024-11-01', active: true, tags: ['finance'], subfolder: 'subfolder1' },
                { name: 'file2.csv', createdAt: '2024-11-02', active: true, tags: [], subfolder: 'subfolder1' },
                { name: 'file3.csv', createdAt: '2024-11-03', active: false, tags: ['stocks'], subfolder: 'subfolder2' },
            ];

            const result = flattenFileData(fileData);
            expect(result).toEqual(expectedOutput);
        });

        it('should return an empty array if input is invalid', () => {
            expect(flattenFileData(null)).toEqual([]);
            expect(flattenFileData(undefined)).toEqual([]);
            expect(flattenFileData('invalid')).toEqual([]);
        });
    });

    describe('parseCsvFile', () => {
        it('should call onComplete with parsed data on successful CSV parsing', () => {
            const mockData = [{ name: 'test.csv', value: '123' }];
            const mockOnComplete = jest.fn();
            const mockOnError = jest.fn();

            // Mocking PapaParse's parse method
            Papa.parse.mockImplementation((filePath, options) => {
                options.complete({ data: mockData });
            });

            parseCsvFile('test.csv', mockOnComplete, mockOnError);

            expect(mockOnComplete).toHaveBeenCalledWith(mockData);
            expect(mockOnError).not.toHaveBeenCalled();
        });

        it('should call onError with error object on CSV parsing failure', () => {
            const mockError = new Error('Parsing Error');
            const mockOnComplete = jest.fn();
            const mockOnError = jest.fn();

            // Mocking PapaParse's parse method
            Papa.parse.mockImplementation((filePath, options) => {
                options.error(mockError);
            });

            parseCsvFile('test.csv', mockOnComplete, mockOnError);

            expect(mockOnError).toHaveBeenCalledWith(mockError);
            expect(mockOnComplete).not.toHaveBeenCalled();
        });

        it('should log an error if file path is not provided', () => {
            console.error = jest.fn();

            parseCsvFile('', jest.fn(), jest.fn());

            expect(console.error).toHaveBeenCalledWith('File path is not provided.');
        });
    });
});
