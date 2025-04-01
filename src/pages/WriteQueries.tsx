
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SqlQueryExecutor from "@/components/SqlQueryExecutor";

const WriteQueries = () => {
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
              <SqlQueryExecutor />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default WriteQueries;
