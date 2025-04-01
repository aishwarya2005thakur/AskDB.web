
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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
      // In a real application, this would be an actual API call
      // For demonstration, we'll simulate a response
      // Replace this with your actual API endpoint
      const response = await simulateQuery(query);
      setResults(response);
      toast.success("Query executed successfully");
    } catch (error) {
      console.error("Error executing query:", error);
      toast.error("Failed to execute query");
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate API call (replace with actual API in production)
  const simulateQuery = async (sql: string): Promise<QueryResult> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demonstration, generate mock results based on the query
    if (sql.toLowerCase().includes("select") && sql.toLowerCase().includes("from")) {
      // Mock data for SELECT query
      return {
        columns: ["id", "title", "content", "created_at"],
        rows: [
          { id: 1, title: "Document 1", content: "Sample content from PDF", created_at: "2023-10-15" },
          { id: 2, title: "Document 2", content: "Another PDF content example", created_at: "2023-10-16" },
          { id: 3, title: "Document 3", content: "More sample text from document", created_at: "2023-10-17" },
        ]
      };
    } else if (sql.toLowerCase().includes("count")) {
      // Mock data for COUNT query
      return {
        columns: ["count"],
        rows: [{ count: 3 }]
      };
    } else {
      // Default mock data
      return {
        columns: ["result"],
        rows: [{ result: "Query executed. Affected rows: 2" }]
      };
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
          <Button onClick={executeQuery} disabled={isLoading}>
            {isLoading ? "Executing..." : "Execute Query"}
          </Button>
        </div>
      </div>

      {results && (
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {results.columns.map((column, index) => (
                      <TableHead key={index}>{column}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {results.columns.map((column, colIndex) => (
                        <TableCell key={colIndex}>{row[column]?.toString() || "-"}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SqlQueryExecutor;
