
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadResponse } from '@/services/pdfService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PDFResultViewProps {
  result: UploadResponse;
  fileName: string;
  onReset: () => void;
}

interface SearchMatch {
  text: string;
  context: string;
  position: number;
}

const PDFResultView: React.FC<PDFResultViewProps> = ({
  result,
  fileName,
  onReset
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [tableResults, setTableResults] = useState<SearchMatch[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      setTableResults([]);
      return;
    }
    
    // Simple search implementation - in a real app, this might call an API
    if (result.results?.text) {
      const text = result.results.text.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      if (text.includes(query)) {
        // Extract a snippet of text around the search query for context
        const index = text.indexOf(query);
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + query.length + 50);
        let snippet = text.substring(start, end);
        
        // Add ellipsis if we're not at the beginning or end
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        
        setSearchResults(snippet);

        // Find all occurrences for table view
        const matches: SearchMatch[] = [];
        let position = 0;
        let currentIndex = text.indexOf(query);
        
        while (currentIndex !== -1 && matches.length < 10) { // Limit to 10 matches
          const matchStart = Math.max(0, currentIndex - 30);
          const matchEnd = Math.min(text.length, currentIndex + query.length + 30);
          let context = text.substring(matchStart, matchEnd);
          
          // Add ellipsis for context
          if (matchStart > 0) context = '...' + context;
          if (matchEnd < text.length) context = context + '...';
          
          // Get the actual matched text in original case
          const originalText = result.results.text.substring(
            currentIndex,
            currentIndex + query.length
          );
          
          matches.push({
            text: originalText,
            context: context,
            position: currentIndex
          });
          
          position = currentIndex + 1;
          currentIndex = text.indexOf(query, position);
        }
        
        setTableResults(matches);
      } else {
        setSearchResults("No matches found for your query.");
        setTableResults([]);
      }
    }
  };

  if (!result.success || !result.results) {
    return (
      <Card className="w-full bg-destructive/10 border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Error Processing PDF
          </CardTitle>
          <CardDescription>
            There was an error processing your file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{result.message}</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onReset}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-pdf-primary" />
              {fileName}
            </CardTitle>
            <CardDescription>
              Successfully processed PDF document
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
            {result.results.pageCount} {result.results.pageCount === 1 ? 'page' : 'pages'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Document Details</h3>
          <div className="bg-muted/50 rounded-md p-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Document ID:</span>
              <span className="font-mono text-xs">{result.documentId}</span>
              
              {result.results.metadata && Object.entries(result.results.metadata).map(([key, value]) => (
                <React.Fragment key={key}>
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span>{typeof value === 'string' ? value : JSON.stringify(value)}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        {/* Search Box */}
        <div className="my-4">
          <h3 className="text-sm font-medium mb-2">Search in Document</h3>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your query..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-pdf-primary hover:bg-pdf-primary/90"
            >
              Search
            </Button>
          </div>
          
          {searchResults && (
            <div className="mt-3 p-3 bg-muted/30 border rounded-md">
              <p className="text-sm font-medium mb-1">Search Results:</p>
              <p className="text-sm">{searchResults}</p>
            </div>
          )}
        </div>
        
        {/* Table View for Search Results */}
        {tableResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">All Matches</h3>
            <div className="border rounded-md">
              <ScrollArea className="h-64">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">#</TableHead>
                      <TableHead className="w-24">Match</TableHead>
                      <TableHead>Context</TableHead>
                      <TableHead className="w-24 text-right">Position</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableResults.map((match, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-semibold text-pdf-primary">
                          {match.text}
                        </TableCell>
                        <TableCell className="text-sm">{match.context}</TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {match.position}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        )}
        
        {result.results.text && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-medium mb-2">Extracted Text</h3>
              <div className="max-h-40 overflow-y-auto bg-muted/50 rounded-md p-3 text-sm">
                <p className="whitespace-pre-line">{result.results.text}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onReset}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Upload Another
        </Button>
        <Button className="w-full bg-pdf-primary hover:bg-pdf-primary/90">
          <Download className="mr-2 h-4 w-4" />
          Download Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PDFResultView;
