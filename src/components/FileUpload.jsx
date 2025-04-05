import { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";

const FileUpload = ({ onFilesSelected }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFile(files[0]);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    if (!file) return;
    const validTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a CSV or Excel file");
      return;
    }
    setFile(file);

    if (file.type === 'text/csv') {
      const text = await file.text();
      const urls = text.split('\n').map(url => url.trim()).filter(url => url.startsWith('http'));
      onFilesSelected(urls);
    } else {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const urls = rows.flat().map(cell => String(cell).trim()).filter(url => url.startsWith('http'));
      onFilesSelected(urls);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFilesSelected([]);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Drag and drop your file here</p>
              <p className="mt-1">or</p>
              <label className="mt-2 inline-block">
                <span className="rounded-md px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-50 cursor-pointer">
                  Browse files
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">Supported formats: CSV, XLSX, XLS</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <File className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} className="text-gray-500 hover:text-red-500">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
