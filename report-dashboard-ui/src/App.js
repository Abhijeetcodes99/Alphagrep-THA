// React and Router Imports
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Component Imports
import Body from './components/Body';

// Context Import
import { FileProvider } from './Context/FileContext';

// Styles Import
import './App.css';


const App = () => {
    return (
        // Provide file data context to the entire app
        <FileProvider>
            <div className="alphagrep-body">
                {/* Set up the router for navigation */}
                <Router>
                    <Body />
                </Router>
            </div>
        </FileProvider>
    );
};

export default App;
