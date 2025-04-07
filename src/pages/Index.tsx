
import NavBar from "@/components/NavBar";
import QueryWorkspace from "@/components/QueryWorkspace";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Natural Language to SQL
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your natural language questions into SQL queries instantly. Upload your PDFs and ask questions about your data.
            </p>
          </div>
          
          <QueryWorkspace />
        </div>
      </div>
    </div>
  );
};

export default Index;
