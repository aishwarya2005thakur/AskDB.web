import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import OutputComparison from "@/components/OutputComparison";
import { Question, ValidationResult } from "@/types/practiceSQL";

interface QuestionItemProps {
  index: number;
  question: Question;
  levelId: string;
  loadingState: boolean;
  openHint: boolean;
  validationResult: ValidationResult | undefined;
  onQueryChange: (value: string) => void;
  onToggleHint: () => void;
  onSubmit: () => void;
}

const QuestionItem = ({
  index,
  question,
  levelId,
  loadingState,
  openHint,
  validationResult,
  onQueryChange,
  onToggleHint,
  onSubmit
}: QuestionItemProps) => {
  return (
    <div className="px-4 pb-4 pt-0 space-y-4">
      <div className="p-3 bg-slate-50 rounded border">
        <p className="text-sm font-medium mb-1">Task:</p>
        <p className="text-sm">{question.task}</p>
      </div>
      
      <div>
        <Textarea
          placeholder="SELECT * FROM..."
          className="min-h-[120px] font-mono"
          value={question.userQuery}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onToggleHint}
        >
          {openHint ? "Hide Hint" : "Show Hint"}
        </Button>
        
        <Button
          onClick={onSubmit}
          disabled={loadingState || !question.userQuery.trim()}
        >
          {loadingState ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Submit Answer"
          )}
        </Button>
      </div>
      
      {openHint && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <p className="font-medium mb-1">Hint:</p>
          <p>Remember to use the correct syntax for your SELECT statement and check the database diagram for available columns.</p>
        </div>
      )}
      
      {/* Show output comparison when query is incorrect */}
      {validationResult && 
       !validationResult.correct && 
       validationResult.userOutput && 
       validationResult.expectedOutput && (
        <div className="mt-6">
          <OutputComparison 
            userOutput={validationResult.userOutput}
            expectedOutput={validationResult.expectedOutput}
          />
        </div>
      )}
      
      {/* Show expected output without comparison */}
      {(!validationResult || !validationResult.userOutput) && (
        <div>
          <p className="text-sm font-medium mb-2">Expected Output:</p>
          <div className="max-h-[300px] overflow-auto border rounded">
            <Table>
              <TableHeader>
                <TableRow>
                  {question.expectedOutput.headers.map((header, i) => (
                    <TableHead key={i} className="bg-slate-50">{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {question.expectedOutput.rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell key={j}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
