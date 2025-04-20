
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const NaturalLanguageQueryGenerator = () => {
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSqlQuery = async () => {
    if (!naturalLanguageQuery.trim()) {
      toast.error("Please enter a natural language query");
      return;
    }

    setIsLoading(true);
    setError("");
    
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
      setError("Failed to generate SQL query. Please try again.");
      toast.error("Failed to generate SQL query");
      
      // For demo purposes, generate a mock SQL response
      // Remove this in production
      setSqlQuery(`SELECT * FROM documents WHERE content LIKE '%${naturalLanguageQuery}%'`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery)
      .then(() => toast.success("SQL query copied to clipboard"))
      .catch(() => toast.error("Failed to copy SQL query"));
  };

  return (
    <div className="w-full space-y-6">
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
              disabled={isLoading || !naturalLanguageQuery.trim()}
            >
              {isLoading ? "Generating..." : "Generate SQL"}
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

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NaturalLanguageQueryGenerator;
