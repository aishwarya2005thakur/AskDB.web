
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SqlQueryExecutor from "@/components/SqlQueryExecutor";
import { Database } from "lucide-react";

const WriteQueries = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Write SQL Queries
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Craft your SQL queries for PDF data extraction and analysis.
            </p>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-pdf-primary" />
                Query Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SqlQueryExecutor />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WriteQueries;
