
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import QueryResultDisplay from "./QueryResultDisplay";

const SqlQueryExecutor = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [isRunningQuery, setIsRunningQuery] = useState(false);
  const [queryResults, setQueryResults] = useState<Record<string, any>[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      toast.error("Please enter an SQL query first");
      return;
    }

    setIsRunningQuery(true);
    setQueryError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock query execution result
      const results = [
        { id: 1, table_name: "users", column_count: 5, row_count: 120 },
        { id: 2, table_name: "documents", column_count: 8, row_count: 45 },
        { id: 3, table_name: "categories", column_count: 3, row_count: 12 },
        { id: 4, table_name: "tags", column_count: 2, row_count: 30 },
        { id: 5, table_name: "permissions", column_count: 4, row_count: 8 },
      ];
      
      setQueryResults(results);
      toast.success("Query executed successfully");
    } catch (error) {
      console.error("Error executing query:", error);
      setQueryError("Failed to retrieve results. Please check your query syntax.");
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="sqlQuery" className="text-sm font-medium">
            SQL Query
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
          id="sqlQuery"
          placeholder="SELECT * FROM documents WHERE..."
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="min-h-[150px] font-mono text-sm"
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
      
      {/* Query Results */}
      {(queryResults || isRunningQuery || queryError) && (
        <QueryResultDisplay
          results={queryResults}
          isLoading={isRunningQuery}
          error={queryError}
          onCopyResults={copyResults}
        />
      )}
    </div>
  );
};

export default SqlQueryExecutor;
