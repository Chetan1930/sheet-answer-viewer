
# Sheet Answer Viewer

A modern web application for viewing and analyzing survey responses from Excel files and Google Sheets. Display individual responses in a clean, organized format with a beautiful user interface.

#Live Link 

Demo Link: https://niramayam12.netlify.app/

## Features

- **Multiple Data Sources**: Support for Excel files (.xlsx, .xls, .csv) and Google Sheets
- **Automatic Data Loading**: Pre-configured to load data from a Google Sheet automatically
- **Individual Response View**: Each person's complete set of answers displayed in organized cards
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data Processing**: Instant visualization of uploaded data
- **Clean UI**: Modern interface built with Tailwind CSS and shadcn/ui components

## Demo

The application automatically loads sample data from a Google Sheet to demonstrate functionality. You can also upload your own Excel files or connect to different Google Sheets.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd sheet-answer-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

### Loading Data

**Automatic Loading**: The app automatically loads sample data on startup from a pre-configured Google Sheet.

**Upload Excel Files**: 
- Click on the "Excel File" tab
- Select your .xlsx, .xls, or .csv file
- Data will be processed and displayed automatically

**Connect Google Sheets**:
- Click on the "Google Sheets" tab
- Paste your Google Sheets URL
- Make sure your sheet is publicly accessible
- Click "Load" to fetch the data

### Viewing Responses

- Each person's responses are displayed in individual cards
- Questions are numbered and clearly labeled
- Empty responses are indicated as "No response"
- Navigate through all responses using the scrollable interface

## Data Format

The application expects your data to be structured with:
- First row containing question headers
- Each subsequent row representing one person's complete responses
- Any number of questions/columns supported

Example structure:
```
Name | Age | Favorite Color | Comments
John | 25  | Blue          | Great survey
Jane | 30  | Red           | Very helpful
```

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests
- **XLSX** - Excel file processing
- **React Query** - Data fetching and state management

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── Header.tsx    # Application header
│   ├── FileUploader.tsx # File upload and Google Sheets integration
│   └── AnswerDisplay.tsx # Response visualization component
├── pages/
│   └── Index.tsx     # Main application page
└── App.tsx          # Application root component
```

## Configuration

### Google Sheets Integration

To connect your own Google Sheet:

1. Make sure your Google Sheet is publicly accessible
2. Get the sharing URL of your sheet
3. Use the Google Sheets tab in the application to load your data

### Customization

The application can be customized by modifying:
- `src/pages/Index.tsx` - Main application logic
- `src/components/AnswerDisplay.tsx` - Response display formatting
- `src/components/FileUploader.tsx` - Data source handling

## Building for Production

```bash
npm run build
```

The built files will be generated in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue in the repository.
