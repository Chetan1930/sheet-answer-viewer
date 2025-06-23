
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import AnswerDisplay from '@/components/AnswerDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const HARDCODED_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1TgpCE8snDdR0AAUtzDPhyVukxDMME8YndQYxdm01uoE/gviz/tq?tqx=out:json';

  useEffect(() => {
    const fetchHardcodedData = async () => {
      try {
        console.log('Fetching hardcoded Google Sheets data...');
        const response = await axios.get(HARDCODED_SHEET_URL);
        
        // Parse the JSON response (remove the callback wrapper)
        const jsonData = JSON.parse(response.data.substring(47).slice(0, -2));
        const columns = jsonData.table.cols.map((col: any) => col.label);
        const rowData = jsonData.table.rows.map((row: any) => {
          const obj: any = {};
          row.c.forEach((cell: any, index: number) => {
            obj[columns[index]] = cell ? cell.v : "";
          });
          return obj;
        });
        
        console.log('Loaded hardcoded Google Sheets data:', rowData);
        setSheetData(rowData);
      } catch (error) {
        console.error('Error loading hardcoded Google Sheets data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHardcodedData();
  }, []);

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
                  <p className="text-muted-foreground">Loading your data...</p>
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
            <p>Data automatically loaded from Google Sheets. You can still upload additional files if needed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
