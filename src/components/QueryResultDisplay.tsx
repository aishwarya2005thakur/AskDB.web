
import { useEffect, useRef } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface QueryResultDisplayProps {
  results: Record<string, any>[] | null;
  isLoading: boolean;
  error: string | null;
  onCopyResults?: () => void;
}

const QueryResultDisplay = ({ 
  results, 
  isLoading, 
  error,
  onCopyResults
}: QueryResultDisplayProps) => {
  const resultRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to results when they appear
  useEffect(() => {
    if ((results || error) && !isLoading && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results, isLoading, error]);
  
  // Get column names from the first result object
  const columns = results && results.length > 0 
    ? Object.keys(results[0]) 
    : [];

  return (
    <div ref={resultRef} className="w-full animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5 text-pdf-primary" />
            Query Results
          </CardTitle>
          {results && results.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onCopyResults}
            >
              Copy Results
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-pdf-primary mb-2" />
              <p className="text-muted-foreground">Running query...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-destructive">
              <AlertCircle className="h-8 w-8 mb-2" />
              <p className="font-medium">{error}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Please check your query or try again.
              </p>
            </div>
          ) : results && results.length > 0 ? (
            <ScrollArea className="w-full overflow-auto rounded-md border">
              <div className="min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableHead 
                          key={index} 
                          className={cn(
                            "whitespace-nowrap font-medium",
                            index === 0 ? "sticky left-0 bg-background z-10" : ""
                          )}
                        >
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                          <TableCell 
                            key={colIndex} 
                            className={cn(
                              "whitespace-nowrap",
                              colIndex === 0 ? "sticky left-0 bg-background z-10" : ""
                            )}
                          >
                            {row[column]?.toString() || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No results found. Try a different query.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QueryResultDisplay;
