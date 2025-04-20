
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FileDropzone from './FileDropzone';
import ProgressIndicator from './ProgressIndicator';
import PDFResultView from './PDFResultView';
import { ProgressStatus, UploadResponse, simulateUploadPDF } from '@/services/pdfService';

const PDFUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<ProgressStatus>({
    progress: 0,
    status: 'idle',
  });
  const [result, setResult] = useState<UploadResponse | null>(null);

  const handleFileSelect = useCallback((files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      toast.info(`Selected file: ${selectedFile.name}`);
      
      // Reset status
      setUploadStatus({
        progress: 0,
        status: 'idle',
        message: 'File selected, ready to upload'
      });
      setResult(null);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) {
      toast.error('Please select a PDF file first');
      return;
    }

    try {
      // Using the simulation function for now
      // Replace with the real uploadPDF function when backend is ready
      const response = await simulateUploadPDF(file, (status) => {
        setUploadStatus(status);
      });
      
      setResult(response);
      
      if (response.success) {
        toast.success('PDF uploaded and processed successfully');
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload PDF';
      toast.error(errorMessage);
      setUploadStatus({
        progress: 0,
        status: 'error',
        message: errorMessage
      });
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setUploadStatus({
      progress: 0,
      status: 'idle',
      message: 'Ready to upload'
    });
    setResult(null);
  }, []);

  const isUploading = uploadStatus.status === 'uploading' || uploadStatus.status === 'processing';
  const isComplete = uploadStatus.status === 'complete' && result?.success;
  const showResult = isComplete || (uploadStatus.status === 'error' && result);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>PDF Upload & Processing</CardTitle>
          <CardDescription>
            Upload a PDF document to analyze and extract information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResult ? (
            <>
              <FileDropzone 
                onFileSelect={handleFileSelect} 
                disabled={isUploading}
              />
              
              {file && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-md bg-pdf-secondary">
                        <svg 
                          className="w-6 h-6 text-pdf-primary" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      disabled={isUploading}
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <ProgressIndicator status={uploadStatus} />
                  
                  <div className="flex justify-end space-x-4 pt-2">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading || !file}
                      className="bg-pdf-primary hover:bg-pdf-primary/90"
                    >
                      {isUploading ? 'Processing...' : 'Upload & Process'}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <PDFResultView 
              result={result!} 
              fileName={file?.name || 'Unknown file'} 
              onReset={handleReset} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFUploader;
