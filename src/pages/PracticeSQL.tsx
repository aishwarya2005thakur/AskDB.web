import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Level, ValidationResult } from "@/types/practiceSQL";
import LevelHeader from "@/components/practice/LevelHeader";
import QuestionList from "@/components/practice/QuestionList";
import LevelTabs from "@/components/practice/LevelTabs";

const PracticeSQL = () => {
  // Define the levels with questions
  const initialLevels: Level[] = [
    {
      id: "easy",
      title: "Level 1 - Easy",
      dbDiagram: "/lovable-uploads/8ced615e-8165-4bd0-b159-a0babf617a3c.png",
      description: "Basic SELECT statements to retrieve data from tables.",
      completed: 0,
      unlocked: true,
      questions: [
        {
          id: "easy-1",
          title: "Retrieve all employees",
          task: "Write a query to select all columns from the employee table.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["employee_id", "last_name", "first_name", "hire_date"],
            rows: [
              [1, "Smith", "John", "2020-01-15"],
              [2, "Johnson", "Alice", "2019-05-20"],
              [3, "Williams", "Robert", "2021-03-10"]
            ]
          }
        },
        {
          id: "easy-2",
          title: "Find customers by country",
          task: "Write a query to find all customers from the USA.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["customer_id", "contact_name", "country"],
            rows: [
              [1, "Thomas Wright", "USA"],
              [4, "Sarah Miller", "USA"],
              [7, "David Johnson", "USA"]
            ]
          }
        },
        {
          id: "easy-3",
          title: "List available products",
          task: "Write a query to list all products that are not discontinued.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["product_id", "product_name", "units_in_stock"],
            rows: [
              [1, "Laptop", 45],
              [3, "Smartphone", 120],
              [5, "Headphones", 75]
            ]
          }
        },
        {
          id: "easy-4",
          title: "Count purchases per customer",
          task: "Write a query to count the number of purchases made by each customer.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["customer_id", "purchase_count"],
            rows: [
              [1, 3],
              [2, 1],
              [3, 2],
              [4, 4]
            ]
          }
        },
        {
          id: "easy-5",
          title: "Find expensive products",
          task: "Write a query to find all products with a unit price greater than $500.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["product_id", "product_name", "unit_price"],
            rows: [
              [1, "Laptop", "999.99"],
              [3, "Smartphone", "799.50"],
              [8, "Camera", "649.99"]
            ]
          }
        }
      ]
    },
    {
      id: "medium",
      title: "Level 2 - Medium",
      dbDiagram: "/lovable-uploads/8ced615e-8165-4bd0-b159-a0babf617a3c.png",
      description: "JOIN operations and more complex filtering.",
      completed: 0,
      unlocked: false,
      questions: [
        {
          id: "medium-1",
          title: "Join customers and purchases",
          task: "Write a query to join the customer table with the purchase table to display customer contact names with their purchase dates.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["contact_name", "purchase_id", "purchase_date"],
            rows: [
              ["Thomas Wright", 101, "2023-01-15"],
              ["Sarah Miller", 102, "2023-01-18"],
              ["Robert Brown", 103, "2023-01-22"]
            ]
          }
        },
        {
          id: "medium-2",
          title: "Employee purchase records",
          task: "Find all purchases handled by employees hired after 2020.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["employee_id", "first_name", "last_name", "purchase_id"],
            rows: [
              [3, "Robert", "Williams", 103],
              [3, "Robert", "Williams", 105],
              [5, "Jennifer", "Davis", 108]
            ]
          }
        },
        {
          id: "medium-3",
          title: "Product categories",
          task: "List all products with their category names.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["product_name", "category_name"],
            rows: [
              ["Laptop", "Electronics"],
              ["Desktop", "Electronics"], 
              ["Smartphone", "Mobile Devices"]
            ]
          }
        },
        {
          id: "medium-4",
          title: "Purchase items summary",
          task: "Calculate the total value of each purchase (quantity * unit_price).",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["purchase_id", "total_value"],
            rows: [
              [101, "1299.97"],
              [102, "799.50"],
              [103, "4499.95"]
            ]
          }
        },
        {
          id: "medium-5",
          title: "Customer purchase analysis",
          task: "Find customers who have made more than 3 purchases.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["customer_id", "contact_name", "purchase_count"],
            rows: [
              [1, "Thomas Wright", 5],
              [4, "Sarah Miller", 4]
            ]
          }
        }
      ]
    },
    {
      id: "hard",
      title: "Level 3 - Hard",
      dbDiagram: "/lovable-uploads/8ced615e-8165-4bd0-b159-a0babf617a3c.png",
      description: "Advanced queries with aggregation, subqueries, and complex joins.",
      completed: 0,
      unlocked: false,
      questions: [
        {
          id: "hard-1",
          title: "Advanced customer analysis",
          task: "Find the top 3 customers who have spent the most money across all purchases.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["customer_id", "contact_name", "total_spent"],
            rows: [
              [1, "Thomas Wright", "7823.45"],
              [4, "Sarah Miller", "5290.30"],
              [3, "Robert Brown", "3456.78"]
            ]
          }
        },
        {
          id: "hard-2",
          title: "Employee performance",
          task: "Find the employee who has handled the highest total value of purchases.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["employee_id", "first_name", "last_name", "total_sales"],
            rows: [
              [2, "Alice", "Johnson", "12543.87"]
            ]
          }
        },
        {
          id: "hard-3",
          title: "Category performance",
          task: "Calculate the total sales for each product category, ordered by highest sales.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["category_name", "total_sales"],
            rows: [
              ["Electronics", "15782.45"],
              ["Mobile Devices", "9872.30"],
              ["Accessories", "4523.67"]
            ]
          }
        },
        {
          id: "hard-4",
          title: "Inventory value",
          task: "Calculate the total inventory value (units_in_stock * unit_price) for each category.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["category_name", "inventory_value"],
            rows: [
              ["Electronics", "87654.32"],
              ["Mobile Devices", "45678.90"],
              ["Accessories", "12345.67"]
            ]
          }
        },
        {
          id: "hard-5",
          title: "Purchase trends",
          task: "Write a query to find months with the highest number of purchases in the last year.",
          completed: false,
          userQuery: "",
          expectedOutput: {
            headers: ["month", "year", "purchase_count"],
            rows: [
              ["March", 2023, 12],
              ["December", 2023, 10],
              ["July", 2023, 9]
            ]
          }
        }
      ]
    }
  ];

  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [activeLevel, setActiveLevel] = useState<string>("easy");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});

  // Function to check if a query is correct (simplified for demo)
  const validateQuery = (questionId: string, query: string): ValidationResult => {
    // In a real application, this would send the query to the backend
    // For demo purposes, we'll return a mock validation result with differences
    
    // Always returning incorrect result with mock comparison data for demo
    // In a real app, this would come from the backend
    const question = levels.flatMap(l => l.questions).find(q => q.id === questionId);
    
    if (!question) {
      return { correct: false };
    }
    
    // For demo, alternate between correct and incorrect responses
    const isCorrect = Math.random() > 0.7; // 30% chance of being correct
    
    if (isCorrect) {
      return {
        correct: true,
        userOutput: question.expectedOutput,
        expectedOutput: question.expectedOutput
      };
    }
    
    // Generate mock "incorrect" output with some differences
    const userOutput = {
      headers: [...question.expectedOutput.headers],
      rows: question.expectedOutput.rows.map((row, idx) => {
        // Modify some values to create differences
        if (idx === 1 && row.length > 1) {
          return [row[0], `Modified-${row[1]}`];
        }
        return [...row];
      })
    };
    
    // Add an extra row for more differences
    if (userOutput.rows.length > 0) {
      const lastRow = userOutput.rows[userOutput.rows.length - 1];
      userOutput.rows.push([999, `Extra-${lastRow[1]}`]);
    }
    
    return {
      correct: false,
      userOutput,
      expectedOutput: question.expectedOutput
    };
  };

  // Handle submission of SQL queries
  const handleSubmit = async (levelId: string, questionId: string) => {
    setLoadingStates(prev => ({ ...prev, [questionId]: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const levelIndex = levels.findIndex(level => level.id === levelId);
      const questionIndex = levels[levelIndex].questions.findIndex(q => q.id === questionId);
      
      if (levelIndex === -1 || questionIndex === -1) return;
      
      const result = validateQuery(questionId, levels[levelIndex].questions[questionIndex].userQuery);
      setValidationResults(prev => ({ ...prev, [questionId]: result }));
      
      const updatedLevels = [...levels];
      // Mark question as completed if correct
      updatedLevels[levelIndex].questions[questionIndex].completed = result.correct;
      
      // Update level completion count
      const completedCount = updatedLevels[levelIndex].questions.filter(q => q.completed).length;
      updatedLevels[levelIndex].completed = completedCount;
      
      // Check if all questions in the current level are completed
      if (completedCount === 5 && levelIndex < levels.length - 1) {
        // Unlock the next level
        updatedLevels[levelIndex + 1].unlocked = true;
      }
      
      setLevels(updatedLevels);
    } catch (error) {
      console.error("Error validating query:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [questionId]: false }));
    }
  };

  // Handle query input changes
  const handleQueryChange = (levelId: string, questionId: string, value: string) => {
    const levelIndex = levels.findIndex(level => level.id === levelId);
    const questionIndex = levels[levelIndex].questions.findIndex(q => q.id === questionId);
    
    if (levelIndex === -1 || questionIndex === -1) return;
    
    const updatedLevels = [...levels];
    updatedLevels[levelIndex].questions[questionIndex].userQuery = value;
    setLevels(updatedLevels);
    
    // Clear validation results when query changes
    setValidationResults(prev => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  // Toggle hint visibility
  const toggleHint = (questionId: string) => {
    setOpenHints(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Practice SQL
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Improve your SQL skills with interactive exercises. Complete each level to unlock more challenging problems.
            </p>
          </div>
          
          <Tabs 
            defaultValue="easy" 
            value={activeLevel}
            onValueChange={setActiveLevel}
            className="w-full"
          >
            <LevelTabs levels={levels} />
            
            {levels.map(level => (
              <TabsContent 
                key={level.id} 
                value={level.id}
                className="animate-fade-in"
              >
                <div className="space-y-6">
                  {/* Level Header with Database Diagram */}
                  <LevelHeader
                    title={level.title}
                    description={level.description}
                    completedCount={level.completed}
                    dbDiagram={level.dbDiagram}
                  />

                  {/* Questions */}
                  <QuestionList
                    levelId={level.id}
                    questions={level.questions}
                    loadingStates={loadingStates}
                    openHints={openHints}
                    validationResults={validationResults}
                    onQueryChange={handleQueryChange}
                    onToggleHint={toggleHint}
                    onSubmit={handleSubmit}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PracticeSQL;
