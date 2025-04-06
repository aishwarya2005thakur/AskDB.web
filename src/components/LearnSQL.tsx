
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Database, ExternalLink, PlayIcon } from "lucide-react";
import { toast } from "sonner";
import CodeSyntaxHighlighter from "@/components/CodeSyntaxHighlighter";

const LearnSQL = () => {
  const [activeTab, setActiveTab] = useState("select");

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Learn SQL
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Understand core SQL statements with examples and guides.
        </p>
      </div>

      <Tabs 
        defaultValue="select" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8">
          <TabsTrigger value="select">SELECT</TabsTrigger>
          <TabsTrigger value="from">FROM</TabsTrigger>
          <TabsTrigger value="where">WHERE</TabsTrigger>
          <TabsTrigger value="orderby">ORDER BY</TabsTrigger>
          <TabsTrigger value="groupby">GROUP BY</TabsTrigger>
          <TabsTrigger value="joins">JOINs</TabsTrigger>
          <TabsTrigger value="limit">LIMIT</TabsTrigger>
        </TabsList>

        {/* SELECT Statement */}
        <TabsContent value="select" className="animate-fade-in">
          <SQLConceptCard
            title="SELECT Statement"
            description="The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set. SELECT is the most commonly used statement in SQL, allowing you to retrieve specific columns of data from one or more tables. You can select all columns using * or specify individual column names separated by commas."
            syntax={`-- Syntax for selecting all columns from a table\nSELECT * FROM table_name;\n\n-- Syntax for selecting specific columns\nSELECT column1, column2 FROM table_name;`}
            example={`-- Example: Select all employees\nSELECT * FROM employees;\n\n-- Example: Select only name and email\nSELECT name, email FROM employees;`}
            outputPreview={`-- Output for SELECT name, email FROM employees:\n\nname\t\t| email\n-------------------------\nJohn Doe\t| john@example.com\nJane Smith\t| jane@example.com\nBob Johnson\t| bob@example.com`}
            w3SchoolsLink="https://www.w3schools.com/sql/sql_select.asp"
            geeksForGeeksLink="https://www.geeksforgeeks.org/sql-select-query/"
          />
        </TabsContent>

        {/* FROM Clause */}
        <TabsContent value="from" className="animate-fade-in">
          <SQLConceptCard
            title="FROM Clause"
            description="The FROM clause in SQL specifies which table to select or delete data from. It is used with SELECT, UPDATE, and DELETE statements. The FROM clause can include one or more tables, views, or derived tables. When multiple tables are specified, they are typically joined using various JOIN operations to create a combined dataset."
            syntax={`-- Basic FROM syntax\nSELECT column_name(s) FROM table_name;\n\n-- Using aliases\nSELECT column_name(s) FROM table_name AS alias_name;`}
            example={`-- Example: Select from a single table\nSELECT * FROM customers;\n\n-- Example: Using table alias\nSELECT c.name, c.email FROM customers AS c;`}
            outputPreview={`-- Output for SELECT c.name, c.email FROM customers AS c:\n\nname\t\t| email\n-------------------------\nAcme Corp\t| contact@acme.com\nWidgets Inc\t| info@widgets.com\nTech Co\t| hello@techco.com`}
            w3SchoolsLink="https://www.w3schools.com/sql/sql_from.asp"
            geeksForGeeksLink="https://www.geeksforgeeks.org/sql-from-clause/"
          />
        </TabsContent>

        {/* WHERE Clause */}
        <TabsContent value="where" className="animate-fade-in">
          <SQLConceptCard
            title="WHERE Clause"
            description="The WHERE clause is used to filter records. It extracts only those records that fulfill a specified condition. The WHERE clause is not only used in SELECT statements, it is also used in UPDATE, DELETE, etc. You can use operators such as =, >, <, >=, <=, <>, BETWEEN, LIKE, IN to test conditions in the WHERE clause."
            syntax={`-- Basic WHERE syntax\nSELECT column_name(s) FROM table_name WHERE condition;\n\n-- Multiple conditions\nSELECT column_name(s) FROM table_name WHERE condition1 AND/OR condition2;`}
            example={`-- Example: Filter by a single condition\nSELECT * FROM products WHERE price > 100;\n\n-- Example: Multiple conditions\nSELECT name, price FROM products WHERE category = 'Electronics' AND price < 500;`}
            outputPreview={`-- Output for products WHERE category = 'Electronics' AND price < 500:\n\nname\t\t\t| price\n----------------------------\nWireless Headphones\t| 199.99\nSmartwatch\t\t| 299.99\nBluetooth Speaker\t| 149.95`}
            w3SchoolsLink="https://www.w3schools.com/sql/sql_where.asp"
            geeksForGeeksLink="https://www.geeksforgeeks.org/sql-where-clause/"
          />
        </TabsContent>

        {/* ORDER BY */}
        <TabsContent value="orderby" className="animate-fade-in">
          <SQLConceptCard
            title="ORDER BY Clause"
            description="The ORDER BY keyword is used to sort the result-set in ascending or descending order. By default, ORDER BY sorts the records in ascending order. To sort in descending order, use the DESC keyword. You can sort by multiple columns - the sorting will occur first by the first column specified, then by the second, and so on."
            syntax={`-- Ascending order (default)\nSELECT column_name(s) FROM table_name ORDER BY column_name;\n\n-- Descending order\nSELECT column_name(s) FROM table_name ORDER BY column_name DESC;\n\n-- Multiple columns\nSELECT column_name(s) FROM table_name ORDER BY column1 ASC, column2 DESC;`}
            example={`-- Example: Sort products by price (ascending)\nSELECT name, price FROM products ORDER BY price;\n\n-- Example: Sort by multiple columns\nSELECT name, category, price FROM products ORDER BY category, price DESC;`}
            outputPreview={`-- Output for products ORDER BY category, price DESC:\n\ncategory\t| name\t\t\t| price\n------------------------------------------\nElectronics\t| OLED TV\t\t| 1299.99\nElectronics\t| Smartphone\t\t| 899.99\nElectronics\t| Wireless Headphones\t| 199.99\nFurniture\t| Leather Sofa\t\t| 1499.99\nFurniture\t| Office Chair\t\t| 249.95`}
            w3SchoolsLink="https://www.w3schools.com/sql/sql_orderby.asp"
            geeksForGeeksLink="https://www.geeksforgeeks.org/sql-order-by/"
          />
        </TabsContent>

        {/* GROUP BY */}
        <TabsContent value="groupby" className="animate-fade-in">
          <SQLConceptCard
            title="GROUP BY Clause"
            description="The GROUP BY statement groups rows that have the same values into summary rows, like 'find the number of customers in each country'. It is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or more columns. GROUP BY comes after any WHERE clause and before any ORDER BY clause."
            syntax={`-- Basic GROUP BY syntax\nSELECT column_name(s), aggregate_function(column_name)\nFROM table_name\nWHERE condition\nGROUP BY column_name(s);`}
            example={`-- Example: Count customers by country\nSELECT country, COUNT(*) as customer_count\nFROM customers\nGROUP BY country;\n\n-- Example: Find average price by category\nSELECT category, AVG(price) as avg_price\nFROM products\nGROUP BY category;`}
            outputPreview={`-- Output for average price by category:\n\ncategory\t| avg_price\n---------------------------\nElectronics\t| 649.99\nFurniture\t| 874.97\nClothing\t| 59.95\nBooks\t\t| 24.99`}
            w3SchoolsLink="https://www.w3schools.com/sql/sql_groupby.asp"
            geeksForGeeksLink="https://www.geeksforgeeks.org/sql-group-by/"
          />
        </TabsContent>

        {/* JOINs */}
        <TabsContent value="joins" className="animate-fade-in">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold">
                <Database className="mr-2 h-5 w-5 text-pdf-primary" />
                SQL JOINs
              </CardTitle>
              <CardDescription>
                JOINs are used to combine rows from two or more tables based on a related column. There are different types of JOINs including INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/91feb324-c62e-49ae-9152-5ac824e19bf3.png" 
                  alt="SQL JOINs Diagram" 
                  className="mx-auto max-w-full h-auto rounded-md border border-gray-200 my-4"
                />
                <p className="text-sm text-center text-gray-500 mt-2">Common SQL JOIN types visualized</p>
              </div>

              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="inner-join">
                  <AccordionTrigger>INNER JOIN</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">INNER JOIN returns records that have matching values in both tables. It's the most common type of join.</p>
                    <CodeSyntaxHighlighter code={`SELECT orders.order_id, customers.name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.id;`} />
                    <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm font-mono whitespace-pre-wrap">
                      <div className="font-medium mb-2">Example Output:</div>
                      order_id | name<br />
                      ----------------<br />
                      1001     | John Doe<br />
                      1002     | Jane Smith<br />
                      1003     | John Doe
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="left-join">
                  <AccordionTrigger>LEFT JOIN</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">LEFT JOIN returns all records from the left table and the matched records from the right table. If no match, the result is NULL on the right side.</p>
                    <CodeSyntaxHighlighter code={`SELECT customers.name, orders.order_id\nFROM customers\nLEFT JOIN orders ON customers.id = orders.customer_id;`} />
                    <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm font-mono whitespace-pre-wrap">
                      <div className="font-medium mb-2">Example Output:</div>
                      name       | order_id<br />
                      ----------------------<br />
                      John Doe   | 1001<br />
                      John Doe   | 1003<br />
                      Jane Smith | 1002<br />
                      Bob Brown  | NULL
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="right-join">
                  <AccordionTrigger>RIGHT JOIN</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">RIGHT JOIN returns all records from the right table and the matched records from the left table. If no match, the result is NULL on the left side.</p>
                    <CodeSyntaxHighlighter code={`SELECT orders.order_id, customers.name\nFROM orders\nRIGHT JOIN customers ON orders.customer_id = customers.id;`} />
                    <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm font-mono whitespace-pre-wrap">
                      <div className="font-medium mb-2">Example Output:</div>
                      order_id | name<br />
                      ----------------------<br />
                      1001     | John Doe<br />
                      1002     | Jane Smith<br />
                      1003     | John Doe<br />
                      NULL     | Bob Brown
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex flex-wrap gap-4 mt-6">
                <a href="https://www.w3schools.com/sql/sql_join.asp" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    W3Schools: SQL JOINs
                  </Button>
                </a>
                <a href="https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    GeeksForGeeks: SQL JOINs
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LIMIT */}
        <TabsContent value="limit" className="animate-fade-in">
          <SQLConceptCard
            title="LIMIT Clause"
            description="The LIMIT clause is used to restrict the number of rows returned in a result set. It's useful when working with large tables where you want to return only a portion of the results. In MySQL and PostgreSQL, the LIMIT clause is used, while in SQL Server, the TOP clause serves a similar purpose. Oracle uses ROWNUM or the FETCH FIRST syntax instead."
            syntax={`-- MySQL and PostgreSQL syntax\nSELECT column_name(s)\nFROM table_name\nLIMIT number;\n\n-- With OFFSET\nSELECT column_name(s)\nFROM table_name\nLIMIT number OFFSET offset_value;`}
            example={`-- Example: Get top 5 most expensive products\nSELECT name, price\nFROM products\nORDER BY price DESC\nLIMIT 5;\n\n-- Example: Pagination (10 results per page, page 2)\nSELECT *\nFROM products\nLIMIT 10 OFFSET 10;`}
            outputPreview={`-- Output for top 5 most expensive products:\n\nname\t\t| price\n--------------------------\nLuxury Watch\t| 4999.99\nDiamond Ring\t| 3599.00\n8K Television\t| 2999.99\nGaming Laptop\t| 2499.95\nLeather Sofa\t| 1499.99`}
            w3SchoolsLink="https://www.w3schools.com/sql/sql_top.asp"
            geeksForGeeksLink="https://www.geeksforgeeks.org/sql-limit-clause/"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Component for SQL concept cards
