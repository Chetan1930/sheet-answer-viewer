
import React, { useCallback } from 'react';
import { Upload, FileSpreadsheet, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as XLSX from 'xlsx';

interface FileUploaderProps {
  onDataLoad: (data: any[]) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onDataLoad, isLoading }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        console.log('Loaded Excel data:', jsonData);
        onDataLoad(jsonData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  }, [onDataLoad]);

  const handleGoogleSheetUrl = (url: string) => {
    // Extract sheet ID from Google Sheets URL
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      const sheetId = match[1];
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      
      fetch(csvUrl)
        .then(response => response.text())
        .then(csv => {
          const lines = csv.split('\n');
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = values[index] || '';
            });
            return obj;
          }).filter(row => Object.values(row).some(val => val));
          
          console.log('Loaded Google Sheets data:', data);
          onDataLoad(data);
        })
        .catch(error => {
          console.error('Error loading Google Sheets data:', error);
        });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <FileSpreadsheet className="h-6 w-6 text-blue-600" />
          Load Your Data
        </CardTitle>
        <CardDescription>
          Upload an Excel file or connect to Google Sheets to view your answers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="excel" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="excel" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Excel File
            </TabsTrigger>
            <TabsTrigger value="sheets" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Google Sheets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="excel" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="excel-file">Upload Excel File</Label>
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="cursor-pointer"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Supported formats: .xlsx, .xls, .csv
            </p>
          </TabsContent>
          
          <TabsContent value="sheets" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sheets-url">Google Sheets URL</Label>
              <div className="flex gap-2">
                <Input
                  id="sheets-url"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  disabled={isLoading}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      handleGoogleSheetUrl(target.value);
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.getElementById('sheets-url') as HTMLInputElement;
                    if (input.value) {
                      handleGoogleSheetUrl(input.value);
                    }
                  }}
                  disabled={isLoading}
                >
                  Load
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Make sure your Google Sheet is publicly accessible
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FileUploader;
