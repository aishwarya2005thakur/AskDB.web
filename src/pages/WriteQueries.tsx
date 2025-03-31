
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const WriteQueries = () => {
  const [query, setQuery] = useState("");
  
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-white to-pdf-background py-12 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Write SQL Queries
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Craft your SQL queries for PDF data extraction and analysis. Write complex queries to extract specific information from your documents.
            </p>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Query Editor</CardTitle>
              <CardDescription>
                Write your SQL query for document analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="SELECT * FROM document WHERE..."
                className="min-h-[200px] font-mono"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex justify-center mt-4">
                <Button>
                  Execute Query
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                View your query results here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[200px] rounded-md border border-dashed flex items-center justify-center">
                <p className="text-gray-500">Execute a query to see results</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default WriteQueries;