const SQLConceptCard = ({ 
  title, 
  description, 
  syntax, 
  example, 
  outputPreview,
  w3SchoolsLink,
  geeksForGeeksLink
}: { 
  title: string; 
  description: string; 
  syntax: string; 
  example: string; 
  outputPreview: string;
  w3SchoolsLink: string;
  geeksForGeeksLink: string;
}) => {
  const [userQuery, setUserQuery] = useState("");
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success(message))
      .catch(() => toast.error("Failed to copy"));
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <Database className="mr-2 h-5 w-5 text-pdf-primary" />
          {title}
        </CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Syntax</h3>
          <div className="relative">
            <CodeSyntaxHighlighter code={syntax} />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(syntax, "Syntax copied to clipboard")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Example</h3>
          <div className="relative">
            <CodeSyntaxHighlighter code={example} />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(example, "Example copied to clipboard")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Expected Output</h3>
          <div className="p-4 bg-gray-50 rounded-md text-sm font-mono whitespace-pre-wrap">
            {outputPreview}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Try It Yourself</h3>
          <Textarea
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Write your SQL query here..."
            className="min-h-[100px] font-mono text-sm mb-2"
          />
          <Button className="bg-pdf-primary hover:bg-pdf-primary/90">
            <PlayIcon className="mr-2 h-4 w-4" />
            Run Query
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
          <a href={w3SchoolsLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              W3Schools: {title}
            </Button>
          </a>
          <a href={geeksForGeeksLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              GeeksForGeeks: {title}
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearnSQL;
