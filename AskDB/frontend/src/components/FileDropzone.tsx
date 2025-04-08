
import React, { useState, useRef, useCallback } from "react";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
  accept?: string;
  maxFiles?: number;
  className?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelect,
  disabled = false,
  accept = ".pdf",
  maxFiles = 1,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      return;
    }
    
    const filesToUpload = pdfFiles.slice(0, maxFiles);
    onFileSelect(filesToUpload);
  }, [disabled, maxFiles, onFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFileSelect(files.slice(0, maxFiles));
    }
  }, [maxFiles, onFileSelect]);

  const handleButtonClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all",
        isDragging ? "border-pdf-primary bg-pdf-secondary/30" : "border-border bg-background/50",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:border-pdf-primary/70 hover:bg-pdf-secondary/20",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 rounded-full bg-pdf-secondary/50">
          {isDragging ? (
            <FileText className="w-10 h-10 text-pdf-primary" />
          ) : (
            <Upload className="w-10 h-10 text-pdf-primary" />
          )}
        </div>
        
        <div className="text-center">
          <p className="text-lg font-medium">
            {isDragging ? "Drop your PDF here" : "Drag & drop your PDF here"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse files
          </p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="hidden"
          multiple={maxFiles > 1}
        />
      </div>
    </div>
  );
};

export default FileDropzone;
