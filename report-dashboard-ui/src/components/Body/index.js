// React and Router Imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Component Imports
import ManageReport from '../ManageReport';
import ViewReport from '../ViewReport';

// Route Path Imports
import { ROUTES} from "../../Constant";

/**
 * Body Component
 * Defines the main routing structure of the application using route constants.
 */
const Body = () => {
    return (
        <Routes>
            {/* Route for the ManageReport page (Home) */}
            <Route path={ROUTES.MANAGE_REPORT} element={<ManageReport />} />

            {/* Route for viewing a specific report with subfolder and fileName as URL parameters */}
            <Route path={ROUTES.VIEW_REPORT} element={<ViewReport />} />
        </Routes>
    );
};

export default Body;
