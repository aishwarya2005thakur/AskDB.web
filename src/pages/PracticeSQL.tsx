
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Database, Loader2 } from "lucide-react";

const PracticeSQL = () => {
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Practice SQL
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Improve your SQL skills with our interactive environment. Practice writing queries and see the results instantly.
            </p>
          </div>
          
          <Tabs defaultValue="exercise1" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-6">
              <TabsTrigger value="exercise1">Exercise 1</TabsTrigger>
              <TabsTrigger value="exercise2">Exercise 2</TabsTrigger>
              <TabsTrigger value="exercise3">Exercise 3</TabsTrigger>
            </TabsList>
            
            <TabsContent value="exercise1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-pdf-primary" />
                    Exercise 1: Basic SELECT
                  </CardTitle>
                  <CardDescription>
                    Practice basic SELECT statements to retrieve document data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-slate-100 rounded-md">
                    <p className="font-medium">Task:</p>
                    <p>Write a query to select all columns from the document table.</p>
                  </div>
                  <Textarea
                    placeholder="SELECT * FROM..."
                    className="min-h-[150px] font-mono"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <div className="flex justify-center mt-4">
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Answer"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expected Output</CardTitle>
                  <CardDescription>
                    Sample data from document table
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[150px] rounded-md border p-4 overflow-auto">
                    <pre className="text-sm">
                      {`id | title        | content                 | date_added
-------------------------------------------------
1  | Report.pdf   | Annual financial... | 2023-01-15
2  | Invoice.pdf  | Invoice #12345...   | 2023-02-20
3  | Contract.pdf | Agreement between... | 2023-03-05`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercise2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-pdf-primary" />
                    Exercise 2: WHERE Clauses
                  </CardTitle>
                  <CardDescription>
                    Learn to filter data with WHERE clauses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Complete Exercise 1 to unlock this content</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercise3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-pdf-primary" />
                    Exercise 3: JOIN Operations
                  </CardTitle>
                  <CardDescription>
                    Master joining tables for complex data retrieval
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">Complete Exercise 2 to unlock this content</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PracticeSQL;
