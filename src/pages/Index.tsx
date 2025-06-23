
import React, { useState } from 'react';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import AnswerDisplay from '@/components/AnswerDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDataLoad = (data: any[]) => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setSheetData(data);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* File Upload Section */}
          <section>
            <FileUploader onDataLoad={handleDataLoad} isLoading={isLoading} />
          </section>

          {/* Loading State */}
          {isLoading && (
            <Card className="w-full">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                  <p className="text-muted-foreground">Processing your data...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Answer Display Section */}
          {!isLoading && (
            <section>
              <AnswerDisplay data={sheetData} />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Upload your Excel files or connect to Google Sheets to get started</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
