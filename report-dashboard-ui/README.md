
# Dynamic Report Dashboard Interface

## Overview
A React-based dashboard for viewing and managing dynamic CSV reports with features like sorting, filtering, and manual grouping using AG Grid. The application supports responsive design and efficient data handling.

## Tech Stack
- **Frontend**: React.js
- **Libraries**: AG Grid, Material UI, PapaParse
- **Folder Structure**: CSV files are located in `/folder` (e.g., `a.csv`, `b.csv`).

## Features
- Dynamic loading of CSV files from the `/folder` directory.
- Manual grouping, sorting, and filtering of report data using AG Grid.
- File upload for adding new CSV reports dynamically.

## Prerequisites
- Node.js and npm installed

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd report-dashboard-ui
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run start
   ```

4. **Access the Application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```



## Future Enhancements
- Add user authentication for restricted access.
- Export filtered data as CSV.
- Support additional file formats (e.g., Excel).
