import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ManageReport from './ManageReport';
import '@testing-library/jest-dom/extend-expect';

// Mock data for the test
const mockData = {
    subfolder1: [
        { name: 'file1.csv', createdAt: '2024-11-01', active: true, tags: ['finance'] },
        { name: 'file2.csv', createdAt: '2024-11-02', active: false, tags: [] },
    ],
    subfolder2: [
        { name: 'file3.csv', createdAt: '2024-11-03', active: true, tags: ['stocks', 'analysis'] },
    ],
};

// Mock fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockData),
    })
);

describe('ManageReport Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('renders the component and displays the report data', async () => {
        render(<ManageReport />);

        // Verify the page heading
        expect(screen.getByText('DashBoard')).toBeInTheDocument();

        // Wait for the data to load
        await waitFor(() => {
            expect(screen.getByText('file1.csv')).toBeInTheDocument();
            expect(screen.getByText('file2.csv')).toBeInTheDocument();
            expect(screen.getByText('file3.csv')).toBeInTheDocument();
        });
    });

    it('toggles the active status of a report item', async () => {
        render(<ManageReport />);

        // Wait for the data to load
        await waitFor(() => {
            expect(screen.getByText('file1.csv')).toBeInTheDocument();
        });

        // Find the toggle button for 'file1.csv'
        const toggleButton = screen.getAllByRole('checkbox')[0];

        // Check initial state (active)
        expect(toggleButton).toBeChecked();

        // Click the toggle button
        fireEvent.click(toggleButton);

        // Check the updated state (inactive)
        expect(toggleButton).not.toBeChecked();
    });

    it('updates the tags of a report item', async () => {
        render(<ManageReport />);

        // Wait for the data to load
        await waitFor(() => {
            expect(screen.getByText('file1.csv')).toBeInTheDocument();
        });

        // Simulate updating tags for 'file1.csv'
        const tagInput = screen.getByPlaceholderText('Add a tag');
        fireEvent.change(tagInput, { target: { value: 'newTag' } });
        fireEvent.keyDown(tagInput, { key: 'Enter', code: 'Enter' });

        // Verify the updated tag is displayed
        expect(screen.getByText('newTag')).toBeInTheDocument();
    });
});
