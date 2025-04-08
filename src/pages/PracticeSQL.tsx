import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import LevelTabs from "@/components/practice/LevelTabs";
import LevelHeader from "@/components/practice/LevelHeader";
import QuestionList from "@/components/practice/QuestionList";
import { Level, Question, ValidationResult } from "@/types/practiceSQL";

const initialLevels: Level[] = [
  {
    id: "level-1",
    title: "Level 1: SELECT basics",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Learn to retrieve data from a single table using SELECT statements.",
    questions: [
      {
        id: "1",
        title: "Select all columns from the Customers table",
        task: "Retrieve all columns for all customers.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"],
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"],
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"],
            ["5", "Berglunds snabbköp", "Christina Berglund", "Berguvsvägen 8", "Luleå", "S-958 22", "Sweden"]
          ]
        }
      },
      {
        id: "2",
        title: "Select specific columns (CustomerName, City) from the Customers table",
        task: "Retrieve only the customer name and city for each customer.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["CustomerName", "City"],
          rows: [
            ["Alfreds Futterkiste", "Berlin"],
            ["Ana Trujillo Emparedados y helados", "México D.F."],
            ["Antonio Moreno Taquería", "México D.F."],
            ["Around the Horn", "London"],
            ["Berglunds snabbköp", "Luleå"]
          ]
        }
      },
      {
        id: "3",
        title: "Select all columns from the Products table",
        task: "Retrieve all columns for all products.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          rows: [
            ["1", "Chais", "1", "1", "10 boxes x 20 bags", "18"],
            ["2", "Chang", "1", "1", "24 - 12 oz bottles", "19"],
            ["3", "Aniseed Syrup", "1", "2", "12 - 550 ml bottles", "10"],
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"]
          ]
        }
      },
      {
        id: "4",
        title: "Select specific columns (ProductName, Price) from the Products table",
        task: "Retrieve only the product name and price for each product.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["ProductName", "Price"],
          rows: [
            ["Chais", "18"],
            ["Chang", "19"],
            ["Aniseed Syrup", "10"],
            ["Chef Anton's Cajun Seasoning", "22"],
            ["Chef Anton's Gumbo Mix", "21.35"]
          ]
        }
      },
      {
        id: "5",
        title: "Select all unique countries from the Customers table",
        task: "Retrieve a list of unique countries where customers are from.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["Country"],
          rows: [
            ["Germany"],
            ["Mexico"],
            ["UK"],
            ["Sweden"]
          ]
        }
      }
    ],
    completed: 0,
    unlocked: true
  },
  {
    id: "level-2",
    title: "Level 2: WHERE clause",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Filter data based on specified conditions using the WHERE clause.",
    questions: [
      {
        id: "6",
        title: "Select customers from the city of London",
        task: "Retrieve all customers who are located in London.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"]
          ]
        }
      },
      {
        id: "7",
        title: "Select products with a price greater than 20",
        task: "Retrieve all products that have a price greater than 20.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          rows: [
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"]
          ]
        }
      },
      {
        id: "8",
        title: "Select customers from Germany",
        task: "Retrieve all customers who are from Germany.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"]
          ]
        }
      },
      {
        id: "9",
        title: "Select products with a price less than or equal to 15",
        task: "Retrieve all products that have a price less than or equal to 15.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          rows: [
            // ["3", "Aniseed Syrup", "1", "2", "12 - 550 ml bottles", "10"] // Removed because no products satisfy this condition
          ]
        }
      },
      {
        id: "10",
        title: "Select customers not from Mexico",
        task: "Retrieve all customers who are not from Mexico.",
        completed: false,
        userQuery: "",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"],
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"],
            ["5", "Berglunds snabbköp", "Christina Berglund", "Berguvsvägen 8", "Luleå", "S-958 22", "Sweden"]
          ]
        }
      }
    ],
    completed: 0,
    unlocked: false
  },
  {
    id: "level-3",
    title: "Level 3: AND & OR operators",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Combine multiple conditions in a WHERE clause using AND and OR operators.",
    questions: [
      {
        "id": "11",
        "title": "Select customers from London or Berlin",
        "task": "Retrieve all customers who are located in either London or Berlin.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"],
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"]
          ]
        }
      },
      {
        "id": "12",
        "title": "Select products with price > 20 AND CategoryID = 2",
        "task": "Retrieve all products that have a price greater than 20 and belong to CategoryID 2.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          "rows": [
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"]
          ]
        }
      },
      {
        "id": "13",
        "title": "Select customers from Mexico AND City = 'México D.F.'",
        "task": "Retrieve all customers who are from Mexico and located in 'México D.F.'.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"]
          ]
        }
      },
      {
        "id": "14",
        "title": "Select products with price < 15 OR CategoryID = 1",
        "task": "Retrieve all products that have a price less than 15 or belong to CategoryID 1.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          "rows": [
            ["1", "Chais", "1", "1", "10 boxes x 20 bags", "18"],
            ["2", "Chang", "1", "1", "24 - 12 oz bottles", "19"]
          ]
        }
      },
      {
        "id": "15",
        "title": "Select customers NOT from Germany AND NOT from UK",
        "task": "Retrieve all customers who are not from Germany and not from the UK.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"],
            ["5", "Berglunds snabbköp", "Christina Berglund", "Berguvsvägen 8", "Luleå", "S-958 22", "Sweden"]
          ]
        }
      }
    ],
    completed: 0,
    unlocked: false
  },
  {
    id: "level-4",
    title: "Level 4: ORDER BY clause",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Sort the result-set of a query using the ORDER BY clause.",
    questions": [
      {
        "id": "16",
        "title": "Select all customers, ordered by CustomerName",
        "task": "Retrieve all customers, ordered alphabetically by their CustomerName.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"],
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"],
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"],
            ["5", "Berglunds snabbköp", "Christina Berglund", "Berguvsvägen 8", "Luleå", "S-958 22", "Sweden"]
          ]
        }
      },
      {
        "id": "17",
        "title": "Select all products, ordered by Price in descending order",
        "task": "Retrieve all products, ordered by their Price from highest to lowest.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          "rows": [
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"],
            ["2", "Chang", "1", "1", "24 - 12 oz bottles", "19"],
            ["1", "Chais", "1", "1", "10 boxes x 20 bags", "18"],
            ["3", "Aniseed Syrup", "1", "2", "12 - 550 ml bottles", "10"]
          ]
        }
      },
      {
        "id": "18",
        "title": "Select customers from Mexico, ordered by City",
        "task": "Retrieve all customers from Mexico, ordered alphabetically by their City.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"]
          ]
        }
      },
      {
        "id": "19",
        "title": "Select products ordered by CategoryID and then by Price",
        "task": "Retrieve all products, ordered first by their CategoryID and then by their Price in ascending order.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          "rows": [
            ["1", "Chais", "1", "1", "10 boxes x 20 bags", "18"],
            ["2", "Chang", "1", "1", "24 - 12 oz bottles", "19"],
            ["3", "Aniseed Syrup", "1", "2", "12 - 550 ml bottles", "10"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"],
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"]
          ]
        }
      },
      {
        "id": "20",
        "title": "Select customers ordered by Country in descending order",
        "task": "Retrieve all customers, ordered by their Country in descending order.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["5", "Berglunds snabbköp", "Christina Berglund", "Berguvsvägen 8", "Luleå", "S-958 22", "Sweden"],
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"],
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"],
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"]
          ]
        }
      }
    ],
    completed: 0,
    unlocked: false
  },
  {
    id: "level-5",
    title: "Level 5: LIMIT clause",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Limit the number of rows returned by a query using the LIMIT clause.",
    questions": [
      {
        "id": "21",
        "title": "Select the first 3 customers",
        "task": "Retrieve the first 3 customers from the Customers table.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"],
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"]
          ]
        }
      },
      {
        "id": "22",
        "title": "Select the 2 most expensive products",
        "task": "Retrieve the 2 most expensive products from the Products table.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          "rows": [
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"]
          ]
        }
      },
      {
        "id": "23",
        "title": "Select the first customer from London",
        "task": "Retrieve the first customer from the Customers table who is located in London.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"]
          ]
        }
      },
      {
        "id": "24",
        "title": "Select 3 products with the lowest prices",
        "task": "Retrieve the 3 products with the lowest prices from the Products table.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          "rows": [
            ["3", "Aniseed Syrup", "1", "2", "12 - 550 ml bottles", "10"],
            ["1", "Chais", "1", "1", "10 boxes x 20 bags", "18"],
            ["2", "Chang", "1", "1", "24 - 12 oz bottles", "19"]
          ]
        }
      },
      {
        "id": "25",
        "title": "Select the last 2 customers when ordered by CustomerID",
        "task": "Retrieve the last 2 customers from the Customers table when ordered by CustomerID.",
        "completed": false,
        "userQuery": "",
        "expectedOutput": {
          "headers": ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          "rows": [
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"],
            ["5", "Berglunds snabbköp", "Christina Berglund", "Berguvsvägen 8", "Luleå", "S-958 22", "Sweden"]
          ]
        }
      }
    ],
    completed: 0,
    unlocked: false
  }
];

