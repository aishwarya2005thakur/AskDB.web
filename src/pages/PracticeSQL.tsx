
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import LevelTabs from "@/components/practice/LevelTabs";
import LevelHeader from "@/components/practice/LevelHeader";
import QuestionList from "@/components/practice/QuestionList";
import { Level, Question, ValidationResult } from "@/types/practiceSQL";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { CoinProvider, useCoins, getCoinReward } from "@/hooks/useCoins";
import CoinCounter from "@/components/CoinCounter";

const initialLevels: Level[] = [
  {
    id: "level-1",
    title: "Level 1: Easy",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Basic SQL queries to get you started with the fundamentals.",
    questions: [
      {
        id: "1",
        title: "Select all columns from the Customers table",
        task: "Retrieve all columns for all customers.",
        completed: false,
        userQuery: "",
        difficulty: "easy",
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
        title: "Select specific columns from Customers",
        task: "Retrieve only the customer name and city for each customer.",
        completed: false,
        userQuery: "",
        difficulty: "easy",
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
        difficulty: "easy",
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
        title: "Select specific columns from Products",
        task: "Retrieve only the product name and price for each product.",
        completed: false,
        userQuery: "",
        difficulty: "easy",
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
        title: "Select unique countries from Customers",
        task: "Retrieve a list of unique countries where customers are from.",
        completed: false,
        userQuery: "",
        difficulty: "easy",
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
    title: "Level 2: Medium",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Intermediate SQL queries including filtering and sorting data.",
    questions: [
      {
        id: "6",
        title: "Filter customers by city",
        task: "Retrieve all customers who are located in London.",
        completed: false,
        userQuery: "",
        difficulty: "medium",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"]
          ]
        }
      },
      {
        id: "7",
        title: "Filter products by price",
        task: "Retrieve all products that have a price greater than 20.",
        completed: false,
        userQuery: "",
        difficulty: "medium",
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
        title: "Sort customers by name",
        task: "Retrieve all customers, ordered alphabetically by their CustomerName.",
        completed: false,
        userQuery: "",
        difficulty: "medium",
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
        id: "9",
        title: "Sort products by price (descending)",
        task: "Retrieve all products, ordered by their Price from highest to lowest.",
        completed: false,
        userQuery: "",
        difficulty: "medium",
        expectedOutput: {
          headers: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          rows: [
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"],
            ["2", "Chang", "1", "1", "24 - 12 oz bottles", "19"],
            ["1", "Chais", "1", "1", "10 boxes x 20 bags", "18"],
            ["3", "Aniseed Syrup", "1", "2", "12 - 550 ml bottles", "10"]
          ]
        }
      },
      {
        id: "10",
        title: "Filter and sort customer data",
        task: "Retrieve customers from Germany, ordered by their City.",
        completed: false,
        userQuery: "",
        difficulty: "medium",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"]
          ]
        }
      }
    ],
    completed: 0,
    unlocked: false
  },
  {
    id: "level-3",
    title: "Level 3: Hard",
    dbDiagram: "/db-diagrams/level1.png",
    description: "Advanced SQL queries with complex filtering, multiple conditions, and limits.",
    questions: [
      {
        id: "11",
        title: "Complex filtering with AND/OR",
        task: "Retrieve all customers who are located in either London or Berlin.",
        completed: false,
        userQuery: "",
        difficulty: "hard",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"],
            ["4", "Around the Horn", "Thomas Hardy", "120 Hanover Sq.", "London", "WA1 1DP", "UK"]
          ]
        }
      },
      {
        id: "12",
        title: "Multiple conditions with AND",
        task: "Retrieve all products that have a price greater than 20 and belong to CategoryID 2.",
        completed: false,
        userQuery: "",
        difficulty: "hard",
        expectedOutput: {
          headers: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          rows: [
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"]
          ]
        }
      },
      {
        id: "13",
        title: "Limiting results",
        task: "Retrieve the first 3 customers from the Customers table.",
        completed: false,
        userQuery: "",
        difficulty: "hard",
        expectedOutput: {
          headers: ["CustomerID", "CustomerName", "ContactName", "Address", "City", "PostalCode", "Country"],
          rows: [
            ["1", "Alfreds Futterkiste", "Maria Anders", "Obere Str. 57", "Berlin", "12209", "Germany"],
            ["2", "Ana Trujillo Emparedados y helados", "Ana Trujillo", "Avda. de la Constitución 2222", "México D.F.", "05021", "Mexico"],
            ["3", "Antonio Moreno Taquería", "Antonio Moreno", "Mataderos 2312", "México D.F.", "05023", "Mexico"]
          ]
        }
      },
      {
        id: "14",
        title: "Top expensive products",
        task: "Retrieve the 2 most expensive products from the Products table.",
        completed: false,
        userQuery: "",
        difficulty: "hard",
        expectedOutput: {
          headers: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          rows: [
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"]
          ]
        }
      },
      {
        id: "15",
        title: "Nested sorting",
        task: "Retrieve all products, ordered first by their CategoryID and then by their Price.",
        completed: false,
        userQuery: "",
        difficulty: "hard",
        expectedOutput: {
          headers: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Unit", "Price"],
          rows: [
            ["1", "Chais", "1", "1", "10 boxes x 20 bags", "18"],
            ["2", "Chang", "1", "1", "24 - 12 oz bottles", "19"],
            ["3", "Aniseed Syrup", "1", "2", "12 - 550 ml bottles", "10"],
            ["5", "Chef Anton's Gumbo Mix", "2", "2", "36 boxes", "21.35"],
            ["4", "Chef Anton's Cajun Seasoning", "2", "2", "48 - 6 oz jars", "22"]
          ]
        }
      }
    ],
    completed: 0,
    unlocked: false
  }
];

