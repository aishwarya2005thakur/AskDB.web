
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, Loader2, Play } from "lucide-react";
import QueryResultTable from "./QueryResultTable";

interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
}

const SqlQueryExecutor = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<QueryResult | null>(null);

  const executeQuery = async () => {
    if (!query.trim()) {
      toast.error("Please enter a SQL query");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demonstration, generate mock results based on the query
      if (query.toLowerCase().includes("select") && query.toLowerCase().includes("from")) {
        // Mock data for SELECT query
        setResults({
          columns: ["id", "title", "content", "created_at"],
          rows: [
            { id: 1, title: "Document 1", content: "Sample content from PDF", created_at: "2023-10-15" },
            { id: 2, title: "Document 2", content: "Another PDF content example", created_at: "2023-10-16" },
            { id: 3, title: "Document 3", content: "More sample text from document", created_at: "2023-10-17" },
            { id: 4, title: "Report", content: "Quarterly financial results", created_at: "2023-10-18" },
            { id: 5, title: "Invoice", content: "Payment details for services", created_at: "2023-10-19" },
            { id: 6, title: "Contract", content: "Legal agreement between parties", created_at: "2023-10-20" },
          ]
        });
      } else if (query.toLowerCase().includes("count")) {
        // Mock data for COUNT query
        setResults({
          columns: ["count"],
          rows: [{ count: 6 }]
        });
      } else {
        // Default mock data
        setResults({
          columns: ["result"],
          rows: [{ result: "Query executed. Affected rows: 2" }]
        });
      }
      toast.success("Query executed successfully");
    } catch (error) {
      console.error("Error executing query:", error);
      toast.error("Failed to execute query");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Enter your SQL query here..."
          className="min-h-[150px] font-mono"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex justify-center">
          <Button 
            onClick={executeQuery} 
            disabled={isLoading}
            className="bg-pdf-primary hover:bg-pdf-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Execute Query
              </>
            )}
          </Button>
        </div>
      </div>

      {(results || isLoading) && (
        <Card>
          <CardContent className="pt-6">
            <QueryResultTable 
              columns={results?.columns || []} 
              rows={results?.rows || []} 
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SqlQueryExecutor;