const PracticeSQL = () => {
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  const handleUpdateQuestion = (levelId: string, questionId: string, userQuery: string) => {
    setLevels(prevLevels =>
      prevLevels.map(level =>
        level.id === levelId
          ? {
              ...level,
              questions: level.questions.map(question =>
                question.id === questionId ? { ...question, userQuery } : question
              )
            }
          : level
      )
    );
  };

  const handleValidateQuery = (levelId: string, questionId: string, isCorrect: boolean) => {
    setLevels(prevLevels =>
      prevLevels.map(level => {
        if (level.id === levelId) {
          const updatedQuestions = level.questions.map(question => {
            if (question.id === questionId) {
              return { ...question, completed: isCorrect };
            }
            return question;
          });

          const completedCount = updatedQuestions.filter(q => q.completed).length;

          return { ...level, questions: updatedQuestions, completed: completedCount };
        }
        return level;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8 container">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Practice SQL
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your SQL skills with our interactive exercises. Complete challenges to unlock more advanced levels.
            </p>
          </div>

          <Tabs defaultValue="level-1" className="w-full">
            <LevelTabs levels={levels} />
            
            {levels.map((level) => (
              <TabsContent key={level.id} value={level.id} className="mt-6">
                <LevelHeader
                  title={level.title}
                  description={level.description}
                  dbDiagram={level.dbDiagram}
                  completed={level.completed}
                  total={5}
                />
                
                <QuestionList
                  questions={level.questions}
                  onUpdateQuestion={handleUpdateQuestion}
                  onValidateQuery={handleValidateQuery}
                  validationResult={validationResult}
                  currentQuestionId={currentQuestionId}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PracticeSQL;