const PracticeSQLContent = () => {
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const { addCoins } = useCoins();

  const handleQueryChange = (levelId: string, questionId: string, value: string) => {
    setLevels(prevLevels =>
      prevLevels.map(level =>
        level.id === levelId
          ? {
              ...level,
              questions: level.questions.map(question =>
                question.id === questionId ? { ...question, userQuery: value } : question
              )
            }
          : level
      )
    );
  };

  const handleToggleHint = (questionId: string) => {
    setOpenHints(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmit = (levelId: string, questionId: string) => {
    setLoadingStates(prev => ({ ...prev, [questionId]: true }));
    
    setTimeout(() => {
      const level = levels.find(l => l.id === levelId);
      const question = level?.questions.find(q => q.id === questionId);
      
      if (!question) return;
      
      const isCorrect = question.userQuery.toLowerCase().includes('select');
      
      setValidationResults(prev => ({
        ...prev,
        [questionId]: {
          correct: isCorrect,
          userOutput: isCorrect 
            ? question.expectedOutput 
            : {
                headers: question.expectedOutput.headers,
                rows: [["No matching data found"]]
              },
          expectedOutput: question.expectedOutput
        }
      }));
      
      if (isCorrect) {
        setLevels(prevLevels =>
          prevLevels.map(level => {
            if (level.id === levelId) {
              const updatedQuestions = level.questions.map(q => {
                if (q.id === questionId && !q.completed) {
                  // Add coins for newly completed question
                  const coinReward = getCoinReward(q.difficulty || 'easy');
                  addCoins(coinReward, q.difficulty || 'easy');
                  return { ...q, completed: true };
                }
                return q;
              });
              
              const completedCount = updatedQuestions.filter(q => q.completed).length;
              
              return { ...level, questions: updatedQuestions, completed: completedCount };
            }
            return level;
          })
        );
      }
      
      setLoadingStates(prev => ({ ...prev, [questionId]: false }));
      setCurrentQuestionId(questionId);
    }, 1000);
  };

  const handleUnlockNextLevel = (currentLevelId: string) => {
    const currentLevelIndex = levels.findIndex(level => level.id === currentLevelId);
    const nextLevelIndex = currentLevelIndex + 1;
    
    if (nextLevelIndex < levels.length) {
      setLevels(prevLevels => 
        prevLevels.map((level, index) => 
          index === nextLevelIndex ? { ...level, unlocked: true } : level
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8 container">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-10 relative">
            <div className="absolute top-0 right-0">
              <CoinCounter />
            </div>
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
                  completedCount={level.completed}
                />
                
                <QuestionList
                  levelId={level.id}
                  questions={level.questions}
                  loadingStates={loadingStates}
                  openHints={openHints}
                  validationResults={validationResults}
                  onQueryChange={handleQueryChange}
                  onToggleHint={handleToggleHint}
                  onSubmit={handleSubmit}
                />
                
                {level.completed === 5 && (
                  <div className="mt-8 flex justify-center">
                    {levels.findIndex(l => l.id === level.id) < levels.length - 1 && (
                      <Button 
                        onClick={() => handleUnlockNextLevel(level.id)}
                        disabled={levels[levels.findIndex(l => l.id === level.id) + 1].unlocked}
                        className="flex items-center gap-2"
                      >
                        {levels[levels.findIndex(l => l.id === level.id) + 1].unlocked ? (
                          <>
                            <Unlock className="h-4 w-4" />
                            Next Level Unlocked
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4" />
                            Unlock Next Level
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      <Footer customClass="bg-gradient-to-r from-[#051525] to-[#0a2440] text-white" />
    </div>
  );
};

const PracticeSQL = () => {
  return (
    <CoinProvider>
      <PracticeSQLContent />
    </CoinProvider>
  );
};

export default PracticeSQL;
