
import { toast } from "sonner";

// Define the base URL for our FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

// Define types for our API responses
export interface UploadResponse {
  success: boolean;
  message: string;
  documentId?: string;
  results?: {
    pageCount: number;
    text?: string;
    metadata?: Record<string, any>;
  };
}

export interface ProgressStatus {
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  message?: string;
}

/**
 * Uploads a PDF file to the FastAPI backend
 */
export const uploadPDF = async (
  file: File, 
  onProgress?: (status: ProgressStatus) => void
): Promise<UploadResponse> => {
  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    // Set initial progress status
    onProgress?.({ 
      progress: 0, 
      status: 'uploading', 
      message: 'Starting upload...' 
    });
    
    // Use XMLHttpRequest for upload progress tracking
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress?.({ 
            progress: percentComplete, 
            status: 'uploading', 
            message: `Uploading: ${percentComplete}%` 
          });
        }
      });
      
      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          onProgress?.({ 
            progress: 100, 
            status: 'complete',
            message: 'Upload completed!' 
          });
          
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(new Error('Failed to parse server response'));
          }
        } else {
          onProgress?.({ 
            progress: 0, 
            status: 'error',
            message: `Upload failed: ${xhr.statusText}` 
          });
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      });
      
      // Handle errors
      xhr.addEventListener('error', () => {
        onProgress?.({ 
          progress: 0, 
          status: 'error',
          message: 'Network error occurred during upload' 
        });
        reject(new Error('Network error occurred during upload'));
      });
      
      // Handle aborts
      xhr.addEventListener('abort', () => {
        onProgress?.({ 
          progress: 0, 
          status: 'error',
          message: 'Upload was aborted' 
        });
        reject(new Error('Upload was aborted'));
      });
      
      // Open and send the request
      xhr.open('POST', `${API_BASE_URL}/upload-pdf`, true);
      xhr.send(formData);
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    toast.error(errorMessage);
    onProgress?.({ 
      progress: 0, 
      status: 'error',
      message: errorMessage 
    });
    return {
      success: false,
      message: errorMessage
    };
  }
};

/**
 * Simulates the API for local development
 * This can be removed once the actual FastAPI backend is connected
 */
export const simulateUploadPDF = async (
  file: File, 
  onProgress?: (status: ProgressStatus) => void
): Promise<UploadResponse> => {
  return new Promise((resolve) => {
    // Simulate upload progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      onProgress?.({ 
        progress, 
        status: 'uploading', 
        message: `Uploading: ${progress}%` 
      });
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        
        // Simulate processing
        onProgress?.({ 
          progress: 100, 
          status: 'processing', 
          message: 'Processing PDF...' 
        });
        
        // Simulate completion after some time
        setTimeout(() => {
          onProgress?.({ 
            progress: 100, 
            status: 'complete', 
            message: 'Upload complete!' 
          });
          
          resolve({
            success: true,
            message: 'PDF successfully processed',
            documentId: `doc-${Date.now()}`,
            results: {
              pageCount: Math.floor(Math.random() * 10) + 1,
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
              metadata: {
                title: file.name.replace('.pdf', ''),
                author: 'Sample Author',
                creationDate: new Date().toISOString()
              }
            }
          });
        }, 2000);
      }
    }, 200);
  });
};
