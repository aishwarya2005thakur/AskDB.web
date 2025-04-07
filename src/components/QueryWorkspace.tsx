import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Upload, FileText, Play, Save, Database, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import FileDropzone from "./FileDropzone";
import QueryResultDisplay from "./QueryResultDisplay";

interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
}

interface SavedQuery {
  query: string;
  natural: string;
  timestamp: number;
}

const QueryWorkspace = () => {
  // File states
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Query states
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [isGeneratingSql, setIsGeneratingSql] = useState(false);
  const [isRunningQuery, setIsRunningQuery] = useState(false);
  const [queryResults, setQueryResults] = useState<Record<string, any>[]>([]);
  const [queryError, setQueryError] = useState<string | null>(null);
  
  // History states
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);

  // Refs for scroll targets
  const uploadSectionRef = useRef<HTMLDivElement>(null);
  const querySectionRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      toast.info(`Selected file: ${selectedFile.name}`);
    }
  };

  const handleUploadPDF = async () => {
    if (!file) {
      toast.error('Please select a PDF file first');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    
    try {
      // Simulate upload with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`${file.name} uploaded successfully!`);
      setUploadSuccess(true);
      
      // Auto-scroll to query section after upload
      setTimeout(() => {
        querySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload PDF';
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const generateSqlQuery = async () => {
    if (!naturalLanguageQuery.trim()) {
      toast.error("Please enter a natural language query");
      return;
    }

    if (!uploadSuccess) {
      toast.error("Please upload a PDF first");
      return;
    }

    setIsGeneratingSql(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock SQL query generation
      const generatedSql = `SELECT * FROM documents WHERE content LIKE '%${naturalLanguageQuery.replace(/'/g, "''")}%'`;
      setSqlQuery(generatedSql);
      toast.success("SQL query generated successfully");
    } catch (err) {
      console.error("Failed to generate SQL query:", err);
      toast.error("Failed to generate SQL query");
    } finally {
      setIsGeneratingSql(false);
    }
  };

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      toast.error("Please generate or write an SQL query first");
      return;
    }

    setIsRunningQuery(true);
    setQueryError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock query execution result
      const results = [
        { id: 1, title: "Document 1", content: "Sample content from PDF", created_at: "2023-10-15" },
        { id: 2, title: "Document 2", content: "Another PDF content example", created_at: "2023-10-16" },
        { id: 3, title: "Document 3", content: "More sample text from document", created_at: "2023-10-17" },
        { id: 4, title: "Report", content: "Quarterly financial results", created_at: "2023-10-18" },
        { id: 5, title: "Invoice", content: "Payment details for services", created_at: "2023-10-19" },
        { id: 6, title: "Contract", content: "Legal agreement between parties", created_at: "2023-10-20" },
      ];
      
      setQueryResults(results);
      toast.success("Query executed successfully");
    } catch (error) {
      console.error("Error executing query:", error);
      setQueryError("Failed to retrieve results. Please check your query or try again.");
      toast.error("Failed to execute query");
    } finally {
      setIsRunningQuery(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery)
      .then(() => toast.success("SQL query copied to clipboard"))
      .catch(() => toast.error("Failed to copy SQL query"));
  };
  
  const copyResults = () => {
    if (!queryResults) return;
    
    // Convert results to JSON string
    const resultsText = JSON.stringify(queryResults, null, 2);
    
    navigator.clipboard.writeText(resultsText)
      .then(() => toast.success("Results copied to clipboard"))
      .catch(() => toast.error("Failed to copy results"));
  };
  
  const saveQuery = () => {
    if (!sqlQuery.trim() || !naturalLanguageQuery.trim()) {
      toast.error("Please generate a query first");
      return;
    }
    
    const newSavedQuery: SavedQuery = {
      query: sqlQuery,
      natural: naturalLanguageQuery,
      timestamp: Date.now()
    };
    
    setSavedQueries(prev => [newSavedQuery, ...prev]);
    toast.success("Query saved");
  };
  
  const loadSavedQuery = (saved: SavedQuery) => {
    setNaturalLanguageQuery(saved.natural);
    setSqlQuery(saved.query);
    toast.info("Loaded saved query");
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {/* PDF Upload Section */}
      <div id="upload-section" ref={uploadSectionRef}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-pdf-primary" />
              PDF Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileDropzone 
              onFileSelect={handleFileSelect} 
              disabled={isUploading}
            />
            
            {file && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-md bg-pdf-secondary">
                      <FileText className="w-5 h-5 text-pdf-primary" />
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
                  
                  {uploadSuccess && (
                    <div className="flex items-center text-green-500 text-sm animate-fade-in">
                      <div className="mr-1">✅</div>
                      Uploaded successfully
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleUploadPDF}
                    disabled={isUploading || uploadSuccess}
                    className="bg-pdf-primary hover:bg-pdf-primary/90"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : uploadSuccess ? (
                      "Uploaded"
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Natural Language to SQL Section */}
      <div id="query-section" ref={querySectionRef}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-pdf-primary" />
              Natural Language to SQL
            </CardTitle>
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
                disabled={isGeneratingSql || !naturalLanguageQuery.trim() || !uploadSuccess}
              >
                {isGeneratingSql ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating SQL...
                  </>
                ) : (
                  "Generate SQL"
                )}
              </Button>
            </div>

            {sqlQuery && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex justify-between items-center">
                  <label htmlFor="sqlResult" className="text-sm font-medium">
                    SQL Query
                  </label>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyToClipboard}
                      className="h-8"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={saveQuery}
                      className="h-8"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="sqlResult"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="w-full font-mono text-sm min-h-[100px]"
                />
                
                <div className="flex justify-center pt-2">
                  <Button 
                    onClick={executeQuery} 
                    disabled={isRunningQuery || !sqlQuery.trim()}
                    className="bg-pdf-primary hover:bg-pdf-primary/90"
                  >
                    {isRunningQuery ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running query...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Run Query
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Query Results - Always show the section */}
      <div id="results-section">
        <QueryResultDisplay
          results={queryResults}
          isLoading={isRunningQuery}
          error={queryError}
          onCopyResults={copyResults}
          initialMessage="Enter and run a query to see results here"
        />
      </div>
      
      {/* Saved Queries */}
      {savedQueries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Save className="mr-2 h-5 w-5 text-pdf-primary" />
              Saved Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {savedQueries.map((saved, index) => (
                  <div 
                    key={index} 
                    className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => loadSavedQuery(saved)}
                  >
                    <p className="font-medium text-sm truncate">{saved.natural}</p>
                    <p className="text-xs font-mono text-muted-foreground truncate">{saved.query}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(saved.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QueryWorkspace;
