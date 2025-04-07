
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, DownloadCloud, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QueryResultTable from './QueryResultTable';

interface QueryResultDisplayProps {
  results: Record<string, any>[] | null;
  isLoading: boolean;
  error: string | null;
  onCopyResults: () => void;
  initialMessage?: string;
}

const QueryResultDisplay = ({ 
  results, 
  isLoading, 
  error, 
  onCopyResults,
  initialMessage = "No results to display yet"
}: QueryResultDisplayProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Query Results</CardTitle>
        {results && results.length > 0 && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onCopyResults}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <DownloadCloud className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pdf-primary mb-4"></div>
            <p className="text-muted-foreground">Running your query...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            <div className="flex items-start">
              <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        ) : results && results.length > 0 ? (
          <div>
            <p className="text-muted-foreground mb-2">Found {results.length} results</p>
            <QueryResultTable data={results} />
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>{initialMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QueryResultDisplay;
