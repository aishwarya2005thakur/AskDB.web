
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import { simulateUploadPDF, ProgressStatus } from "@/services/pdfService";
import ProgressIndicator from "@/components/ProgressIndicator";

const PDFQueryConverter = () => {
  // PDF Upload States
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<ProgressStatus>({
    progress: 0,
    status: 'idle',
  });
  
  // Query States
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [isQueryLoading, setIsQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState("");

  // PDF file handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast.error("Please select a PDF file");
        return;
      }
      setPdfFile(file);
      toast.info(`Selected file: ${file.name}`);
      setUploadStatus({
        progress: 0,
        status: 'idle',
        message: 'File selected, ready to upload'
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'application/pdf') {
        toast.error("Please select a PDF file");
        return;
      }
      setPdfFile(file);
      toast.info(`Selected file: ${file.name}`);
      setUploadStatus({
        progress: 0,
        status: 'idle',
        message: 'File selected, ready to upload'
      });
    }
  };

  const handleUploadPDF = async () => {
    if (!pdfFile) {
      toast.error('Please select a PDF file first');
      return;
    }

    try {
      // Using the simulation function for now
      // Replace with the real uploadPDF function when backend is ready
      const response = await simulateUploadPDF(pdfFile, (status) => {
        setUploadStatus(status);
      });
      
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
  };

  const handleResetPDF = () => {
    setPdfFile(null);
    setUploadStatus({
      progress: 0,
      status: 'idle',
      message: 'Ready to upload'
    });
  };

  // Natural language query handling
  const generateSqlQuery = async () => {
    if (!naturalLanguageQuery.trim()) {
      toast.error("Please enter a natural language query");
      return;
    }

    setIsQueryLoading(true);
    setQueryError("");
    
    try {
      // In production, replace with your actual API endpoint
      const response = await fetch("/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: naturalLanguageQuery }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSqlQuery(data.sql || "");
      toast.success("SQL query generated successfully");
    } catch (err) {
      console.error("Failed to generate SQL query:", err);
      setQueryError("Failed to generate SQL query. Please try again.");
      toast.error("Failed to generate SQL query");
      
      // For demo purposes, generate a mock SQL response
      // Remove this in production
      setSqlQuery(`SELECT * FROM documents WHERE content LIKE '%${naturalLanguageQuery}%'`);
    } finally {
      setIsQueryLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery)
      .then(() => toast.success("SQL query copied to clipboard"))
      .catch(() => toast.error("Failed to copy SQL query"));
  };

  const isUploading = uploadStatus.status === 'uploading' || uploadStatus.status === 'processing';

  return (
    <div className="w-full space-y-8">
      {/* PDF Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>PDF Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              pdfFile ? 'border-pdf-primary bg-pdf-secondary/20' : 'border-border'
            } cursor-pointer transition-all hover:border-pdf-primary/70 hover:bg-pdf-secondary/10`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('pdfFileInput')?.click()}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 rounded-full bg-pdf-secondary/50">
                <FileText className="w-10 h-10 text-pdf-primary" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-medium">
                  {pdfFile ? pdfFile.name : "Drag & drop your PDF here"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {pdfFile ? `${(pdfFile.size / 1024).toFixed(1)} KB` : "or click to browse files"}
                </p>
              </div>
              
              <input
                id="pdfFileInput"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />
            </div>
          </div>
          
          {pdfFile && (
            <div className="space-y-4">
              <ProgressIndicator status={uploadStatus} />
              
              <div className="flex justify-end space-x-4 pt-2">
                <Button
                  variant="outline"
                  onClick={handleResetPDF}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUploadPDF}
                  disabled={isUploading}
                  className="bg-pdf-primary hover:bg-pdf-primary/90"
                >
                  {isUploading ? 'Processing...' : 'Upload PDF'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Natural Language Query Section */}
      <Card>
        <CardHeader>
          <CardTitle>Natural Language to SQL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nlQuery" className="text-sm font-medium">
              Enter your question in natural language
            </label>
            <Input
              id="nlQuery"
              placeholder="e.g., Find all documents containing 'budget reports'"
              value={naturalLanguageQuery}
              onChange={(e) => setNaturalLanguageQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={generateSqlQuery} 
              disabled={isQueryLoading || !naturalLanguageQuery.trim()}
            >
              {isQueryLoading ? "Generating..." : "Generate SQL"}
            </Button>
          </div>

          {sqlQuery && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="sqlResult" className="text-sm font-medium">
                  Generated SQL Query
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="h-8"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <Textarea
                id="sqlResult"
                value={sqlQuery}
                readOnly
                className="w-full font-mono text-sm min-h-[100px]"
              />
            </div>
          )}

          {queryError && (
            <p className="text-red-500 text-sm">{queryError}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFQueryConverter;
