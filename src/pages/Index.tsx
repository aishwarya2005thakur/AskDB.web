
import NavBar from "@/components/NavBar";
import NaturalLanguageQueryGenerator from "@/components/NaturalLanguageQueryGenerator";

const Index = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-white to-pdf-background py-12 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Natural Language to SQL
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your natural language questions into SQL queries instantly. Simply type your question and get the SQL code.
            </p>
          </div>
          
          <NaturalLanguageQueryGenerator />
        </div>
      </div>
    </>
  );
};

export default Index;
