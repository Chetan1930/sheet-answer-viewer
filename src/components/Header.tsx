
import React from 'react';
import { BarChart3, FileSpreadsheet } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sheet Answer Viewer</h1>
              <p className="text-sm text-gray-600">Analyze your data in beautiful, readable format</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Excel & Google Sheets</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
