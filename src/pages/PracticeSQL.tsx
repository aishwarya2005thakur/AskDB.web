
import React from 'react';
import NavBar from "@/components/NavBar";
import Footer from '@/components/Footer';

const PracticeSQL = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Practice SQL</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-lg mb-4">
              SQL practice exercises coming soon! Check back later for interactive SQL challenges.
            </p>
            
            <div className="flex justify-center">
              <div className="bg-blue-50 text-blue-700 p-4 rounded-md max-w-md">
                <p className="font-medium">While you wait:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Visit the Learn SQL page to review SQL concepts</li>
                  <li>Check out the Home page to try our natural language to SQL conversion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PracticeSQL;
