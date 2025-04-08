
import React from 'react';

interface CodeSyntaxHighlighterProps {
  code: string;
  language?: string;
}

const CodeSyntaxHighlighter: React.FC<CodeSyntaxHighlighterProps> = ({ 
  code, 
  language = 'sql' 
}) => {
  // Simple syntax highlighting for SQL
  const highlightSQL = (code: string) => {
    // Replace SQL keywords with highlighted spans
    const highlighted = code
      .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|LIMIT|JOIN|ON|AS|IN|BETWEEN|LIKE|AND|OR|NOT|NULL|IS|CREATE|TABLE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|HAVING|UNION|ALL|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|ELSE|END)\b/gi, 
        (match) => `<span class="text-blue-600 font-bold">${match}</span>`)
      // Highlight strings (in single quotes)
      .replace(/'([^']*)'/g, 
        (match) => `<span class="text-green-600">${match}</span>`)
      // Highlight numbers
      .replace(/\b(\d+)\b/g, 
        (match) => `<span class="text-orange-600">${match}</span>`)
      // Highlight comments
      .replace(/(--.*)$/gm, 
        (match) => `<span class="text-gray-500 italic">${match}</span>`);
    
    return highlighted;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
      <pre className="text-sm font-mono whitespace-pre">
        <code 
          dangerouslySetInnerHTML={{ 
            __html: language === 'sql' 
              ? highlightSQL(code) 
              : code 
          }} 
        />
      </pre>
    </div>
  );
};

export default CodeSyntaxHighlighter;
